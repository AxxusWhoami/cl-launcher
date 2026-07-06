// Gestión de la configuración del lanzador (persistida en localStorage).
import { getLocale, setLocale } from "./locale.js";
import { t } from "./i18n.js";

const STORAGE_KEY = "launcher_settings";

const DEFAULTS = {
  laa:         false,
  cpuAffinity: false,
  tcpNoDelay:  false,
  cpuCores:    1,
  dxvk:        false,
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

export function initSettingsModal() {
  const modal    = document.querySelector("#settings-modal");
  const openBtn  = document.querySelector("#settings-toggle");
  const closeBtn = document.querySelector("#settings-close");
  if (!modal || !openBtn) return;

  let settings = loadSettings();

  function applyToDOM() {
    document.querySelector("#setting-language").value       = getLocale();
    document.querySelector("#setting-laa").checked          = settings.laa;
    document.querySelector("#setting-cpu-affinity").checked = settings.cpuAffinity;
    document.querySelector("#setting-tcp-nodelay").checked  = settings.tcpNoDelay;
    document.querySelector("#setting-cpu-cores").value      = String(settings.cpuCores);
    document.querySelector("#setting-dxvk").checked         = settings.dxvk;
  }

  function openModal() {
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

  // --- Patch 4GB (LAA) ---------------------------------------------------------
  document.querySelector("#setting-laa")?.addEventListener("change", (e) => {
    // Implementar con RUST
    settings.laa = e.target.checked;
    saveSettings(settings);
    showProgress("progress.applying");
  });

  // --- CPU Affinity Mask -------------------------------------------------------
  document.querySelector("#setting-cpu-affinity")?.addEventListener("change", (e) => {
    // Implementar con RUST
    settings.cpuAffinity = e.target.checked;
    saveSettings(settings);
    showProgress("progress.applying");
  });

  // --- TCP No Delay ------------------------------------------------------------
  document.querySelector("#setting-tcp-nodelay")?.addEventListener("change", (e) => {
    // Implementar con RUST
    settings.tcpNoDelay = e.target.checked;
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
    showProgress(settings.dxvk ? "progress.installing.dxvk" : "progress.uninstalling.dxvk");
  });
}
