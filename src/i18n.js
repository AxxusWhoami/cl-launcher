// Traducciones de la interfaz del lanzador.
// Añadir una entrada por clave para cada idioma soportado.

const TRANSLATIONS = {
  esES: {
    // Navegación
    "nav.home":        "Inicio",
    "nav.changelog":   "Correcciones",
    "nav.account":     "Cuenta",
    "nav.store":       "Tienda",
    "nav.forums":      "Foros",

    // Noticias
    "news.heading":       "Noticias del Reino",
    "news.loading":       "Cargando noticias...",
    "news.empty":         "No hay noticias disponibles.",
    "news.error":         "No se pudieron cargar las noticias.",
    "news.readmore":      "Leer más...",

    // Estado del reino
    "status.heading":     "Estado del servidor",
    "status.unknown":     "Desconocido",

    // Changelog
    "changelog.heading":  "Historial de correcciones",
    "changelog.loading":  "Cargando correcciones...",
    "changelog.empty":    "No hay correcciones disponibles.",
    "changelog.error":    "No se pudieron cargar las correcciones.",

    // Cuenta — pestañas
    "account.tabs.label":     "Sección de cuenta",
    "account.tab.login":      "Iniciar sesión",
    "account.tab.register":   "Crear cuenta",

    // Cuenta — formulario login
    "account.login.user.label":       "Usuario o correo",
    "account.login.user.placeholder": "Tu usuario o correo",
    "account.login.pass.label":       "Contraseña",
    "account.login.pass.placeholder": "Tu contraseña",
    "account.login.show":             "Mostrar contraseña",
    "account.login.hide":             "Ocultar contraseña",
    "account.login.forgot":           "¿Olvidaste tu contraseña?",
    "account.login.submit":           "Iniciar sesión",

    // Cuenta — formulario registro
    "account.register.email.label":       "Correo electrónico",
    "account.register.email.placeholder": "tu@correo.com",
    "account.register.submit":            "Crear cuenta",

    // Cuenta — recuperación
    "account.recovery.back":              "Volver",
    "account.recovery.email.label":       "Correo electrónico",
    "account.recovery.email.placeholder": "tu@correo.com",
    "account.recovery.submit":            "Enviar link recuperación",

    // Badges del changelog
    "badge.chore": "tarea",

    // Pie — progreso
    "footer.status":   "Mensaje de estado ...",
    "footer.size":     "1 GB de 40 GB",
    "footer.speed":    "Transferencia 0 kbps",
  },

  enUS: {
    // Navigation
    "nav.home":        "Home",
    "nav.changelog":   "Patch Notes",
    "nav.account":     "Account",
    "nav.store":       "Store",
    "nav.forums":      "Forums",

    // News
    "news.heading":       "Realm News",
    "news.loading":       "Loading news...",
    "news.empty":         "No news available.",
    "news.error":         "Could not load news.",
    "news.readmore":      "Read more...",

    // Realm status
    "status.heading":     "Server Status",
    "status.unknown":     "Unknown",

    // Changelog
    "changelog.heading":  "Patch History",
    "changelog.loading":  "Loading patch notes...",
    "changelog.empty":    "No patch notes available.",
    "changelog.error":    "Could not load patch notes.",

    // Account — tabs
    "account.tabs.label":     "Account section",
    "account.tab.login":      "Sign in",
    "account.tab.register":   "Create account",

    // Account — login form
    "account.login.user.label":       "Username or email",
    "account.login.user.placeholder": "Your username or email",
    "account.login.pass.label":       "Password",
    "account.login.pass.placeholder": "Your password",
    "account.login.show":             "Show password",
    "account.login.hide":             "Hide password",
    "account.login.forgot":           "Forgot your password?",
    "account.login.submit":           "Sign in",

    // Account — register form
    "account.register.email.label":       "Email address",
    "account.register.email.placeholder": "you@email.com",
    "account.register.submit":            "Create account",

    // Account — recovery
    "account.recovery.back":              "Back",
    "account.recovery.email.label":       "Email address",
    "account.recovery.email.placeholder": "you@email.com",
    "account.recovery.submit":            "Send recovery link",

    // Changelog badges
    "badge.chore": "chore",

    // Footer — progress
    "footer.status":   "Status message ...",
    "footer.size":     "1 GB of 40 GB",
    "footer.speed":    "Transfer 0 kbps",
  },
};

export function t(key, locale) {
  return TRANSLATIONS[locale]?.[key] ?? TRANSLATIONS.esES[key] ?? key;
}

/**
 * Recorre todos los elementos marcados con [data-i18n] y actualiza su
 * contenido o atributos según la clave de traducción.
 *
 * Atributos soportados:
 *   data-i18n="key"              → element.textContent
 *   data-i18n-placeholder="key"  → element.placeholder
 *   data-i18n-aria-label="key"   → element.ariaLabel
 *   data-i18n-aria-controls="key" (unused, kept for forward compat)
 */
export function applyTranslations(locale) {
  const loc = TRANSLATIONS[locale] ? locale : "esES";

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (key) el.textContent = t(key, loc);
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (key) el.placeholder = t(key, loc);
  });

  document.querySelectorAll("[data-i18n-aria-label]").forEach((el) => {
    const key = el.dataset.i18nAriaLabel;
    if (key) el.setAttribute("aria-label", t(key, loc));
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((el) => {
    const key = el.dataset.i18nAria;
    if (key) el.setAttribute("aria-label", t(key, loc));
  });
}
