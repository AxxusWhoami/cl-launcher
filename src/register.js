// Modal de registro de cuenta — se abre al pulsar el botón Instalar cuando
// no hay cliente instalado.
// Puente saliente: window.__onCreateAccount(email) — Rust inicia el registro.
// Puente entrante: window.__onCreateAccountResult(success, message) — Rust informa el resultado.

import { getLocale } from "./locale.js";
import { t } from "./i18n.js";
import { initLegalModal } from "./legal-modal.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let isOpen = false;

function getEl(id) { return document.querySelector(`#${id}`); }

function resetModal() {
  const emailInput = getEl("register-modal-email");
  const errorEl    = getEl("register-modal-error");
  const resultEl   = getEl("register-modal-result");
  const formEl     = getEl("register-modal-form");
  const submitBtn  = getEl("register-modal-submit");

  if (emailInput) emailInput.value = "";
  if (errorEl)   { errorEl.textContent = ""; errorEl.hidden = true; }
  if (resultEl)  resultEl.hidden = true;
  if (formEl)    formEl.hidden = false;
  if (submitBtn) { submitBtn.disabled = false; delete submitBtn.dataset.busy; }
}

function openModal() {
  const modal = getEl("register-modal");
  if (!modal) return;
  resetModal();
  isOpen = true;
  modal.hidden = false;
  modal.removeAttribute("hidden");
  getEl("register-modal-email")?.focus();
}

function closeModal() {
  const modal = getEl("register-modal");
  if (!modal) return;
  isOpen = false;
  modal.hidden = true;
}

function setBusy(busy) {
  const btn = getEl("register-modal-submit");
  if (!btn) return;
  btn.disabled = busy;
  if (busy) {
    btn.dataset.busy = "true";
  } else {
    delete btn.dataset.busy;
  }
}

export function onCreateAccountResult(success, message) {
  const resultEl   = getEl("register-modal-result");
  const resultMsg  = getEl("register-modal-result-msg");
  const resultIcon = getEl("register-modal-result-icon");
  const formEl     = getEl("register-modal-form");
  const loc        = getLocale();

  setBusy(false);

  if (!resultEl || !resultMsg) return;

  resultMsg.textContent = message ?? t(success ? "register.success" : "register.error.generic", loc);
  resultEl.dataset.success = success ? "true" : "false";
  if (resultIcon) {
    resultIcon.className = success
      ? "fa-solid fa-circle-check register-modal__result-icon"
      : "fa-solid fa-circle-xmark register-modal__result-icon";
  }
  resultEl.hidden = false;

  if (formEl) formEl.hidden = success;
}

export function initRegisterModal() {
  const modal      = getEl("register-modal");
  const closeBtn   = getEl("register-modal-close");
  const form       = getEl("register-modal-form");
  const emailInput = getEl("register-modal-email");
  const errorEl    = getEl("register-modal-error");
  const installBtn = getEl("install-button");

  if (!modal) return;

  initLegalModal();

  installBtn?.addEventListener("click", () => {
    openModal();
    // La instalación arranca en background; Rust reporta progreso via
    // window.__onInstallProgress y notifica el fin via window.__onInstallComplete.
    window.__onInstallGame?.();
  });
  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  emailInput?.addEventListener("input", () => {
    if (errorEl && !errorEl.hidden) {
      errorEl.textContent = "";
      errorEl.hidden = true;
    }
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = emailInput?.value?.trim() ?? "";
    const loc   = getLocale();

    if (!EMAIL_RE.test(email)) {
      if (errorEl) { errorEl.textContent = t("register.error.invalid_email", loc); errorEl.hidden = false; }
      emailInput?.focus();
      return;
    }
    if (errorEl) { errorEl.textContent = ""; errorEl.hidden = true; }

    setBusy(true);
    // TODO: Conectar con backend — window.__onCreateAccount llama al endpoint de registro.
    window.__onCreateAccount?.(email);
  });
}
