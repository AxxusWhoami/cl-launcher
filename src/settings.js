// Gestión de la configuración del lanzador (persistida en localStorage).
import { getLocale, setLocale, isTauri } from "./locale.js";
import { t } from "./i18n.js";

const STORAGE_KEY = "launcher_settings";

const DEFAULTS = {
  cpuAffinity:       false,
  cpuCores:          1,
  dxvk:              false,
  downloadSpeedLimit: 0,
  gameLanguage:      null,
};

export function loadSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...DEFAULTS, ...JSON.parse(raw) } : { ...DEFAULTS };
  } catch {
    return { ...DEFAULTS };
  }
}

export function saveSettings(settings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

const progressModal = () => document.querySelector("#progress-modal");
const progressMsg   = () => document.querySelector("#progress-modal-msg");

let settingsGameInstalled = false;

export function showProgress(messageKey) {
  const el = progressModal();
  if (!el) return;
  const msgEl = progressMsg();
  if (msgEl) msgEl.textContent = t(messageKey);
  el.hidden = false;
  el.removeAttribute("hidden");
}

export function hideProgress() {
  const el = progressModal();
  if (el) el.hidden = true;
}

/**
 * Called by Rust to unlock the language options whose packs are installed.
 * Example: window.__setAvailableGameLanguages(["esES", "enUS"])
 * Pass an empty array to disable all options.
 */
export function setAvailableGameLanguages(available) {
  const picker = document.querySelector("#game-lang-picker");
  if (!picker) return;
  picker.querySelectorAll("input[type='radio']").forEach((input) => {
    const isAvailable = available.includes(input.value);
    input.disabled = !isAvailable;
    const label = input.closest(".game-lang-option");
    if (label) {
      label.setAttribute("aria-disabled", String(!isAvailable));
    }
  });
}

const DXVK_VERSIONS = ["1.10.3", "2.7.1", "3.0.1"];
let currentDxvkVersion = null;

export function setDxvkVersion(version) {
  if (version && DXVK_VERSIONS.includes(version)) {
    currentDxvkVersion = version;
  }
  const badge = document.querySelector("#dxvk-version-badge");
  if (!badge) return;
  const dxvkEnabled = document.querySelector("#setting-dxvk")?.checked ?? false;
  if (currentDxvkVersion && dxvkEnabled) {
    badge.textContent = `v${currentDxvkVersion}`;
    badge.hidden = false;
    badge.removeAttribute("hidden");
  } else {
    badge.hidden = true;
  }
}

export function setDetectedGpu(gpuName) {
  const el = document.querySelector("#sysinfo-gpu");
  if (!el) return;
  el.textContent = gpuName || "—";
}

export function setDetectedRam(ramLabel) {
  const el = document.querySelector("#sysinfo-ram");
  if (!el) return;
  el.textContent = ramLabel || "—";
}

export function setDetectedCpuCores(cores) {
  const el = document.querySelector("#sysinfo-cpu-cores");
  if (!el) return;
  el.textContent = cores != null ? String(cores) : "—";
}

export function setGameInstalled(installed) {
  settingsGameInstalled = installed;
  if (!isTauri()) return;
  const btn = document.querySelector("#settings-toggle");
  if (!btn) return;
  const locale = getLocale();
  if (installed) {
    btn.disabled = false;
    btn.title = "";
    btn.setAttribute("aria-label", t("settings.open", locale));
  } else {
    btn.disabled = true;
    const tip = t("settings.disabled", locale);
    btn.title = tip;
    btn.setAttribute("aria-label", tip);
  }
}

export function initSettingsModal() {
  const modal    = document.querySelector("#settings-modal");
  const openBtn  = document.querySelector("#settings-toggle");
  const closeBtn = document.querySelector("#settings-close");
  if (!modal || !openBtn) return;

  let settings = loadSettings();

  function applyToDOM() {
    document.querySelector("#setting-language").value       = getLocale();
    document.querySelector("#setting-cpu-affinity").checked      = settings.cpuAffinity;
    document.querySelector("#setting-cpu-cores").value           = String(settings.cpuCores);
    document.querySelector("#setting-dxvk").checked              = settings.dxvk;
    document.querySelector("#setting-download-speed").value      = String(settings.downloadSpeedLimit);
    const audioEl = document.querySelector("#setting-audio");
    if (audioEl) audioEl.checked = localStorage.getItem("launcher_audio_muted") !== "true";
    if (settings.gameLanguage) {
      const radio = document.querySelector(`input[name="game-lang"][value="${settings.gameLanguage}"]`);
      if (radio && !radio.disabled) radio.checked = true;
    }
    setDxvkVersion(currentDxvkVersion);
  }

  function openModal() {
    if (isTauri() && !settingsGameInstalled) return;
    settings = loadSettings();
    applyToDOM();
    modal.hidden = false;
    modal.removeAttribute("hidden");
    closeBtn?.focus();
  }

  function closeModal() {
    modal.hidden = true;
  }

  openBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);

  window.addEventListener("localechange", (e) => {
    const loc = e.detail?.locale ?? getLocale();
    const btn = document.querySelector("#settings-toggle");
    if (btn && isTauri() && !settingsGameInstalled) {
      const tip = t("settings.disabled", loc);
      btn.title = tip;
      btn.setAttribute("aria-label", tip);
    }
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // --- Idioma ------------------------------------------------------------------
  document.querySelector("#setting-language")?.addEventListener("change", (e) => {
    // Implementar con RUST
    setLocale(e.target.value);
  });

  // --- CPU Affinity Mask -------------------------------------------------------
  document.querySelector("#setting-cpu-affinity")?.addEventListener("change", (e) => {
    // Implementar con RUST
    settings.cpuAffinity = e.target.checked;
    saveSettings(settings);
    showProgress("progress.applying");
  });

  // --- CPU Cores ---------------------------------------------------------------
  document.querySelector("#setting-cpu-cores")?.addEventListener("change", (e) => {
    // Implementar con RUST
    settings.cpuCores = Number(e.target.value);
    saveSettings(settings);
    showProgress("progress.applying");
  });

  // --- DXVK (Vulkan) -----------------------------------------------------------
  document.querySelector("#setting-dxvk")?.addEventListener("change", (e) => {
    // Implementar con RUST
    settings.dxvk = e.target.checked;
    saveSettings(settings);
    setDxvkVersion(currentDxvkVersion);
    showProgress(settings.dxvk ? "progress.installing.dxvk" : "progress.uninstalling.dxvk");
  });

  // --- Límite de velocidad de descarga -----------------------------------------
  document.querySelector("#setting-download-speed")?.addEventListener("change", (e) => {
    // Implementar con RUST: invocar el throttler de descarga con el valor en MB/s.
    // Si el valor es 0, desactivar el límite (descarga sin restricción).
    // Ejemplo en Rust: set_download_speed_limit(value_mbps: u32)
    settings.downloadSpeedLimit = Number(e.target.value);
    saveSettings(settings);
  });

  // --- Idioma del juego --------------------------------------------------------
  document.querySelector("#game-lang-picker")?.addEventListener("change", (e) => {
    if (e.target.name !== "game-lang") return;
    // Implementar con RUST
    settings.gameLanguage = e.target.value;
    saveSettings(settings);
    showProgress("progress.applying");
  });
}
