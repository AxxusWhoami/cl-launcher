// Descarga y renderiza el historial de correcciones desde la API de Core Legacy.
// El locale se detecta del sistema (Tauri) con fallback a navigator.language.

const API_BASE = "https://apis.corelegacy.gg/changelog.php";

const LOCALE_MAP = {
  es: "esES",
  "en-gb": "enGB",
  "en-us": "enUS",
  en: "enUS",
};

function resolveLocale(raw) {
  if (!raw) return "esES";
  const lower = raw.toLowerCase().replace("_", "-");
  if (LOCALE_MAP[lower]) return LOCALE_MAP[lower];
  const lang = lower.split("-")[0];
  return LOCALE_MAP[lang] ?? "esES";
}

async function getSystemLocale() {
  try {
    const tauri = window.__TAURI__;
    if (tauri?.os?.locale) {
      const loc = await tauri.os.locale();
      return loc ?? navigator.language;
    }
  } catch (_) {}
  return navigator.language;
}

// Soporta: type: desc  |  type(scope): desc  |  type(scope) desc
const COMMIT_RE = /^(\w+(?:\([^)]+\))?)(?::\s*|\s+)(.*?)(?:\s*\(#(\d+)\))?$/s;

const TYPE_META = {
  fix:      { label: "fix",      cls: "changelog-badge--fix" },
  arreglar: { label: "fix",      cls: "changelog-badge--fix" },
  feat:     { label: "feat",     cls: "changelog-badge--feat" },
  tarea:    { label: "tarea",    cls: "changelog-badge--chore" },
  chore:    { label: "chore",    cls: "changelog-badge--chore" },
  refactor: { label: "refactor", cls: "changelog-badge--refactor" },
};

function parseCommit(raw) {
  const m = COMMIT_RE.exec((raw || "").trim());
  if (!m) return { type: null, meta: null, description: raw || "" };
  // Strip scope (e.g. "arreglar(pvp)" → "arreglar") before TYPE_META lookup
  const type = m[1].toLowerCase().replace(/\([^)]*\)$/, "");
  return {
    type,
    meta: TYPE_META[type] ?? { label: type, cls: "changelog-badge--chore" },
    description: m[2].trim().replace(/^./, (c) => c.toUpperCase()),
  };
}

function formatGroupDate(isoDate) {
  const [y, mo, d] = isoDate.split("-").map(Number);
  const date = new Date(y, mo - 1, d);
  return new Intl.DateTimeFormat("es-ES", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildItem(entry) {
  const { meta, description } = parseCommit(entry.commit);

  const li = document.createElement("li");
  li.className = "changelog__item";

  if (meta) {
    const badge = document.createElement("span");
    badge.className = `changelog-badge ${meta.cls}`;
    badge.textContent = meta.label;
    li.appendChild(badge);
  }

  const text = document.createElement("span");
  text.className = "changelog__desc";
  text.textContent = description;
  li.appendChild(text);

  return li;
}

function groupByDate(items) {
  const map = new Map();
  for (const item of items) {
    const day = (item.dateadd || "").slice(0, 10);
    if (!map.has(day)) map.set(day, []);
    map.get(day).push(item);
  }
  return map;
}

function buildGroup(date, entries) {
  const section = document.createElement("div");
  section.className = "changelog__group";

  const heading = document.createElement("h3");
  heading.className = "changelog__date";
  heading.textContent = formatGroupDate(date);
  section.appendChild(heading);

  const ul = document.createElement("ul");
  ul.className = "changelog__list";
  entries.forEach((e) => ul.appendChild(buildItem(e)));
  section.appendChild(ul);

  return section;
}

export async function loadChangelog(container) {
  if (!container) return;

  const rawLocale = await getSystemLocale();
  const locale = resolveLocale(rawLocale);

  container.innerHTML = "";
  const placeholder = document.createElement("p");
  placeholder.className = "changelog__placeholder";
  placeholder.textContent = "Cargando correcciones...";
  container.appendChild(placeholder);

  try {
    const res = await fetch(`${API_BASE}?locale=${locale}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const payload = await res.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];

    container.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "changelog__placeholder";
      empty.textContent = "No hay correcciones disponibles.";
      container.appendChild(empty);
      return;
    }

    const groups = groupByDate(items);
    const fragment = document.createDocumentFragment();
    for (const [date, entries] of groups) {
      fragment.appendChild(buildGroup(date, entries));
    }
    container.appendChild(fragment);
  } catch (err) {
    console.error("No se pudieron cargar las correcciones:", err);
    container.innerHTML = "";
    const failed = document.createElement("p");
    failed.className = "changelog__placeholder";
    failed.textContent = "No se pudieron cargar las correcciones.";
    container.appendChild(failed);
  }
}
