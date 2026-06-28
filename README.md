# Lanzador Core Legacy

Lanzador de escritorio para el reino de _Wrath of the Lich King_ de Core Legacy.
Construido como aplicación web con Vite (JavaScript puro, sin framework), pensado
para empaquetarse más adelante con un backend nativo en Rust (Tauri) que gestione
la verificación, el parcheo y el arranque del cliente del juego.

## Características

- **Menú por pestañas (menú de hielo):** Inicio, Correcciones, Cuenta, Tienda y Foros.
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
- **Efectos ambientales:** nieve animada sobre el fondo y música de ambiente al cargar.

## Estructura del proyecto

```
index.html                              Estructura del lanzador (cabecera, vistas y panel de control)
styles.css                              Estilos completos: temática de hielo, fuentes y vistas
app.js                                  Punto de entrada: conecta la UI, las pestañas y los módulos
src/
  ui.js                                 LauncherUI: controla botón, barra de progreso y estado
  launcher.js                           Flujo de arranque (simulado; pendiente de conectar con Rust)
  news.js                               Descarga y renderiza las noticias del reino
  realm-status.js                       Consulta y refresca el estado del servidor
  snow.js                               Animación de nieve sobre el canvas del fondo
public/
  launcher_background.png               Imagen de fondo del lanzador
  logotipo_corelegacy.png               Logo de Core Legacy
  launcher_jugar_250x200.png            Imagen del botón Jugar
  launcher_instalar_250x200.png         Imagen del botón Instalar
  launcher_espere_250x200.png           Imagen del botón Espere
  corelegacy_launcher.mp3               Música de ambiente
  MORPHEUS.TTF                          Fuente Morpheus (títulos)
  fonts/
    cinzel-latin.woff2                  Fuente Cinzel (latin)
    cinzel-latin-ext.woff2              Fuente Cinzel (latin extendido)
    uncial-antiqua-latin.woff2          Fuente Uncial Antiqua (latin)
    uncial-antiqua-latin-ext.woff2      Fuente Uncial Antiqua (latin extendido)
    roboto-condensed-latin.woff2        Fuente Roboto Condensed (latin)
    roboto-condensed-latin-ext.woff2    Fuente Roboto Condensed (latin extendido)
```

## Tecnologías

- [Vite](https://vitejs.dev/) como servidor de desarrollo y empaquetador.
- JavaScript con módulos ES, sin dependencias de runtime.
- Fuentes locales: Morpheus (títulos), Cinzel, Uncial Antiqua y Roboto Condensed.
- Font Awesome 6 (iconos vía CDN).

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
