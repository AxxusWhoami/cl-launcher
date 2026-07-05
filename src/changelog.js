// Descarga y renderiza el historial de correcciones desde la API de Core Legacy.
import { getLocale } from "./locale.js";
import { t } from "./i18n.js";

const API_BASE = "https://apis.corelegacy.gg/changelog.php";

// Soporta: type: desc  |  type(scope): desc  |  type(scope) desc
const COMMIT_RE = /^(\w+(?:\([^)]+\))?)(?::\s*|\s+)(.*?)(?:\s*\(#(\d+)\))?$/s;

const TYPE_META = {
  fix:      { label: "fix",      cls: "changelog-badge--fix" },
  arreglar: { label: "fix",      cls: "changelog-badge--fix" },
  feat:     { label: "feat",     cls: "changelog-badge--feat" },
  tarea:    { i18nKey: "badge.chore", cls: "changelog-badge--chore" },
  chore:    { i18nKey: "badge.chore", cls: "changelog-badge--chore" },
  refactor: { label: "refactor", cls: "changelog-badge--refactor" },
  bots:     { label: "bots",     cls: "changelog-badge--bots" },
};

function parseCommit(raw) {
  const m = COMMIT_RE.exec((raw || "").trim());
  if (!m) {
    const desc = (raw || "").replace(/\s*\(#\d+\)\s*$/g, "").trim();
    return {
      type: null,
      meta: TYPE_META.fix,
      description: desc.replace(/^./, (c) => c.toUpperCase()),
    };
  }
  const type = m[1].toLowerCase().replace(/\([^)]*\)$/, "");
  const description = m[2]
    .replace(/\s*\(#\d+\)/g, "")
    .trim()
    .replace(/^./, (c) => c.toUpperCase());
  return {
    type,
    meta: TYPE_META[type] ?? TYPE_META.fix,
    description,
  };
}

function formatGroupDate(isoDate, locale) {
  const [y, mo, d] = isoDate.split("-").map(Number);
  const date = new Date(y, mo - 1, d);
  const intlLocale = locale === "enUS" ? "en-US" : "es-ES";
  return new Intl.DateTimeFormat(intlLocale, {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

function buildItem(entry, locale) {
  const { meta, description } = parseCommit(entry.commit);

  const li = document.createElement("li");
  li.className = "changelog__item";
  li.dataset.badge = meta.i18nKey ? t(meta.i18nKey, locale) : meta.label;
  li.dataset.desc = description.toLowerCase();

  const badge = document.createElement("span");
  badge.className = `changelog-badge ${meta.cls}`;
  badge.textContent = meta.i18nKey ? t(meta.i18nKey, locale) : meta.label;
  li.appendChild(badge);

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

function buildGroup(date, entries, locale) {
  const section = document.createElement("div");
  section.className = "changelog__group";

  const heading = document.createElement("h3");
  heading.className = "changelog__date";
  heading.textContent = formatGroupDate(date, locale);
  section.appendChild(heading);

  const ul = document.createElement("ul");
  ul.className = "changelog__list";
  entries.forEach((e) => ul.appendChild(buildItem(e, locale)));
  section.appendChild(ul);

  return section;
}

function buildFilters(container, allItems, locale) {
  const existing = container.querySelector(".changelog__toolbar");
  if (existing) existing.remove();

  const badgeLabels = new Set();
  allItems.forEach((item) => {
    const { meta } = parseCommit(item.commit);
    const label = meta.i18nKey ? t(meta.i18nKey, locale) : meta.label;
    badgeLabels.add(label);
  });

  const toolbar = document.createElement("div");
  toolbar.className = "changelog__toolbar";

  const search = document.createElement("input");
  search.type = "search";
  search.className = "changelog__search";
  search.placeholder = t("changelog.search", locale);
  search.setAttribute("aria-label", t("changelog.search", locale));
  toolbar.appendChild(search);

  const filters = document.createElement("div");
  filters.className = "changelog__filters";

  const allBtn = document.createElement("button");
  allBtn.type = "button";
  allBtn.className = "changelog__filter-btn is-active";
  allBtn.dataset.filter = "";
  allBtn.textContent = t("changelog.filter.all", locale);
  filters.appendChild(allBtn);

  [...badgeLabels].sort().forEach((label) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "changelog__filter-btn";
    btn.dataset.filter = label;
    btn.textContent = label;
    filters.appendChild(btn);
  });

  toolbar.appendChild(filters);

  const heading = container.querySelector(".news__heading");
  if (heading) {
    heading.after(toolbar);
  } else {
    container.prepend(toolbar);
  }
}

function attachFilterHandlers(container) {
  const filters = container.querySelector(".changelog__filters");
  const search = container.querySelector(".changelog__search");
  if (!filters || !search) return;

  let activeFilter = "";
  let searchQuery = "";

  function applyFilter() {
    const groups = container.querySelectorAll(".changelog__group");
    groups.forEach((group) => {
      let groupVisible = false;
      group.querySelectorAll(".changelog__item").forEach((li) => {
        const matchFilter = !activeFilter || li.dataset.badge === activeFilter;
        const matchSearch = !searchQuery || li.dataset.desc.includes(searchQuery);
        const visible = matchFilter && matchSearch;
        li.hidden = !visible;
        if (visible) groupVisible = true;
      });
      group.hidden = !groupVisible;
    });
  }

  filters.addEventListener("click", (e) => {
    const btn = e.target.closest(".changelog__filter-btn");
    if (!btn) return;
    filters.querySelectorAll(".changelog__filter-btn").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    activeFilter = btn.dataset.filter;
    applyFilter();
  });

  search.addEventListener("input", () => {
    searchQuery = search.value.toLowerCase().trim();
    applyFilter();
  });
}

export async function loadChangelog(container) {
  if (!container) return;

  const locale = getLocale();

  const clearContent = () => {
    [...container.children].forEach((el) => {
      if (!el.classList.contains("news__heading")) el.remove();
    });
  };

  clearContent();
  const placeholder = document.createElement("p");
  placeholder.className = "changelog__placeholder";
  placeholder.setAttribute("role", "status");
  placeholder.setAttribute("aria-live", "polite");
  placeholder.textContent = t("changelog.loading", locale);
  container.appendChild(placeholder);

  try {
    const res = await fetch(`${API_BASE}?locale=${locale}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const payload = await res.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];

    clearContent();

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "changelog__placeholder";
      empty.setAttribute("role", "status");
      empty.textContent = t("changelog.empty", locale);
      container.appendChild(empty);
      return;
    }

    buildFilters(container, items, locale);

    const groups = groupByDate(items);
    const fragment = document.createDocumentFragment();
    for (const [date, entries] of groups) {
      fragment.appendChild(buildGroup(date, entries, locale));
    }
    container.appendChild(fragment);

    // Activar filtros ahora que los items están en el DOM
    attachFilterHandlers(container);
  } catch (err) {
    console.error("No se pudieron cargar las correcciones:", err);
    clearContent();
    const failed = document.createElement("p");
    failed.className = "changelog__placeholder";
    failed.setAttribute("role", "status");
    failed.textContent = t("changelog.error", locale);
    container.appendChild(failed);
  }
}
