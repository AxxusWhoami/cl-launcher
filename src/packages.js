// Gestor de paquetes opcionales (paquetes de idioma, HD, etc.).
// Las acciones de descarga/borrado se delegan en Rust a través de window.__onDownloadPackage
// y window.__onDeletePackage. Rust informa el estado instalado via window.__setInstalledPackages
// y notifica cambios individuales via window.__onPackageStateChange.
import { getLocale } from "./locale.js";
import { t } from "./i18n.js";

const PACKAGE_DEFS = [
  { id: "lang-esES",    section: "languages", icon: "fa-language",           nameKey: "settings.language.es",      descKey: "pkgmgr.lang.desc" },
  { id: "lang-enUS",    section: "languages", icon: "fa-language",           nameKey: "settings.language.en",      descKey: "pkgmgr.lang.desc" },
  { id: "lang-frFR",    section: "languages", icon: "fa-language",           nameKey: "settings.language.fr",      descKey: "pkgmgr.lang.desc" },
  { id: "lang-deDE",    section: "languages", icon: "fa-language",           nameKey: "settings.language.de",      descKey: "pkgmgr.lang.desc" },
  {
    id: "hd", section: "hd", icon: "fa-image",
    nameKey: "pkgmgr.hd.name",
    descKeys: ["pkgmgr.hd.desc.1", "pkgmgr.hd.desc.2", "pkgmgr.hd.desc.3", "pkgmgr.hd.desc.4"],
  },
  {
    id: "hd-armor", section: "hd", icon: "fa-shield-halved",
    nameKey: "pkgmgr.hd-armor.name",
    descKey: "pkgmgr.hd-armor.desc",
  },
  {
    id: "hd-creatures", section: "hd", icon: "fa-dragon",
    nameKey: "pkgmgr.hd-creatures.name",
    descKeys: ["pkgmgr.hd-creatures.desc.1", "pkgmgr.hd-creatures.desc.2"],
  },
  {
    id: "hd-trees", section: "hd", icon: "fa-tree",
    nameKey: "pkgmgr.hd-trees.name",
    descKey: "pkgmgr.hd-trees.desc",
  },
  {
    id: "hd-spells", section: "hd", icon: "fa-wand-magic-sparkles",
    nameKey: "pkgmgr.hd-spells.name",
    descKey: "pkgmgr.hd-spells.desc",
  },
];

// Estado por paquete: "uninstalled" | "installed" | "busy"
const pkgState = Object.fromEntries(PACKAGE_DEFS.map((p) => [p.id, "uninstalled"]));

let isModalOpen = false;

function buildDescList(keys, locale) {
  const ul = document.createElement("ul");
  ul.className = "pkg-item__desc-list";
  keys.forEach((key) => {
    const li = document.createElement("li");
    li.textContent = t(key, locale);
    ul.appendChild(li);
  });
  return ul;
}

function buildItem(def, locale) {
  const item = document.createElement("div");
  item.className = "pkg-item";
  item.dataset.pkgId = def.id;

  const iconWrap = document.createElement("div");
  iconWrap.className = "pkg-item__icon-wrap";
  iconWrap.innerHTML = `<i class="fa-solid ${def.icon}" aria-hidden="true"></i>`;

  const info = document.createElement("div");
  info.className = "pkg-item__info";

  const name = document.createElement("span");
  name.className = "pkg-item__name";
  name.textContent = t(def.nameKey, locale);
  info.appendChild(name);

  if (def.descKeys) {
    info.appendChild(buildDescList(def.descKeys, locale));
  } else {
    const desc = document.createElement("span");
    desc.className = "pkg-item__desc";
    desc.textContent = t(def.descKey, locale);
    info.appendChild(desc);
  }

  const badge = document.createElement("span");
  badge.className = "pkg-item__badge";
  badge.hidden = true;

  const actionSlot = document.createElement("div");
  actionSlot.className = "pkg-item__action";

  item.appendChild(iconWrap);
  item.appendChild(info);
  item.appendChild(badge);
  item.appendChild(actionSlot);

  return item;
}

function updateItemUI(id, locale) {
  const item = document.querySelector(`.pkg-item[data-pkg-id="${id}"]`);
  if (!item) return;

  const state = pkgState[id];
  const actionSlot = item.querySelector(".pkg-item__action");
  const badge = item.querySelector(".pkg-item__badge");

  actionSlot.innerHTML = "";

  if (state === "busy") {
    badge.hidden = true;
    const spinner = document.createElement("span");
    spinner.className = "pkg-item__spinner";
    spinner.setAttribute("aria-label", t("pkgmgr.action.busy", locale));
    actionSlot.appendChild(spinner);
    item.classList.add("pkg-item--busy");
    item.classList.remove("pkg-item--installed");
  } else if (state === "installed") {
    badge.textContent = t("pkgmgr.status.installed", locale);
    badge.hidden = false;
    item.classList.add("pkg-item--installed");
    item.classList.remove("pkg-item--busy");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pkg-btn pkg-btn--delete";
    btn.setAttribute("aria-label", t("pkgmgr.action.delete", locale));
    btn.innerHTML = `<i class="fa-solid fa-trash-can" aria-hidden="true"></i>`;
    btn.addEventListener("click", () => triggerAction(id, "delete"));
    actionSlot.appendChild(btn);
  } else {
    badge.hidden = true;
    item.classList.remove("pkg-item--installed", "pkg-item--busy");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pkg-btn pkg-btn--download";
    btn.setAttribute("aria-label", t("pkgmgr.action.download", locale));
    btn.innerHTML = `<i class="fa-solid fa-download" aria-hidden="true"></i>`;
    btn.addEventListener("click", () => triggerAction(id, "download"));
    actionSlot.appendChild(btn);
  }
}

function triggerAction(id, action) {
  pkgState[id] = "busy";
  updateItemUI(id, getLocale());
  if (action === "download") {
    window.__onDownloadPackage?.(id);
  } else {
    window.__onDeletePackage?.(id);
  }
}

function buildModalBody(locale) {
  const body = document.querySelector("#pkgmgr-body");
  if (!body) return;
  body.innerHTML = "";

  const sections = [
    { key: "languages", titleKey: "pkgmgr.section.languages" },
    { key: "hd",        titleKey: "pkgmgr.section.hd" },
  ];

  sections.forEach(({ key, titleKey }) => {
    const section = document.createElement("div");
    section.className = "pkgmgr__section";

    const heading = document.createElement("h3");
    heading.className = "pkgmgr__section-title";
    heading.textContent = t(titleKey, locale);
    section.appendChild(heading);

    PACKAGE_DEFS.filter((d) => d.section === key).forEach((def) => {
      section.appendChild(buildItem(def, locale));
    });

    body.appendChild(section);
  });

  for (const id of Object.keys(pkgState)) {
    updateItemUI(id, locale);
  }
}

// ── Public bridge functions (exposed on window in app.js) ────────────────────

export function setInstalledPackages(installed) {
  const locale = getLocale();
  for (const id of Object.keys(pkgState)) {
    pkgState[id] = installed.includes(id) ? "installed" : "uninstalled";
    if (isModalOpen) updateItemUI(id, locale);
  }
}

export function onPackageStateChange(id, newState) {
  if (!(id in pkgState)) return;
  pkgState[id] = newState;
  if (isModalOpen) updateItemUI(id, getLocale());
}

// ── Modal init ───────────────────────────────────────────────────────────────

export function initPackagesModal() {
  const modal   = document.querySelector("#pkgmgr-modal");
  const openBtn = document.querySelector("#pkgmgr-toggle");
  const closeBtn = document.querySelector("#pkgmgr-close");
  if (!modal || !openBtn) return;

  function openModal() {
    isModalOpen = true;
    buildModalBody(getLocale());
    modal.hidden = false;
    modal.removeAttribute("hidden");
    closeBtn?.focus();
  }

  function closeModal() {
    isModalOpen = false;
    modal.hidden = true;
  }

  openBtn.addEventListener("click", openModal);
  closeBtn?.addEventListener("click", closeModal);

  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  modal.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  // Si el modal está abierto cuando cambia el idioma, reconstruimos el cuerpo.
  window.addEventListener("localechange", (e) => {
    if (isModalOpen) buildModalBody(e.detail?.locale ?? getLocale());
  });
}
