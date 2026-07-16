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

function show(el)  { if (el) { el.removeAttribute("hidden"); el.style.display = ""; } }
function hide(el)  { if (el) { el.setAttribute("hidden", ""); el.style.display = "none"; } }

function setLoading(loading) {
  const loadingEl = getEl("legal-modal-loading");
  const contentEl = getEl("legal-modal-content");
  const errorEl   = getEl("legal-modal-error");
  if (loading) {
    show(loadingEl); hide(contentEl); hide(errorEl);
  } else {
    hide(loadingEl);
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
  show(modal);

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
      const decoded = decodeHtmlEntities(raw);
      const tmp = document.createElement("div");
      tmp.innerHTML = decoded;
      // Strip the header block that duplicates branding already in the modal title
      tmp.querySelectorAll("header, .logo-text, .logo-sub").forEach((el) => el.remove());
      contentEl.innerHTML = tmp.innerHTML;
      show(contentEl);
    }
  } catch {
    setLoading(false);
    if (errorEl) {
      errorEl.textContent = t("legal.error", loc);
      show(errorEl);
    }
  }
}

function closeModal() {
  const modal     = getEl("legal-modal");
  const contentEl = getEl("legal-modal-content");
  const errorEl   = getEl("legal-modal-error");
  if (!modal) return;
  hide(modal);
  if (contentEl) { contentEl.innerHTML = ""; hide(contentEl); }
  if (errorEl)   hide(errorEl);
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
