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

    // Modal de registro
    "register.title":               "¿Aún no tienes cuenta?",
    "register.subtitle":            "Regístrate y juega gratis",
    "register.email.label":         "Correo electrónico",
    "register.email.placeholder":   "tu@correo.com",
    "register.cta":                 "Crear cuenta",
    "register.sending":             "Creando tu cuenta...",
    "register.success":             "¡Cuenta creada! Revisa tu correo para activarla.",
    "register.error.invalid_email": "Introduce un correo electrónico válido.",
    "register.error.generic":       "No se pudo crear la cuenta. Inténtalo de nuevo.",
    "modal.close":                  "Cerrar",

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
    "settings.downloadspeed.label":     "Límite de velocidad de descarga",
    "settings.downloadspeed.desc":      "Limita el ancho de banda usado durante la descarga de parches y recursos. 0 significa sin límite.",
    "settings.downloadspeed.unlimited": "Sin límite",
    "settings.gamelang.label":      "Idioma del juego",
    "settings.gamelang.desc":       "Idioma de los textos del cliente. Solo están disponibles los paquetes de idioma instalados en el Gestor de descargas.",
    "settings.music.label":         "Música del lanzador",
    "settings.music.desc":          "Reproduce la música de ambiente al iniciar el lanzador.",
    "progress.installing.dxvk":     "Instalando DXVK (Vulkan)...",
    "progress.uninstalling.dxvk":   "Desinstalando DXVK (Vulkan)...",
    "progress.applying":            "Aplicando...",

    // Gestor de paquetes
    "pkgmgr.open":               "Gestor de paquetes",
    "pkgmgr.disabled":           "Requiere que el juego esté instalado",
    "pkgmgr.title":              "Gestor de paquetes",
    "pkgmgr.section.languages":  "Paquetes de idioma",
    "pkgmgr.section.hd":         "Modelos y Texturas HD",
    "pkgmgr.lang.desc":          "Paquete de idioma del juego",
    "pkgmgr.hd.name":            "NPCs, Ciudades y Entornos",
    "pkgmgr.hd-armor.name":      "Armaduras, armas y escudos",
    "pkgmgr.hd-creatures.name":  "Monturas, Mascotas y cosméticos",
    "pkgmgr.hd-trees.name":      "Modelos de árboles",
    "pkgmgr.hd-spells.name":     "Efectos visuales de hechizos",
    "pkgmgr.hd-maps.name":       "Mapas de mazmorras y bandas",
    "pkgmgr.hd-music.name":      "Música de zonas",
    "pkgmgr.hd-skybox.name":     "Skyboxes y motor de agua",
    "pkgmgr.status.installed":   "Instalado",
    "pkgmgr.status.update":      "Actualización disponible",
    "pkgmgr.action.download":    "Descargar",
    "pkgmgr.action.delete":      "Eliminar",
    "pkgmgr.action.update":      "Actualizar",
    "pkgmgr.action.busy":        "En progreso...",
    "pkgmgr.repair.label":              "Reparar el juego",
    "pkgmgr.repair.confirm.title":      "¿Reparar el juego?",
    "pkgmgr.repair.progress.title":     "Reparando el juego",
    "pkgmgr.repair.progress.status":    "Verificando archivos...",
    "pkgmgr.repair.confirm.body":       "Se verificarán y restaurarán los archivos del cliente. El proceso puede tardar varios minutos.",
    "pkgmgr.uninstall.label":               "Desinstalar",
    "pkgmgr.uninstall.progress.title":      "Desinstalando el juego",
    "pkgmgr.uninstall.progress.status":     "Eliminando archivos del cliente...",
    "pkgmgr.uninstall.confirm.title":   "¿Desinstalar el juego?",
    "pkgmgr.uninstall.confirm.body":    "Se eliminarán todos los archivos del cliente. Esta acción no se puede deshacer.",
    "pkgmgr.confirm.cancel":            "Cancelar",
    "pkgmgr.confirm.proceed":           "Proceder",
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

    // Registration modal
    "register.title":               "Don't have an account yet?",
    "register.subtitle":            "Sign up and play for free",
    "register.email.label":         "Email address",
    "register.email.placeholder":   "you@email.com",
    "register.cta":                 "Create account",
    "register.sending":             "Creating your account...",
    "register.success":             "Account created! Check your email to activate it.",
    "register.error.invalid_email": "Enter a valid email address.",
    "register.error.generic":       "Could not create account. Please try again.",
    "modal.close":                  "Close",

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
    "settings.downloadspeed.label":     "Download speed limit",
    "settings.downloadspeed.desc":      "Limits the bandwidth used when downloading patches and assets. 0 means unlimited.",
    "settings.downloadspeed.unlimited": "Unlimited",
    "settings.gamelang.label":      "Game language",
    "settings.gamelang.desc":       "Language used for in-game text. Only language packs installed in the Download Manager are available.",
    "settings.music.label":         "Launcher music",
    "settings.music.desc":          "Plays ambient music when the launcher starts.",
    "progress.installing.dxvk":     "Installing DXVK (Vulkan)...",
    "progress.uninstalling.dxvk":   "Uninstalling DXVK (Vulkan)...",
    "progress.applying":            "Applying...",

    // Package Manager
    "pkgmgr.open":               "Package Manager",
    "pkgmgr.disabled":           "Requires the game to be installed",
    "pkgmgr.title":              "Package Manager",
    "pkgmgr.section.languages":  "Language Packs",
    "pkgmgr.section.hd":         "Models & Textures HD",
    "pkgmgr.lang.desc":          "Game language pack",
    "pkgmgr.hd.name":            "NPCs, Cities & Environments",
    "pkgmgr.hd-armor.name":      "Armor, Weapons & Shields",
    "pkgmgr.hd-creatures.name":  "Mounts, Pets & Cosmetics",
    "pkgmgr.hd-trees.name":      "Tree Models",
    "pkgmgr.hd-spells.name":     "Spell Visual Effects",
    "pkgmgr.hd-maps.name":       "Dungeon & Raid Maps",
    "pkgmgr.hd-music.name":      "Zone Music",
    "pkgmgr.hd-skybox.name":     "Skyboxes & Water Engine",
    "pkgmgr.status.installed":   "Installed",
    "pkgmgr.status.update":      "Update available",
    "pkgmgr.action.download":    "Download",
    "pkgmgr.action.delete":      "Delete",
    "pkgmgr.action.update":      "Update",
    "pkgmgr.action.busy":        "In progress...",
    "pkgmgr.repair.label":              "Repair Game",
    "pkgmgr.repair.confirm.title":      "Repair the game?",
    "pkgmgr.repair.progress.title":     "Repairing the game",
    "pkgmgr.repair.progress.status":    "Verifying files...",
    "pkgmgr.repair.confirm.body":       "Client files will be verified and restored. This process may take several minutes.",
    "pkgmgr.uninstall.label":               "Uninstall",
    "pkgmgr.uninstall.progress.title":      "Uninstalling the game",
    "pkgmgr.uninstall.progress.status":     "Removing client files...",
    "pkgmgr.uninstall.confirm.title":   "Uninstall the game?",
    "pkgmgr.uninstall.confirm.body":    "All client files will be deleted. This action cannot be undone.",
    "pkgmgr.confirm.cancel":            "Cancel",
    "pkgmgr.confirm.proceed":           "Proceed",
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

    // Modal d'inscription
    "register.title":               "Pas encore de compte ?",
    "register.subtitle":            "Inscris-toi et joue gratuitement",
    "register.email.label":         "Adresse e-mail",
    "register.email.placeholder":   "toi@email.com",
    "register.cta":                 "Créer un compte",
    "register.sending":             "Création de votre compte...",
    "register.success":             "Compte créé ! Vérifiez vos e-mails pour l'activer.",
    "register.error.invalid_email": "Entrez une adresse e-mail valide.",
    "register.error.generic":       "Impossible de créer le compte. Veuillez réessayer.",
    "modal.close":                  "Fermer",

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
    "settings.downloadspeed.label":     "Limite de vitesse de téléchargement",
    "settings.downloadspeed.desc":      "Limite la bande passante utilisée lors du téléchargement des correctifs et ressources. 0 signifie sans limite.",
    "settings.downloadspeed.unlimited": "Sans limite",
    "settings.gamelang.label":      "Langue du jeu",
    "settings.gamelang.desc":       "Langue des textes du client. Seuls les packs de langue installés dans le Gestionnaire de téléchargements sont disponibles.",
    "settings.music.label":         "Musique du lanceur",
    "settings.music.desc":          "Joue la musique d'ambiance au démarrage du lanceur.",
    "progress.installing.dxvk":     "Installation de DXVK (Vulkan)...",
    "progress.uninstalling.dxvk":   "Désinstallation de DXVK (Vulkan)...",
    "progress.applying":            "Application en cours...",

    // Gestionnaire de paquets
    "pkgmgr.open":               "Gestionnaire de paquets",
    "pkgmgr.disabled":           "Nécessite que le jeu soit installé",
    "pkgmgr.title":              "Gestionnaire de paquets",
    "pkgmgr.section.languages":  "Packs de langue",
    "pkgmgr.section.hd":         "Modèles et textures HD",
    "pkgmgr.lang.desc":          "Pack de langue du jeu",
    "pkgmgr.hd.name":            "PNJ, Villes et Environnements",
    "pkgmgr.hd-armor.name":      "Armures, armes et boucliers",
    "pkgmgr.hd-creatures.name":  "Montures, Mascottes et cosmétiques",
    "pkgmgr.hd-trees.name":      "Modèles d'arbres",
    "pkgmgr.hd-spells.name":     "Effets visuels de sorts",
    "pkgmgr.hd-maps.name":       "Cartes de donjons et raids",
    "pkgmgr.hd-music.name":      "Musique de zones",
    "pkgmgr.hd-skybox.name":     "Skyboxes et moteur de l'eau",
    "pkgmgr.status.installed":   "Installé",
    "pkgmgr.status.update":      "Mise à jour disponible",
    "pkgmgr.action.download":    "Télécharger",
    "pkgmgr.action.delete":      "Supprimer",
    "pkgmgr.action.update":      "Mettre à jour",
    "pkgmgr.action.busy":        "En cours...",
    "pkgmgr.repair.label":              "Réparer le jeu",
    "pkgmgr.repair.confirm.title":      "Réparer le jeu ?",
    "pkgmgr.repair.progress.title":     "Réparation en cours",
    "pkgmgr.repair.progress.status":    "Vérification des fichiers...",
    "pkgmgr.repair.confirm.body":       "Les fichiers du client seront vérifiés et restaurés. Ce processus peut prendre plusieurs minutes.",
    "pkgmgr.uninstall.label":               "Désinstaller",
    "pkgmgr.uninstall.progress.title":      "Désinstallation en cours",
    "pkgmgr.uninstall.progress.status":     "Suppression des fichiers du client...",
    "pkgmgr.uninstall.confirm.title":   "Désinstaller le jeu ?",
    "pkgmgr.uninstall.confirm.body":    "Tous les fichiers du client seront supprimés. Cette action est irréversible.",
    "pkgmgr.confirm.cancel":            "Annuler",
    "pkgmgr.confirm.proceed":           "Procéder",
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

    // Registrierungsmodal
    "register.title":               "Noch kein Konto?",
    "register.subtitle":            "Registriere dich und spiele kostenlos",
    "register.email.label":         "E-Mail-Adresse",
    "register.email.placeholder":   "du@email.com",
    "register.cta":                 "Konto erstellen",
    "register.sending":             "Konto wird erstellt...",
    "register.success":             "Konto erstellt! Prüfe deine E-Mails zur Aktivierung.",
    "register.error.invalid_email": "Gib eine gültige E-Mail-Adresse ein.",
    "register.error.generic":       "Konto konnte nicht erstellt werden. Bitte erneut versuchen.",
    "modal.close":                  "Schließen",

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
    "settings.downloadspeed.label":     "Download-Geschwindigkeitslimit",
    "settings.downloadspeed.desc":      "Begrenzt die beim Herunterladen von Patches und Ressourcen genutzte Bandbreite. 0 bedeutet unbegrenzt.",
    "settings.downloadspeed.unlimited": "Unbegrenzt",
    "settings.gamelang.label":      "Spielsprache",
    "settings.gamelang.desc":       "Sprache der Spieltexte. Nur im Download-Manager installierte Sprachpakete sind verfügbar.",
    "settings.music.label":         "Launcher-Musik",
    "settings.music.desc":          "Spielt Hintergrundmusik beim Start des Launchers ab.",
    "progress.installing.dxvk":     "DXVK (Vulkan) wird installiert...",
    "progress.uninstalling.dxvk":   "DXVK (Vulkan) wird deinstalliert...",
    "progress.applying":            "Wird angewendet...",

    // Paket-Manager
    "pkgmgr.open":               "Paket-Manager",
    "pkgmgr.disabled":           "Erfordert, dass das Spiel installiert ist",
    "pkgmgr.title":              "Paket-Manager",
    "pkgmgr.section.languages":  "Sprachpakete",
    "pkgmgr.section.hd":         "Modelle und Texturen HD",
    "pkgmgr.lang.desc":          "Sprachpaket für das Spiel",
    "pkgmgr.hd.name":            "NPCs, Städte und Umgebungen",
    "pkgmgr.hd-armor.name":      "Rüstungen, Waffen und Schilde",
    "pkgmgr.hd-creatures.name":  "Reittiere, Begleiter und Kosmetik",
    "pkgmgr.hd-trees.name":      "Baummodelle",
    "pkgmgr.hd-spells.name":     "Zauber-Visualeffekte",
    "pkgmgr.hd-maps.name":       "Dungeon- und Schlachtzugskarten",
    "pkgmgr.hd-music.name":      "Zonenmusik",
    "pkgmgr.hd-skybox.name":     "Skyboxes und Wasser-Engine",
    "pkgmgr.status.installed":   "Installiert",
    "pkgmgr.status.update":      "Update verfügbar",
    "pkgmgr.action.download":    "Herunterladen",
    "pkgmgr.action.delete":      "Löschen",
    "pkgmgr.action.update":      "Aktualisieren",
    "pkgmgr.action.busy":        "In Bearbeitung...",
    "pkgmgr.repair.label":              "Spiel reparieren",
    "pkgmgr.repair.confirm.title":      "Spiel reparieren?",
    "pkgmgr.repair.progress.title":     "Spiel wird repariert",
    "pkgmgr.repair.progress.status":    "Dateien werden überprüft...",
    "pkgmgr.repair.confirm.body":       "Die Client-Dateien werden überprüft und wiederhergestellt. Dieser Vorgang kann mehrere Minuten dauern.",
    "pkgmgr.uninstall.label":               "Deinstallieren",
    "pkgmgr.uninstall.progress.title":      "Spiel wird deinstalliert",
    "pkgmgr.uninstall.progress.status":     "Client-Dateien werden entfernt...",
    "pkgmgr.uninstall.confirm.title":   "Spiel deinstallieren?",
    "pkgmgr.uninstall.confirm.body":    "Alle Client-Dateien werden gelöscht. Diese Aktion kann nicht rückgängig gemacht werden.",
    "pkgmgr.confirm.cancel":            "Abbrechen",
    "pkgmgr.confirm.proceed":           "Fortfahren",
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
