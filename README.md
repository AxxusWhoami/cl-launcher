# Lanzador Core Legacy

Lanzador de escritorio para el reino de _Wrath of the Lich King_ de Core Legacy.
Construido como aplicación web con Vite (JavaScript puro, sin framework), pensado
para empaquetarse más adelante con un backend nativo en Rust (Tauri) que gestione
la verificación, el parcheo y el arranque del cliente del juego.

## Características

- **Menú por pestañas (menú de hielo):** Inicio, Correcciones, Cuenta, Foros y Tienda.
  Solo Inicio y Cuenta tienen vista; el resto marca su estado activo sin dejar la
  pantalla en blanco.
- **Inicio:** noticias del reino y widget de estado del servidor.
- **Noticias:** se descargan desde la API de Core Legacy y se muestran las más
  recientes con etiqueta (parche, evento, ajustes), título, resumen, fecha y enlace
  al foro.
- **Server status:** indicadores de Login y servidor (Online/Offline/Desconocido),
  jugadores conectados y uptime, con refresco automático cada 60 segundos.
- **Cuenta:** formulario de creación de cuenta por email y enlace a la gestión de
  cuentas en https://accounts.corelegacy.gg (la creación real se conectará vía API).
- **Panel de control:** barra de progreso y botones de Jugar / Instalar / Espere
  para el flujo de arranque del juego.

## Estructura del proyecto

```
index.html              Estructura del lanzador (cabecera, vistas y panel de control)
styles.css              Estilos completos: temática de hielo, fuentes y vistas
app.js                  Punto de entrada: conecta la UI, las pestañas y los módulos
src/ui.js               LauncherUI: controla botón, barra de progreso y estado
src/launcher.js         Flujo de arranque (simulado; pendiente de conectar con Rust)
src/news.js             Descarga y renderiza las noticias del reino
src/realm-status.js     Consulta y refresca el estado del servidor
public/                 Fondo, logo, imágenes de botones y fuentes
```

## Tecnologías

- [Vite](https://vitejs.dev/) como servidor de desarrollo y empaquetador.
- JavaScript con módulos ES, sin dependencias de runtime.
- Fuentes locales: Morpheus (títulos), Cinzel, Uncial Antiqua y Roboto Condensed.

## Desarrollo

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo
npm run build    # build de producción en dist/
npm run preview  # previsualizar el build
```

## APIs externas

- **Noticias:** `https://apis.corelegacy.gg/news.php?function=getlaunchernews`
- **Estado del reino:** `https://apis.corelegacy.gg/realm_status.php?function=getstatus`

## Integración con Rust (pendiente)

El flujo de arranque en `src/launcher.js` está simulado. Los puntos marcados con
`TODO: Conectar con Rust` deben delegar en el backend nativo (comandos de Tauri):

1. Verificar la versión instalada del cliente frente a la del servidor.
2. Descargar y aplicar los parches pendientes, reportando el progreso real.
3. Validar la integridad de los datos del cliente (checksums).
4. Lanzar el proceso del juego y minimizar o cerrar el lanzador.
