// Consulta el estado del reino y actualiza el widget de Server status.
import { getLocale } from "./locale.js";
import { t } from "./i18n.js";

const STATUS_URL = "https://apis.corelegacy.gg/realm_status.php?function=getstatus";
const REFRESH_MS = 60000;
const TIMEOUT_MS = 8000;

function setIndicator(el, online) {
  if (!el) return;
  el.classList.remove("is-unknown");
  el.classList.toggle("is-online", online);
  el.classList.toggle("is-offline", !online);
  const state = el.querySelector(".realm-status__state");
  if (state) state.textContent = online ? "Online" : "Offline";
}

function setUnknownIndicator(el) {
  if (!el) return;
  el.classList.remove("is-online", "is-offline");
  el.classList.add("is-unknown");
  const state = el.querySelector(".realm-status__state");
  if (state) state.textContent = t("status.unknown", getLocale());
}

function setText(el, value) {
  if (el) el.textContent = value;
}

function showUnknown(refs) {
  setUnknownIndicator(refs.login);
  setUnknownIndicator(refs.server);
  setText(refs.players, "?");
  setText(refs.uptime, "-");
}

async function fetchStatus(refs) {
  if (refs.spinner) refs.spinner.classList.add("is-spinning");
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);
  try {
    const response = await fetch(STATUS_URL, {
      cache: "no-store",
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const data = Array.isArray(payload?.data) ? payload.data[0] : payload?.data;
    if (!data) throw new Error("Respuesta sin datos");

    setIndicator(refs.login, Number(data.logon_status) === 1);
    setIndicator(refs.server, Number(data.server_status) === 1);
    setText(refs.players, String(data.players_online ?? 0));
    setText(refs.uptime, data.uptime || "-");
  } catch (error) {
    console.error("No se pudo cargar el estado del reino:", error);
    showUnknown(refs);
  } finally {
    clearTimeout(timeout);
    if (refs.spinner) refs.spinner.classList.remove("is-spinning");
  }
}

export function startRealmStatus() {
  const refs = {
    login: document.querySelector("#status-login"),
    server: document.querySelector("#status-server"),
    players: document.querySelector("#status-players"),
    uptime: document.querySelector("#status-uptime"),
    spinner: document.querySelector("#status-spinner"),
  };

  fetchStatus(refs);
  const intervalId = setInterval(() => fetchStatus(refs), REFRESH_MS);

  window.addEventListener("localechange", () => {
    const unknowns = document.querySelectorAll(".realm-status__indicator.is-unknown .realm-status__state");
    unknowns.forEach((el) => {
      el.textContent = t("status.unknown", getLocale());
    });
  });

  return () => clearInterval(intervalId);
}
