// Punto de entrada del lanzador. Conecta la UI con la lógica de ejecución.
import { LauncherUI } from "./src/ui.js";
import { launchGame } from "./src/launcher.js";
import { loadNews } from "./src/news.js";
import { startRealmStatus } from "./src/realm-status.js";
import { startSnow } from "./src/snow.js";

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

// Menú de hielo: mantiene una sola pestaña activa y muestra su vista.
const tabs = document.querySelectorAll(".ice-tab");
const views = document.querySelectorAll(".view");
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
  });
});

// Envío del formulario de cuenta (la creación real se hará vía API más adelante).
const accountForm = document.querySelector("#account-form");
accountForm?.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Carga las noticias del reino al iniciar el lanzador.
loadNews(document.querySelector("#news-list"));

// Estado del reino: consulta inicial y refresco cada minuto.
startRealmStatus();

// Nieve animada sobre el fondo, por debajo de la interfaz.
startSnow(document.querySelector(".snow-layer"));

// Música de ambiente: intenta reproducir al cargar; si el navegador lo bloquea
// (política de autoplay), espera la primera interacción del usuario.
const ambientAudio = new Audio("/corelegacy_launcher.mp3");
ambientAudio.volume = 0.5;

function playAmbient() {
  ambientAudio.play().catch(() => {});
}

ambientAudio.play().catch(() => {
  const resume = () => {
    playAmbient();
    document.removeEventListener("click", resume);
    document.removeEventListener("keydown", resume);
  };
  document.addEventListener("click", resume);
  document.addEventListener("keydown", resume);
});
