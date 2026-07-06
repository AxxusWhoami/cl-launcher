// Gestión del idioma del lanzador.
// En Tauri: detecta automáticamente el idioma del OS y no muestra el toggle.
// En web: usa localStorage y muestra el botón toggle.
// Emite "localechange" cuando el idioma cambia.

const STORAGE_KEY = "launcher_locale";
const DEFAULT = "esES";

const LOCALE_MAP = {
  es: "esES",
  "es-es": "esES",
  "es-mx": "esES",
  "es-ar": "esES",
  "es-co": "esES",
  "es-cl": "esES",
  en: "enUS",
  "en-us": "enUS",
  "en-gb": "enUS",
  "en-au": "enUS",
  "en-ca": "enUS",
  fr: "frFR",
  "fr-fr": "frFR",
  "fr-be": "frFR",
  "fr-ca": "frFR",
  de: "deDE",
  "de-de": "deDE",
  "de-at": "deDE",
  "de-ch": "deDE",
};

function mapLocale(raw) {
  if (!raw) return DEFAULT;
  const lower = raw.toLowerCase().replace("_", "-");
  if (LOCALE_MAP[lower]) return LOCALE_MAP[lower];
  const lang = lower.split("-")[0];
  return LOCALE_MAP[lang] ?? DEFAULT;
}

export function isTauri() {
  return Boolean(window.__TAURI__);
}

export function getLocale() {
  if (isTauri()) {
    return window.__TAURI_LOCALE__ ?? DEFAULT;
  }
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT;
}

export function setLocale(locale) {
  if (!isTauri()) {
    localStorage.setItem(STORAGE_KEY, locale);
  }
  window.dispatchEvent(new CustomEvent("localechange", { detail: { locale } }));
}

export function toggleLocale() {
  const next = getLocale() === "esES" ? "enUS" : "esES";
  setLocale(next);
  return next;
}

/**
 * Detecta el idioma del OS vía Tauri y lo almacena en window.__TAURI_LOCALE__
 * para acceso síncrono posterior. Debe llamarse una sola vez al arrancar.
 */
export async function initLocale() {
  if (!isTauri()) return getLocale();

  try {
    const tauri = window.__TAURI__;
    let raw = null;

    // Tauri v2 API
    if (tauri?.os?.locale) {
      raw = await tauri.os.locale();
    }
    // Tauri v1 API (plugin-os)
    if (!raw && tauri?.invoke) {
      try { raw = await tauri.invoke("plugin:os|locale"); } catch (_) {}
    }

    const resolved = mapLocale(raw ?? navigator.language);
    window.__TAURI_LOCALE__ = resolved;
    return resolved;
  } catch (_) {
    const resolved = mapLocale(navigator.language);
    window.__TAURI_LOCALE__ = resolved;
    return resolved;
  }
}
