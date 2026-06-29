// Punto de entrada del lanzador. Conecta la UI con la lógica de ejecución.
import { LauncherUI } from "./src/ui.js";
import { launchGame } from "./src/launcher.js";
import { loadNews } from "./src/news.js";
import { loadChangelog } from "./src/changelog.js";
import { startRealmStatus } from "./src/realm-status.js";
import { startSnow } from "./src/snow.js";
import { isTauri, getLocale, toggleLocale, initLocale } from "./src/locale.js";
import { applyTranslations, t } from "./src/i18n.js";

(async () => {
// --- Inicialización de idioma (async para esperar detección Tauri) ----------
const locale = await initLocale();
applyTranslations(locale);
document.documentElement.lang = locale === "enUS" ? "en" : "es";

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

const changelogContainer = document.querySelector("#changelog-list");

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

    if (target === "correcciones" && !changelogLoaded) {
      changelogLoaded = true;
      loadChangelog(changelogContainer);
    }
  });
});

// --- Botón de idioma (solo visible fuera de Tauri) --------------------------
const langToggleBtn = document.querySelector("#lang-toggle");
const langLabel = document.querySelector("#lang-label");

function updateLangButton(loc) {
  if (langLabel) langLabel.textContent = loc === "esES" ? "ES" : "EN";
}

if (!isTauri() && langToggleBtn) {
  langToggleBtn.hidden = false;
  updateLangButton(getLocale());

  langToggleBtn.addEventListener("click", () => {
    const next = toggleLocale();
    updateLangButton(next);
  });
}

// --- Reacción global a cambio de idioma ------------------------------------
window.addEventListener("localechange", (e) => {
  const loc = e.detail?.locale ?? getLocale();
  applyTranslations(loc);
  document.documentElement.lang = loc === "enUS" ? "en" : "es";

  // Refrescar changelog si ya estaba cargado y es la vista activa.
  if (changelogLoaded) {
    changelogLoaded = false;
    const isVisible = !document.querySelector(".view[data-view='correcciones']")?.hidden;
    if (isVisible) {
      changelogLoaded = true;
      loadChangelog(changelogContainer);
    }
  }

  // Refrescar noticias (las fechas se formatean con el locale).
  loadNews(document.querySelector("#news-list"));
});

// --- Formularios de cuenta --------------------------------------------------
document.querySelector("#login-form")?.addEventListener("submit", (e) => e.preventDefault());
document.querySelector("#register-form")?.addEventListener("submit", (e) => e.preventDefault());
document.querySelector("#recovery-form")?.addEventListener("submit", (e) => e.preventDefault());

// Toggle formulario de recuperación de contraseña.
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

// Pestañas de cuenta.
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
    });
  });
});

// Toggle visibilidad de contraseña.
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

// --- Carga inicial ----------------------------------------------------------
loadNews(document.querySelector("#news-list"));
startRealmStatus();
startSnow(document.querySelector(".snow-layer"));

// Música de ambiente.
const ambientAudio = new Audio("/corelegacy_launcher.mp3");
ambientAudio.volume = 0.5;

ambientAudio.play().catch(() => {
  const resume = () => {
    ambientAudio.play().catch(() => {});
    document.removeEventListener("click", resume);
    document.removeEventListener("keydown", resume);
  };
  document.addEventListener("click", resume);
  document.addEventListener("keydown", resume);
});
})();

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

const changelogContainer = document.querySelector("#changelog-list");

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

    if (target === "correcciones" && !changelogLoaded) {
      changelogLoaded = true;
      loadChangelog(changelogContainer);
    }
  });
});

// --- Botón de idioma (solo visible fuera de Tauri) --------------------------
const langToggleBtn = document.querySelector("#lang-toggle");
const langLabel = document.querySelector("#lang-label");

function updateLangButton(loc) {
  if (langLabel) langLabel.textContent = loc === "esES" ? "ES" : "EN";
}

if (!isTauri() && langToggleBtn) {
  langToggleBtn.hidden = false;
  updateLangButton(getLocale());

  langToggleBtn.addEventListener("click", () => {
    const next = toggleLocale();
    updateLangButton(next);
  });
}

// --- Reacción global a cambio de idioma ------------------------------------
window.addEventListener("localechange", (e) => {
  const loc = e.detail?.locale ?? getLocale();
  applyTranslations(loc);
  document.documentElement.lang = loc === "enUS" ? "en" : "es";

  // Refrescar changelog si ya estaba cargado y es la vista activa.
  if (changelogLoaded) {
    changelogLoaded = false;
    const isVisible = !document.querySelector(".view[data-view='correcciones']")?.hidden;
    if (isVisible) {
      changelogLoaded = true;
      loadChangelog(changelogContainer);
    }
  }

  // Refrescar noticias (las fechas se formatean con el locale).
  loadNews(document.querySelector("#news-list"));
});

// --- Formularios de cuenta --------------------------------------------------
document.querySelector("#login-form")?.addEventListener("submit", (e) => e.preventDefault());
document.querySelector("#register-form")?.addEventListener("submit", (e) => e.preventDefault());
document.querySelector("#recovery-form")?.addEventListener("submit", (e) => e.preventDefault());

// Toggle formulario de recuperación de contraseña.
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

// Pestañas de cuenta.
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
    });
  });
});

// Toggle visibilidad de contraseña.
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

// --- Carga inicial ----------------------------------------------------------
loadNews(document.querySelector("#news-list"));
startRealmStatus();
startSnow(document.querySelector(".snow-layer"));

// Música de ambiente.
const ambientAudio = new Audio("/corelegacy_launcher.mp3");
ambientAudio.volume = 0.5;

ambientAudio.play().catch(() => {
  const resume = () => {
    ambientAudio.play().catch(() => {});
    document.removeEventListener("click", resume);
    document.removeEventListener("keydown", resume);
  };
  document.addEventListener("click", resume);
  document.addEventListener("keydown", resume);
});
