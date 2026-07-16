import { getLocale } from "./locale.js";
import { t } from "./i18n.js";

const BASE_URL = "https://apis.corelegacy.gg/legal_agreements.php";
const FALLBACK_LOCALE = "esES";

function apiLocale() {
  const loc = getLocale();
  // Only locales that exist in the API
  const supported = ["esES", "enUS", "frFR", "deDE"];
  return supported.includes(loc) ? loc : FALLBACK_LOCALE;
}

function decodeHtmlEntities(encoded) {
  const txt = document.createElement("textarea");
  txt.innerHTML = encoded;
  return txt.value;
}

function getEl(id) { return document.querySelector(`#${id}`); }

function setLoading(loading) {
  const loadingEl = getEl("legal-modal-loading");
  const contentEl = getEl("legal-modal-content");
  const errorEl   = getEl("legal-modal-error");
  if (loading) {
    if (loadingEl) loadingEl.hidden = false;
    if (contentEl) contentEl.hidden = true;
    if (errorEl)   errorEl.hidden   = true;
  } else {
    if (loadingEl) loadingEl.hidden = true;
  }
}

async function loadDocument(type) {
  const loc    = getLocale();
  const locale = apiLocale();
  const modal  = getEl("legal-modal");
  const title  = getEl("legal-modal-title");
  const contentEl = getEl("legal-modal-content");
  const errorEl   = getEl("legal-modal-error");

  if (!modal) return;

  if (title) {
    title.textContent = t(
      type === "ToS" ? "legal.tos.title" : "legal.privacy.title",
      loc
    );
  }

  setLoading(true);
  modal.hidden = false;
  modal.removeAttribute("hidden");

  async function fetchForLocale(fetchLocale) {
    const url = `${BASE_URL}?type=${encodeURIComponent(type)}&locale=${fetchLocale}`;
    const res = await fetch(url);
    const json = await res.json();
    if (json.status === 200 && json.data?.content) return json.data.content;
    return null;
  }

  try {
    let raw = await fetchForLocale(locale);

    // Fallback to esES if the user's locale has no document yet
    if (raw === null && locale !== FALLBACK_LOCALE) {
      raw = await fetchForLocale(FALLBACK_LOCALE);
    }

    if (raw === null) throw new Error("no_content");

    setLoading(false);
    if (contentEl) {
      contentEl.innerHTML = decodeHtmlEntities(raw);
      contentEl.hidden = false;
    }
  } catch {
    setLoading(false);
    if (errorEl) {
      errorEl.textContent = t("legal.error", loc);
      errorEl.hidden = false;
    }
  }
}

function closeModal() {
  const modal     = getEl("legal-modal");
  const contentEl = getEl("legal-modal-content");
  const errorEl   = getEl("legal-modal-error");
  if (!modal) return;
  modal.hidden = true;
  if (contentEl) { contentEl.innerHTML = ""; contentEl.hidden = true; }
  if (errorEl)   errorEl.hidden = true;
}

export function initLegalModal() {
  const modal    = getEl("legal-modal");
  const closeBtn = getEl("legal-modal-close");

  if (!modal) return;

  function bindOpen(id, type) {
    document.querySelectorAll(`#${id}`).forEach((btn) => {
      btn.addEventListener("click", (e) => { e.stopPropagation(); loadDocument(type); });
    });
  }

  bindOpen("open-tos",             "ToS");
  bindOpen("open-privacy",         "Privacy-Policy");
  bindOpen("account-open-tos",     "ToS");
  bindOpen("account-open-privacy", "Privacy-Policy");

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click",   (e) => { if (e.target === modal) closeModal(); });
  modal.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}
