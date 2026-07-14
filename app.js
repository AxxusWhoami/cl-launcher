// Punto de entrada del lanzador. Conecta la UI con la lógica de ejecución.
import { LauncherUI } from "./src/ui.js";
import { launchGame } from "./src/launcher.js";
import { loadNews } from "./src/news.js";
import { loadChangelog } from "./src/changelog.js";
import { loadFeatures } from "./src/features.js";
import { loadStore } from "./src/store.js";
import { startRealmStatus } from "./src/realm-status.js";
import { startSnow } from "./src/snow.js";
import { isTauri, getLocale, initLocale } from "./src/locale.js";
import { applyTranslations, t } from "./src/i18n.js";
import { initSettingsModal, setAvailableGameLanguages, setDxvkVersion, setDetectedGpu, setDetectedRam, setDetectedCpuCores, setGameInstalled as setSettingsGameInstalled } from "./src/settings.js";
import { initPackagesModal, setInstalledPackages, onPackageStateChange, onPackageProgress, onRepairProgress, onRepairComplete, onUninstallComplete, onPackageDeleteComplete, setGameInstalled, setGameActionBusy, setGameRunning } from "./src/packages.js";
import { initRegisterModal, onCreateAccountResult } from "./src/register.js";

const AUDIO_STORAGE_KEY = "launcher_audio_muted";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

(async () => {
  // --- Inicialización de idioma -----------------------------------------------
  const LOCALE_LANG = { esES: "es", enUS: "en", frFR: "fr", deDE: "de" };

  const locale = await initLocale();
  applyTranslations(locale);
  document.documentElement.lang = LOCALE_LANG[locale] ?? "es";

  // --- Launcher UI ------------------------------------------------------------
  const ui = new LauncherUI({
    playButton: document.querySelector("#play-button"),
    progressBar: document.querySelector("#progress-bar"),
    status: document.querySelector("#status"),
    percent: document.querySelector("#percent"),
  });

  ui.onPlay(async () => {
    await launchGame({
      onProgress: (percent, message) => ui.setProgress(percent, message),
    });
  });

  // --- Menú de navegación -----------------------------------------------------
  const tabs = document.querySelectorAll(".ice-tab");
  const views = document.querySelectorAll(".view");
  let changelogLoaded = false;
  let newsLoaded = false;

  const changelogContainer = document.querySelector("#changelog-list");
  const newsList = document.querySelector("#news-list");
  const storeList = document.querySelector("#store-list");

  let storeLoaded = false;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((other) => {
        other.classList.remove("is-active");
        other.removeAttribute("aria-current");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-current", "page");

      const target = tab.dataset.view;
      const hasView = [...views].some((view) => view.dataset.view === target);
      if (hasView) {
        views.forEach((view) => {
          view.hidden = view.dataset.view !== target;
        });
      }

      if (target === "tienda" && !storeLoaded) {
        storeLoaded = true;
        loadStore(storeList);
      }

      if (target === "correcciones" && !changelogLoaded) {
        changelogLoaded = true;
        loadChangelog(changelogContainer);
      }

      if (target === "noticias" && !newsLoaded) {
        newsLoaded = true;
        loadNews(newsList);
      }
    });
  });

  const featuresContainer = document.querySelector("#features-list");

  // --- Reacción global a cambio de idioma ------------------------------------
  window.addEventListener("localechange", (e) => {
    const loc = e.detail?.locale ?? getLocale();
    applyTranslations(loc);
    document.documentElement.lang = LOCALE_LANG[loc] ?? "es";

    loadFeatures(featuresContainer);

    if (changelogLoaded) {
      changelogLoaded = false;
      const isVisible = !document.querySelector(".view[data-view='correcciones']")?.hidden;
      if (isVisible) {
        changelogLoaded = true;
        loadChangelog(changelogContainer);
      }
    }

    const newsVisible = !document.querySelector(".view[data-view='noticias']")?.hidden;
    if (newsVisible) {
      loadNews(newsList);
    } else {
      newsLoaded = false;
    }

    const storeVisible = !document.querySelector(".view[data-view='tienda']")?.hidden;
    if (storeVisible) {
      loadStore(storeList);
    } else {
      storeLoaded = false;
    }
  });

  // --- Audio ambiente ----------------------------------------------------------
  const ambientAudio = new Audio("/corelegacy_launcher.mp3");
  ambientAudio.loop = true;
  let muted = localStorage.getItem(AUDIO_STORAGE_KEY) === "true";
  ambientAudio.volume = muted ? 0 : 0.5;

  function syncAudioCheckbox() {
    const cb = document.querySelector("#setting-audio");
    if (cb) cb.checked = !muted;
  }

  function setMuted(value) {
    muted = value;
    ambientAudio.volume = muted ? 0 : 0.5;
    localStorage.setItem(AUDIO_STORAGE_KEY, String(muted));
    syncAudioCheckbox();
  }

  syncAudioCheckbox();

  document.querySelector("#setting-audio")?.addEventListener("change", (e) => setMuted(!e.target.checked));

  if (!muted) {
    ambientAudio.play().catch(() => {
      const resume = () => {
        if (!muted) ambientAudio.play().catch(() => {});
        document.removeEventListener("click", resume);
        document.removeEventListener("keydown", resume);
      };
      document.addEventListener("click", resume);
      document.addEventListener("keydown", resume);
    });
  }

  // --- Formularios de cuenta --------------------------------------------------
  function showFormError(errorEl, message) {
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.hidden = !message;
  }

  document.querySelector("#login-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    showFormError(document.querySelector("#login-error"), "");
  });

  document.querySelector("#register-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("#reg-email");
    const errorEl = document.querySelector("#register-error");
    if (!EMAIL_RE.test(emailInput?.value || "")) {
      showFormError(errorEl, getLocale() === "enUS" ? "Enter a valid email address." : "Introduce un correo válido.");
      return;
    }
    showFormError(errorEl, "");
  });

  document.querySelector("#recovery-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const emailInput = document.querySelector("#recovery-email");
    const errorEl = document.querySelector("#recovery-error");
    if (!EMAIL_RE.test(emailInput?.value || "")) {
      showFormError(errorEl, getLocale() === "enUS" ? "Enter a valid email address." : "Introduce un correo válido.");
      return;
    }
    showFormError(errorEl, "");
  });

  function showRecovery(open) {
    const accountTabs = document.querySelector(".account__tabs");
    const panels = document.querySelectorAll(".account__panel:not(#panel-recovery)");
    const recoveryPanel = document.querySelector("#panel-recovery");
    if (!recoveryPanel) return;
    recoveryPanel.hidden = !open;
    if (accountTabs) accountTabs.hidden = open;
    panels.forEach((p) => { p.hidden = open ? true : p.id !== "panel-login"; });
    if (!open) {
      const activeTab = document.querySelector(".account__tab.is-active");
      const target = activeTab?.dataset.tab ?? "login";
      document.querySelectorAll(".account__panel:not(#panel-recovery)").forEach((p) => {
        p.hidden = p.id !== `panel-${target}`;
      });
    }
  }

  document.querySelector("#forgot-toggle")?.addEventListener("click", () => showRecovery(true));
  document.querySelector("#recovery-back")?.addEventListener("click", () => showRecovery(false));

  const accountTabs = document.querySelectorAll(".account__tab");
  accountTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      accountTabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");

      const target = tab.dataset.tab;
      document.querySelectorAll(".account__panel").forEach((panel) => {
        panel.hidden = panel.id !== `panel-${target}`;
        // Limpiar campos e errores al cambiar pestaña
        panel.querySelectorAll("input").forEach((input) => { input.value = ""; });
        panel.querySelectorAll(".account__field-error").forEach((el) => { el.hidden = true; el.textContent = ""; });
      });
    });
  });

  document.querySelectorAll(".account__eye").forEach((btn) => {
    btn.addEventListener("click", () => {
      const input = document.getElementById(btn.dataset.target);
      if (!input) return;
      const isPassword = input.type === "password";
      input.type = isPassword ? "text" : "password";
      const loc = getLocale();
      btn.setAttribute("aria-label", t(isPassword ? "account.login.hide" : "account.login.show", loc));
      btn.querySelector("i").className = isPassword ? "fa-solid fa-eye-slash" : "fa-solid fa-eye";
    });
  });

  // --- Modal de actualización ------------------------------------------------
  const updateModal = document.querySelector("#update-modal");
  const updateLaterBtn = document.querySelector("#update-later");
  const updateConfirmBtn = document.querySelector("#update-confirm");

  function openUpdateModal() {
    if (!updateModal) return;
    updateModal.hidden = false;
    updateModal.removeAttribute("hidden");
    updateLaterBtn?.focus();
  }

  function closeUpdateModal() {
    if (!updateModal) return;
    updateModal.hidden = true;
  }

  updateLaterBtn?.addEventListener("click", closeUpdateModal);
  updateConfirmBtn?.addEventListener("click", closeUpdateModal);

  updateModal?.addEventListener("click", (e) => {
    if (e.target === updateModal) closeUpdateModal();
  });

  updateModal?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeUpdateModal();
  });

  // Exponer para uso desde el entorno Tauri / pruebas
  window.__openUpdateModal = openUpdateModal;

  // Puente para Rust: habilita los paquetes de idioma del juego instalados.
  // Uso desde Rust: window.__setAvailableGameLanguages(["esES", "enUS"])
  window.__setAvailableGameLanguages = setAvailableGameLanguages;
  // Uso desde Rust: window.__setDxvkVersion("2.7.1")
  window.__setDxvkVersion            = setDxvkVersion;
  // Uso desde Rust: window.__setDetectedGpu("NVIDIA GeForce RTX 4070")
  window.__setDetectedGpu            = setDetectedGpu;
  // Uso desde Rust: window.__setDetectedRam("16 GB")
  window.__setDetectedRam            = setDetectedRam;
  // Uso desde Rust: window.__setDetectedCpuCores(8)
  window.__setDetectedCpuCores       = setDetectedCpuCores;

  // Puentes para el Gestor de paquetes.
  // Rust informa los paquetes ya instalados:  window.__setInstalledPackages(["lang-esES", "hd"])
  // Rust notifica un cambio de estado:        window.__onPackageStateChange("hd", "installed")
  // Rust informa si el juego está instalado:  window.__setGameInstalled(true)
  window.__setInstalledPackages  = setInstalledPackages;
  window.__onPackageStateChange  = onPackageStateChange;
  // Rust notifica progreso de descarga/instalación: window.__onPackageProgress("hd", 42)
  window.__onPackageProgress     = onPackageProgress;
  window.__onRepairProgress      = onRepairProgress;
  window.__onRepairComplete      = onRepairComplete;
  window.__onUninstallComplete      = onUninstallComplete;
  window.__onPackageDeleteComplete  = onPackageDeleteComplete;
  window.__setGameInstalled      = (installed) => {
    setGameInstalled(installed);
    setSettingsGameInstalled(installed);
  };
  // Rust llama esto cuando termina una reparación o desinstalación.
  // Uso desde Rust: window.__onGameActionDone()
  window.__onGameActionDone = () => setGameActionBusy(false);
  // Rust notifica si el proceso del juego (Wow.exe) está en ejecución.
  // Uso desde Rust: window.__setGameRunning(true) / window.__setGameRunning(false)
  window.__setGameRunning = setGameRunning;

  // Puente para el registro de cuenta.
  // Rust llama con el resultado: window.__onCreateAccountResult(true, "mensaje")
  window.__onCreateAccountResult = onCreateAccountResult;

  // Puente para la instalación del juego (arranca al pulsar el botón Instalar).
  // Rust reporta progreso:  window.__onInstallProgress(percent, message)
  // Rust notifica el fin:   window.__onInstallComplete()
  window.__onInstallProgress = (percent, message) => ui.setProgress(percent, message);
  window.__onInstallComplete = () => ui.setProgress(100, "");

  // --- Modal de configuración ------------------------------------------------
  initSettingsModal();

  // --- Gestor de paquetes ----------------------------------------------------
  initPackagesModal();

  // --- Modal de registro (botón Instalar) ------------------------------------
  initRegisterModal();

  // --- Carga inicial ----------------------------------------------------------
  loadFeatures(featuresContainer);
  startRealmStatus();
  startSnow(document.querySelector(".snow-layer"));

  // --- Comprobación de actualización del lanzador -----------------------------
  // En entorno Tauri, Rust invoca window.__openUpdateModal() cuando detecta una
  // nueva versión. En modo web, se muestra automáticamente al iniciar.
  if (!isTauri()) {
    openUpdateModal();
  }
})();
