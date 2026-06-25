// Controla los elementos del DOM del lanzador: botón, barra de progreso y estado.
export class LauncherUI {
  constructor({ playButton, progressBar, status, percent }) {
    this.playButton = playButton;
    this.progressBar = progressBar;
    this.status = status;
    this.percent = percent;
    this.busy = false;
  }

  onPlay(handler) {
    this.playButton.addEventListener("click", async () => {
      if (this.busy) return;
      this.setBusy(true);
      try {
        await handler();
      } catch (error) {
        this.setProgress(0, "Error al iniciar el juego");
        console.error(error);
      } finally {
        this.setBusy(false);
      }
    });
  }

  setBusy(busy) {
    this.busy = busy;
    this.playButton.disabled = busy;
    this.playButton.querySelector(".play-button__label").textContent = busy
      ? "Iniciando..."
      : "Jugar";
  }

  setProgress(percent, message) {
    const value = Math.max(0, Math.min(100, Math.round(percent)));
    this.progressBar.style.width = `${value}%`;
    this.percent.textContent = `${value}%`;
    if (message) this.status.textContent = message;
  }
}
