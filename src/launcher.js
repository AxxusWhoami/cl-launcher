// Lógica de ejecución del juego.
//
// Por ahora simula el flujo de verificación, parcheo y arranque. Cada paso
// marcado con "TODO: Conectar con Rust" debe delegar en el backend nativo
// (por ejemplo, comandos de Tauri que invoquen el binario en Rust).

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function launchGame({ onProgress }) {
  // TODO: Conectar con Rust — verificar la versión instalada del cliente
  // y comparar con la del servidor antes de continuar.
  onProgress(10, "Verificando archivos del juego...");
  await delay(600);

  // TODO: Conectar con Rust — descargar y aplicar los parches pendientes,
  // reportando el progreso real de descarga a través de onProgress().
  onProgress(45, "Aplicando parches...");
  await delay(800);

  // TODO: Conectar con Rust — validar la integridad de los datos del cliente
  // (checksums) tras el parcheo.
  onProgress(80, "Validando integridad...");
  await delay(600);

  onProgress(100, "Iniciando Wrath of the Lich King...");
  await delay(400);

  // TODO: Conectar con Rust — lanzar el proceso del juego (Wow.exe / binario
  // nativo) y, opcionalmente, cerrar o minimizar el lanzador.
  console.info("[launcher] Punto de arranque del juego (pendiente de Rust).");
}
