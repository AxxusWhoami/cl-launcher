// Gestión del idioma del lanzador en modo web (sin Tauri).
// Persistido en localStorage; emite "localechange" cuando cambia.

const STORAGE_KEY = "launcher_locale";
const DEFAULT = "esES";

export function isTauri() {
  return Boolean(window.__TAURI__);
}

export function getLocale() {
  return localStorage.getItem(STORAGE_KEY) ?? DEFAULT;
}

export function toggleLocale() {
  const next = getLocale() === "esES" ? "enUS" : "esES";
  localStorage.setItem(STORAGE_KEY, next);
  window.dispatchEvent(new CustomEvent("localechange", { detail: { locale: next } }));
  return next;
}
