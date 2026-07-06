// Traducciones de la interfaz del lanzador.
// Añadir una entrada por clave para cada idioma soportado.

const TRANSLATIONS = {
  esES: {
    // Navegación
    "nav.home":        "Inicio",
    "nav.changelog":   "Correcciones",
    "nav.news":        "Noticias",
    "nav.account":     "Cuenta",
    "nav.store":       "Tienda",

    // Noticias
    "news.heading":       "Noticias del Reino",
    "news.loading":       "Cargando noticias...",
    "news.empty":         "No hay noticias disponibles.",
    "news.error":         "No se pudieron cargar las noticias.",
    "news.readmore":      "Leer más...",

    // Estado del reino
    "status.heading":     "Estado del servidor",
    "status.unknown":     "Desconocido",
    "status.updated":     "Actualizado",

    // Changelog
    "changelog.heading":  "Historial de correcciones",
    "changelog.loading":  "Cargando correcciones...",
    "changelog.empty":    "No hay correcciones disponibles.",
    "changelog.error":    "No se pudieron cargar las correcciones.",
    "changelog.search":   "Buscar...",
    "changelog.filter.all": "Todos",

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

    // Lanzador
    "launcher.error":  "Error al iniciar el juego",

    // Audio
    "audio.mute":   "Silenciar música",
    "audio.unmute": "Activar música",

    // Idioma
    "lang.toggle": "Cambiar idioma",

    // Características
    "features.heading": "Características de CoRe Legacy",
    "features.loading": "Cargando características...",
    "features.empty":   "No hay características disponibles.",
    "features.error":   "No se pudieron cargar las características.",

    // Modal de actualización
    "update.title":   "Nueva versión disponible",
    "update.body":    "Hay una nueva versión del lanzador. ¿Deseas actualizar?",
    "update.later":   "Después",
    "update.confirm": "Sí",

    // Configuración
    "settings.open":                "Configuración",
    "settings.disabled":            "Requiere que el juego esté instalado",
    "settings.title":               "Configuración del lanzador",
    "settings.language.label":      "Idioma",
    "settings.language.desc":       "Idioma de la interfaz del lanzador.",
    "settings.language.es":         "Español",
    "settings.language.en":         "Inglés",
    "settings.language.fr":         "Francés",
    "settings.language.de":         "Alemán",
    "settings.affinity.label":      "CPU Affinity Mask",
    "settings.affinity.desc":       "Fija el proceso del juego a núcleos de CPU específicos para reducir cambios de contexto y mejorar la estabilidad de latencia.",
    "settings.cpucores.label":      "CPU Cores",
    "settings.cpucores.desc":       "Número de núcleos de CPU asignados al proceso del juego cuando CPU Affinity está activo.",
    "settings.dxvk.label":          "DXVK (Vulkan)",
    "settings.dxvk.desc":           "Instala DXVK para mejorar el rendimiento del juego y aumentar los FPS. DXVK reemplaza las librerías Direct3D por una implementación Vulkan optimizada.",
    "settings.gamelang.label":      "Idioma del juego",
    "settings.gamelang.desc":       "Idioma de los textos del cliente. Solo están disponibles los paquetes de idioma instalados en el Gestor de descargas.",
    "progress.installing.dxvk":     "Instalando DXVK (Vulkan)...",
    "progress.uninstalling.dxvk":   "Desinstalando DXVK (Vulkan)...",
    "progress.applying":            "Aplicando...",

    // Gestor de paquetes
    "pkgmgr.open":               "Gestor de paquetes",
    "pkgmgr.disabled":           "Requiere que el juego esté instalado",
    "pkgmgr.title":              "Gestor de paquetes",
    "pkgmgr.section.languages":  "Paquetes de idioma",
    "pkgmgr.section.hd":         "Modelos y Texturas",
    "pkgmgr.lang.desc":          "Paquete de idioma del juego",
    "pkgmgr.hd.name":            "Modelos y Texturas",
    "pkgmgr.hd.desc":            "Personajes, NPCs, ciudades y entornos.",
    "pkgmgr.hd-armor.name":      "Texturas de equipo",
    "pkgmgr.hd-armor.desc":      "Texturas de mayor resolución para armaduras, armas y escudos de Vainilla, TBC y WOTLK.",
    "pkgmgr.hd-creatures.name":  "Nuevos modelos de criaturas y monturas",
    "pkgmgr.hd-trees.name":      "Modelos de árboles",
    "pkgmgr.hd-spells.name":     "Efectos visuales de hechizos",
    "pkgmgr.status.installed":   "Instalado",
    "pkgmgr.status.update":      "Actualización disponible",
    "pkgmgr.action.download":    "Descargar",
    "pkgmgr.action.delete":      "Eliminar",
    "pkgmgr.action.update":      "Actualizar",
    "pkgmgr.action.busy":        "En progreso...",
  },

  enUS: {
    // Navigation
    "nav.home":        "Home",
    "nav.changelog":   "Patch Notes",
    "nav.news":        "News",
    "nav.account":     "Account",
    "nav.store":       "Store",

    // News
    "news.heading":       "Realm News",
    "news.loading":       "Loading news...",
    "news.empty":         "No news available.",
    "news.error":         "Could not load news.",
    "news.readmore":      "Read more...",

    // Realm status
    "status.heading":     "Server Status",
    "status.unknown":     "Unknown",
    "status.updated":     "Updated",

    // Changelog
    "changelog.heading":  "Patch Notes",
    "changelog.loading":  "Loading patch notes...",
    "changelog.empty":    "No patch notes available.",
    "changelog.error":    "Could not load patch notes.",
    "changelog.search":   "Search...",
    "changelog.filter.all": "All",

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

    // Launcher
    "launcher.error":  "Error launching game",

    // Audio
    "audio.mute":   "Mute music",
    "audio.unmute": "Unmute music",

    // Language
    "lang.toggle": "Change language",

    // Features
    "features.heading": "CoRe Legacy Features",
    "features.loading": "Loading features...",
    "features.empty":   "No features available.",
    "features.error":   "Could not load features.",

    // Update modal
    "update.title":   "New version available",
    "update.body":    "There is a new launcher version. Do you want to update?",
    "update.later":   "Later",
    "update.confirm": "Yes",

    // Settings
    "settings.open":                "Settings",
    "settings.disabled":            "Requires the game to be installed",
    "settings.title":               "Launcher Settings",
    "settings.language.label":      "Language",
    "settings.language.desc":       "Interface language of the launcher.",
    "settings.language.es":         "Spanish",
    "settings.language.en":         "English",
    "settings.language.fr":         "French",
    "settings.language.de":         "German",
    "settings.affinity.label":      "CPU Affinity Mask",
    "settings.affinity.desc":       "Pins the game process to specific CPU cores to reduce context switches and improve latency stability.",
    "settings.cpucores.label":      "CPU Cores",
    "settings.cpucores.desc":       "Number of CPU cores assigned to the game process when CPU Affinity is active.",
    "settings.dxvk.label":          "DXVK (Vulkan)",
    "settings.dxvk.desc":           "Installs DXVK to improve game performance and increase FPS. DXVK replaces Direct3D libraries with an optimized Vulkan implementation.",
    "settings.gamelang.label":      "Game language",
    "settings.gamelang.desc":       "Language used for in-game text. Only language packs installed in the Download Manager are available.",
    "progress.installing.dxvk":     "Installing DXVK (Vulkan)...",
    "progress.uninstalling.dxvk":   "Uninstalling DXVK (Vulkan)...",
    "progress.applying":            "Applying...",

    // Package Manager
    "pkgmgr.open":               "Package Manager",
    "pkgmgr.disabled":           "Requires the game to be installed",
    "pkgmgr.title":              "Package Manager",
    "pkgmgr.section.languages":  "Language Packs",
    "pkgmgr.section.hd":         "Models & Textures",
    "pkgmgr.lang.desc":          "Game language pack",
    "pkgmgr.hd.name":            "Models & Textures",
    "pkgmgr.hd.desc":            "Characters, NPCs, cities and surroundings.",
    "pkgmgr.hd-armor.name":      "Equipment Textures",
    "pkgmgr.hd-armor.desc":      "Textures with higher resolution for Vanilla, TBC, and WOTLK armor, weapons, and shields.",
    "pkgmgr.hd-creatures.name":  "New Creature & Mount Models",
    "pkgmgr.hd-trees.name":      "Tree Models",
    "pkgmgr.hd-spells.name":     "Spell Visual Effects",
    "pkgmgr.status.installed":   "Installed",
    "pkgmgr.status.update":      "Update available",
    "pkgmgr.action.download":    "Download",
    "pkgmgr.action.delete":      "Delete",
    "pkgmgr.action.update":      "Update",
    "pkgmgr.action.busy":        "In progress...",
  },

  frFR: {
    // Navigation
    "nav.home":        "Accueil",
    "nav.changelog":   "Correctifs",
    "nav.news":        "Actualités",
    "nav.account":     "Compte",
    "nav.store":       "Boutique",

    // News
    "news.heading":       "Actualités du Royaume",
    "news.loading":       "Chargement des actualités...",
    "news.empty":         "Aucune actualité disponible.",
    "news.error":         "Impossible de charger les actualités.",
    "news.readmore":      "Lire la suite...",

    // Realm status
    "status.heading":     "État du serveur",
    "status.unknown":     "Inconnu",
    "status.updated":     "Mis à jour",

    // Changelog
    "changelog.heading":  "Historique des correctifs",
    "changelog.loading":  "Chargement des correctifs...",
    "changelog.empty":    "Aucun correctif disponible.",
    "changelog.error":    "Impossible de charger les correctifs.",

    // Account
    "account.tabs.label":     "Section compte",
    "account.tab.login":      "Se connecter",
    "account.tab.register":   "Créer un compte",
    "account.login.user.label":       "Nom d'utilisateur ou e-mail",
    "account.login.user.placeholder": "Votre identifiant ou e-mail",
    "account.login.pass.label":       "Mot de passe",
    "account.login.pass.placeholder": "Votre mot de passe",
    "account.login.show":             "Afficher le mot de passe",
    "account.login.hide":             "Masquer le mot de passe",
    "account.login.forgot":           "Mot de passe oublié ?",
    "account.login.submit":           "Se connecter",
    "account.register.email.label":       "Adresse e-mail",
    "account.register.email.placeholder": "vous@email.com",
    "account.register.submit":            "Créer un compte",
    "account.recovery.back":              "Retour",
    "account.recovery.email.label":       "Adresse e-mail",
    "account.recovery.email.placeholder": "vous@email.com",
    "account.recovery.submit":            "Envoyer le lien de récupération",

    // Badges
    "badge.chore": "tâche",

    // Footer
    "footer.status":   "Message d'état...",
    "footer.size":     "1 Go sur 40 Go",
    "footer.speed":    "Transfert 0 kbps",

    // Launcher
    "launcher.error":  "Erreur lors du lancement du jeu",

    // Audio
    "audio.mute":   "Couper la musique",
    "audio.unmute": "Activer la musique",

    // Language
    "lang.toggle": "Changer de langue",

    // Features
    "features.heading": "Fonctionnalités de CoRe Legacy",
    "features.loading": "Chargement des fonctionnalités...",
    "features.empty":   "Aucune fonctionnalité disponible.",
    "features.error":   "Impossible de charger les fonctionnalités.",

    // Update modal
    "update.title":   "Nouvelle version disponible",
    "update.body":    "Une nouvelle version du lanceur est disponible. Voulez-vous mettre à jour ?",
    "update.later":   "Plus tard",
    "update.confirm": "Oui",

    // Settings
    "settings.open":                "Paramètres",
    "settings.disabled":            "Nécessite que le jeu soit installé",
    "settings.title":               "Paramètres du lanceur",
    "settings.language.label":      "Langue",
    "settings.language.desc":       "Langue de l'interface du lanceur.",
    "settings.language.es":         "Espagnol",
    "settings.language.en":         "Anglais",
    "settings.language.fr":         "Français",
    "settings.language.de":         "Allemand",
    "settings.affinity.label":      "Masque d'affinité CPU",
    "settings.affinity.desc":       "Fixe le processus du jeu à des cœurs CPU spécifiques pour réduire les changements de contexte et améliorer la stabilité de la latence.",
    "settings.cpucores.label":      "Cœurs CPU",
    "settings.cpucores.desc":       "Nombre de cœurs CPU assignés au processus du jeu lorsque l'affinité CPU est active.",
    "settings.dxvk.label":          "DXVK (Vulkan)",
    "settings.dxvk.desc":           "Installe DXVK pour améliorer les performances du jeu et augmenter les FPS. DXVK remplace les bibliothèques Direct3D par une implémentation Vulkan optimisée.",
    "settings.gamelang.label":      "Langue du jeu",
    "settings.gamelang.desc":       "Langue des textes du client. Seuls les packs de langue installés dans le Gestionnaire de téléchargements sont disponibles.",
    "progress.installing.dxvk":     "Installation de DXVK (Vulkan)...",
    "progress.uninstalling.dxvk":   "Désinstallation de DXVK (Vulkan)...",
    "progress.applying":            "Application en cours...",

    // Gestionnaire de paquets
    "pkgmgr.open":               "Gestionnaire de paquets",
    "pkgmgr.disabled":           "Nécessite que le jeu soit installé",
    "pkgmgr.title":              "Gestionnaire de paquets",
    "pkgmgr.section.languages":  "Packs de langue",
    "pkgmgr.section.hd":         "Modèles et textures",
    "pkgmgr.lang.desc":          "Pack de langue du jeu",
    "pkgmgr.hd.name":            "Modèles et textures",
    "pkgmgr.hd.desc":            "Personnages, PNJ, villes et environnements.",
    "pkgmgr.hd-armor.name":      "Textures d'équipement",
    "pkgmgr.hd-armor.desc":      "Textures haute résolution pour les armures, armes et boucliers de Vanilla, TBC et WOTLK.",
    "pkgmgr.hd-creatures.name":  "Nouveaux modèles de créatures et montures",
    "pkgmgr.hd-trees.name":      "Modèles d'arbres",
    "pkgmgr.hd-spells.name":     "Effets visuels de sorts",
    "pkgmgr.status.installed":   "Installé",
    "pkgmgr.status.update":      "Mise à jour disponible",
    "pkgmgr.action.download":    "Télécharger",
    "pkgmgr.action.delete":      "Supprimer",
    "pkgmgr.action.update":      "Mettre à jour",
    "pkgmgr.action.busy":        "En cours...",
  },

  deDE: {
    // Navigation
    "nav.home":        "Start",
    "nav.changelog":   "Korrekturen",
    "nav.news":        "Neuigkeiten",
    "nav.account":     "Konto",
    "nav.store":       "Shop",

    // News
    "news.heading":       "Neuigkeiten aus dem Reich",
    "news.loading":       "Neuigkeiten werden geladen...",
    "news.empty":         "Keine Neuigkeiten verfügbar.",
    "news.error":         "Neuigkeiten konnten nicht geladen werden.",
    "news.readmore":      "Weiterlesen...",

    // Realm status
    "status.heading":     "Serverstatus",
    "status.unknown":     "Unbekannt",
    "status.updated":     "Aktualisiert",

    // Changelog
    "changelog.heading":  "Korrekturverlauf",
    "changelog.loading":  "Korrekturen werden geladen...",
    "changelog.empty":    "Keine Korrekturen verfügbar.",
    "changelog.error":    "Korrekturen konnten nicht geladen werden.",

    // Account
    "account.tabs.label":     "Kontobereich",
    "account.tab.login":      "Anmelden",
    "account.tab.register":   "Konto erstellen",
    "account.login.user.label":       "Benutzername oder E-Mail",
    "account.login.user.placeholder": "Dein Benutzername oder E-Mail",
    "account.login.pass.label":       "Passwort",
    "account.login.pass.placeholder": "Dein Passwort",
    "account.login.show":             "Passwort anzeigen",
    "account.login.hide":             "Passwort verbergen",
    "account.login.forgot":           "Passwort vergessen?",
    "account.login.submit":           "Anmelden",
    "account.register.email.label":       "E-Mail-Adresse",
    "account.register.email.placeholder": "du@email.com",
    "account.register.submit":            "Konto erstellen",
    "account.recovery.back":              "Zurück",
    "account.recovery.email.label":       "E-Mail-Adresse",
    "account.recovery.email.placeholder": "du@email.com",
    "account.recovery.submit":            "Wiederherstellungslink senden",

    // Badges
    "badge.chore": "Aufgabe",

    // Footer
    "footer.status":   "Statusmeldung...",
    "footer.size":     "1 GB von 40 GB",
    "footer.speed":    "Übertragung 0 kbps",

    // Launcher
    "launcher.error":  "Fehler beim Starten des Spiels",

    // Audio
    "audio.mute":   "Musik stumm schalten",
    "audio.unmute": "Musik aktivieren",

    // Language
    "lang.toggle": "Sprache wechseln",

    // Features
    "features.heading": "CoRe Legacy Funktionen",
    "features.loading": "Funktionen werden geladen...",
    "features.empty":   "Keine Funktionen verfügbar.",
    "features.error":   "Funktionen konnten nicht geladen werden.",

    // Update modal
    "update.title":   "Neue Version verfügbar",
    "update.body":    "Eine neue Launcher-Version ist verfügbar. Möchtest du aktualisieren?",
    "update.later":   "Später",
    "update.confirm": "Ja",

    // Settings
    "settings.open":                "Einstellungen",
    "settings.disabled":            "Erfordert, dass das Spiel installiert ist",
    "settings.title":               "Launcher-Einstellungen",
    "settings.language.label":      "Sprache",
    "settings.language.desc":       "Sprache der Launcher-Oberfläche.",
    "settings.language.es":         "Spanisch",
    "settings.language.en":         "Englisch",
    "settings.language.fr":         "Französisch",
    "settings.language.de":         "Deutsch",
    "settings.affinity.label":      "CPU-Affinitätsmaske",
    "settings.affinity.desc":       "Bindet den Spielprozess an bestimmte CPU-Kerne, um Kontextwechsel zu reduzieren und die Latenzstabilität zu verbessern.",
    "settings.cpucores.label":      "CPU-Kerne",
    "settings.cpucores.desc":       "Anzahl der dem Spielprozess zugewiesenen CPU-Kerne, wenn die CPU-Affinität aktiv ist.",
    "settings.dxvk.label":          "DXVK (Vulkan)",
    "settings.dxvk.desc":           "Installiert DXVK zur Verbesserung der Spielleistung und Erhöhung der FPS. DXVK ersetzt die Direct3D-Bibliotheken durch eine optimierte Vulkan-Implementierung.",
    "settings.gamelang.label":      "Spielsprache",
    "settings.gamelang.desc":       "Sprache der Spieltexte. Nur im Download-Manager installierte Sprachpakete sind verfügbar.",
    "progress.installing.dxvk":     "DXVK (Vulkan) wird installiert...",
    "progress.uninstalling.dxvk":   "DXVK (Vulkan) wird deinstalliert...",
    "progress.applying":            "Wird angewendet...",

    // Paket-Manager
    "pkgmgr.open":               "Paket-Manager",
    "pkgmgr.disabled":           "Erfordert, dass das Spiel installiert ist",
    "pkgmgr.title":              "Paket-Manager",
    "pkgmgr.section.languages":  "Sprachpakete",
    "pkgmgr.section.hd":         "Modelle und Texturen",
    "pkgmgr.lang.desc":          "Sprachpaket für das Spiel",
    "pkgmgr.hd.name":            "Modelle und Texturen",
    "pkgmgr.hd.desc":            "Charaktere, NPCs, Städte und Umgebungen.",
    "pkgmgr.hd-armor.name":      "Ausrüstungstexturen",
    "pkgmgr.hd-armor.desc":      "Texturen mit höherer Auflösung für Vanilla-, TBC- und WOTLK-Rüstungen, Waffen und Schilde.",
    "pkgmgr.hd-creatures.name":  "Neue Kreaturen- und Reittiermodelle",
    "pkgmgr.hd-trees.name":      "Baummodelle",
    "pkgmgr.hd-spells.name":     "Zauber-Visualeffekte",
    "pkgmgr.status.installed":   "Installiert",
    "pkgmgr.status.update":      "Update verfügbar",
    "pkgmgr.action.download":    "Herunterladen",
    "pkgmgr.action.delete":      "Löschen",
    "pkgmgr.action.update":      "Aktualisieren",
    "pkgmgr.action.busy":        "In Bearbeitung...",
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
