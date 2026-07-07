// Gestor de paquetes opcionales (paquetes de idioma, HD, etc.).
// Las acciones de descarga/borrado se delegan en Rust a través de window.__onDownloadPackage
// y window.__onDeletePackage. Rust informa el estado instalado via window.__setInstalledPackages
// y notifica cambios individuales via window.__onPackageStateChange.
// Rust informa el progreso de descarga/instalación via window.__onPackageProgress(id, percent).
import { getLocale, isTauri } from "./locale.js";
import { t } from "./i18n.js";

const PACKAGE_DEFS = [
  { id: "lang-esES",    section: "languages", icon: "fa-language",           nameKey: "settings.language.es",      descKey: "pkgmgr.lang.desc" },
  { id: "lang-enUS",    section: "languages", icon: "fa-language",           nameKey: "settings.language.en",      descKey: "pkgmgr.lang.desc" },
  { id: "lang-frFR",    section: "languages", icon: "fa-language",           nameKey: "settings.language.fr",      descKey: "pkgmgr.lang.desc" },
  { id: "lang-deDE",    section: "languages", icon: "fa-language",           nameKey: "settings.language.de",      descKey: "pkgmgr.lang.desc" },
  {
    id: "hd", section: "hd", icon: "fa-image",
    nameKey: "pkgmgr.hd.name",
  },
  {
    id: "hd-armor", section: "hd", icon: "fa-shield-halved",
    nameKey: "pkgmgr.hd-armor.name",
  },
  {
    id: "hd-creatures", section: "hd", icon: "fa-dragon",
    nameKey: "pkgmgr.hd-creatures.name",
  },
  {
    id: "hd-trees", section: "hd", icon: "fa-tree",
    nameKey: "pkgmgr.hd-trees.name",
  },
  {
    id: "hd-spells", section: "hd", icon: "fa-wand-magic-sparkles",
    nameKey: "pkgmgr.hd-spells.name",
  },
  {
    id: "hd-maps", section: "hd", icon: "fa-map",
    nameKey: "pkgmgr.hd-maps.name",
  },
  {
    id: "hd-music", section: "hd", icon: "fa-music",
    nameKey: "pkgmgr.hd-music.name",
  },
  {
    id: "hd-skybox", section: "hd", icon: "fa-cloud-sun",
    nameKey: "pkgmgr.hd-skybox.name",
  },
];

// Estado por paquete: "uninstalled" | "installed" | "update" | "busy"
const pkgState    = Object.fromEntries(PACKAGE_DEFS.map((p) => [p.id, "uninstalled"]));
// Progreso por paquete (0-100). Solo relevante cuando state === "busy".
const pkgProgress = Object.fromEntries(PACKAGE_DEFS.map((p) => [p.id, 0]));
// Tamaño de descarga por paquete { downloaded: MB|null, total: MB|null }
const pkgSizes    = Object.fromEntries(PACKAGE_DEFS.map((p) => [p.id, { downloaded: null, total: null }]));

let isModalOpen = false;
let gameInstalled = false;

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
  } else if (def.descKey) {
    const desc = document.createElement("span");
    desc.className = "pkg-item__desc";
    desc.textContent = t(def.descKey, locale);
    info.appendChild(desc);
  }

  const badge = document.createElement("span");
  badge.className = "pkg-item__badge";
  badge.hidden = true;

  // Barra de progreso — visible solo durante estado "busy"
  const progressWrap = document.createElement("div");
  progressWrap.className = "pkg-item__progress-wrap";
  progressWrap.hidden = true;
  progressWrap.innerHTML = `
    <div class="pkg-item__progress-track"
         role="progressbar"
         aria-valuemin="0"
         aria-valuemax="100"
         aria-valuenow="0">
      <div class="pkg-item__progress-fill"></div>
    </div>
    <div class="pkg-item__progress-info">
      <span class="pkg-item__progress-pct">0%</span>
      <span class="pkg-item__progress-size"></span>
    </div>
  `;

  const actionSlot = document.createElement("div");
  actionSlot.className = "pkg-item__action";

  item.appendChild(iconWrap);
  item.appendChild(info);
  item.appendChild(badge);
  item.appendChild(progressWrap);
  item.appendChild(actionSlot);

  return item;
}

function formatMB(mb) {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)} GB`;
  if (mb >= 100)  return `${Math.round(mb)} MB`;
  return `${mb.toFixed(1)} MB`;
}

function setProgressBar(item, pct, downloaded, total) {
  const wrap  = item.querySelector(".pkg-item__progress-wrap");
  if (!wrap) return;
  const track     = wrap.querySelector(".pkg-item__progress-track");
  const fill      = wrap.querySelector(".pkg-item__progress-fill");
  const label     = wrap.querySelector(".pkg-item__progress-pct");
  const sizeLabel = wrap.querySelector(".pkg-item__progress-size");
  wrap.hidden = false;
  if (track) track.setAttribute("aria-valuenow", String(pct));
  if (fill) {
    fill.style.width = `${pct}%`;
    fill.classList.toggle("pkg-item__progress-fill--indeterminate", pct === 0);
  }
  if (label) label.textContent = pct > 0 ? `${pct}%` : "";
  if (sizeLabel) {
    sizeLabel.textContent = (downloaded != null && total != null)
      ? `${formatMB(downloaded)} / ${formatMB(total)}`
      : "";
  }
}

function hideProgressBar(item) {
  const wrap = item.querySelector(".pkg-item__progress-wrap");
  if (wrap) wrap.hidden = true;
}

function updateItemUI(id, locale) {
  const item = document.querySelector(`.pkg-item[data-pkg-id="${id}"]`);
  if (!item) return;

  const state      = pkgState[id];
  const actionSlot = item.querySelector(".pkg-item__action");
  const badge      = item.querySelector(".pkg-item__badge");

  actionSlot.innerHTML = "";

  if (state === "busy") {
    badge.hidden = true;
    item.classList.add("pkg-item--busy");
    item.classList.remove("pkg-item--installed", "pkg-item--update");
    setProgressBar(item, pkgProgress[id] ?? 0, pkgSizes[id]?.downloaded, pkgSizes[id]?.total);
    const spinner = document.createElement("span");
    spinner.className = "pkg-item__spinner";
    spinner.setAttribute("aria-label", t("pkgmgr.action.busy", locale));
    actionSlot.appendChild(spinner);
  } else if (state === "update") {
    hideProgressBar(item);
    badge.textContent = t("pkgmgr.status.update", locale);
    badge.hidden = false;
    badge.className = "pkg-item__badge pkg-item__badge--update";
    item.classList.add("pkg-item--installed", "pkg-item--update");
    item.classList.remove("pkg-item--busy");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pkg-btn pkg-btn--update";
    btn.setAttribute("aria-label", t("pkgmgr.action.update", locale));
    btn.innerHTML = `<i class="fa-solid fa-arrows-rotate" aria-hidden="true"></i>`;
    btn.addEventListener("click", () => triggerAction(id, "update"));
    actionSlot.appendChild(btn);
  } else if (state === "installed") {
    hideProgressBar(item);
    badge.textContent = t("pkgmgr.status.installed", locale);
    badge.hidden = false;
    badge.className = "pkg-item__badge";
    item.classList.add("pkg-item--installed");
    item.classList.remove("pkg-item--busy", "pkg-item--update");

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "pkg-btn pkg-btn--delete";
    btn.setAttribute("aria-label", t("pkgmgr.action.delete", locale));
    btn.innerHTML = `<i class="fa-solid fa-trash-can" aria-hidden="true"></i>`;
    btn.addEventListener("click", () => triggerAction(id, "delete"));
    actionSlot.appendChild(btn);
  } else {
    hideProgressBar(item);
    badge.hidden = true;
    badge.className = "pkg-item__badge";
    item.classList.remove("pkg-item--installed", "pkg-item--busy", "pkg-item--update");

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
  pkgProgress[id] = 0;
  pkgState[id] = "busy";
  updateItemUI(id, getLocale());
  if (action === "download") {
    window.__onDownloadPackage?.(id);
  } else if (action === "update") {
    window.__onUpdatePackage?.(id);
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

export function setGameActionBusy(busy) {
  const pkgBtn      = document.querySelector("#pkgmgr-toggle");
  const settingsBtn = document.querySelector("#settings-toggle");
  [pkgBtn, settingsBtn].forEach((btn) => {
    if (!btn) return;
    btn.disabled = busy;
    if (busy) {
      btn.dataset.busyDisabled = "true";
    } else {
      delete btn.dataset.busyDisabled;
    }
  });
}

export function setGameInstalled(installed) {
  gameInstalled = installed;
  if (!isTauri()) return;
  const btn = document.querySelector("#pkgmgr-toggle");
  if (!btn) return;
  const locale = getLocale();
  if (installed) {
    btn.disabled = false;
    btn.title = "";
    btn.setAttribute("aria-label", t("pkgmgr.open", locale));
  } else {
    if (isModalOpen) {
      isModalOpen = false;
      const modal = document.querySelector("#pkgmgr-modal");
      if (modal) modal.hidden = true;
    }
    btn.disabled = true;
    const tip = t("pkgmgr.disabled", locale);
    btn.title = tip;
    btn.setAttribute("aria-label", tip);
  }
}

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

/**
 * Llamado desde Rust para actualizar el progreso de descarga/instalación de un paquete.
 * El progreso avanza de 0 a 100. Varios paquetes pueden estar en progreso simultáneamente.
 * Ejemplo desde Rust: window.__onPackageProgress("hd", 42)
 */
export function onPackageProgress(id, percent, downloaded, total) {
  if (!(id in pkgProgress)) return;
  pkgProgress[id] = Math.max(0, Math.min(100, Math.round(percent)));
  if (downloaded != null) pkgSizes[id].downloaded = downloaded;
  if (total      != null) pkgSizes[id].total      = total;
  if (!isModalOpen || pkgState[id] !== "busy") return;
  const item = document.querySelector(`.pkg-item[data-pkg-id="${id}"]`);
  if (item) setProgressBar(item, pkgProgress[id], pkgSizes[id].downloaded, pkgSizes[id].total);
}

// ── Modal init ───────────────────────────────────────────────────────────────

export function initPackagesModal() {
  const modal    = document.querySelector("#pkgmgr-modal");
  const openBtn  = document.querySelector("#pkgmgr-toggle");
  const closeBtn = document.querySelector("#pkgmgr-close");
  if (!modal || !openBtn) return;

  function openModal() {
    if (isTauri() && !gameInstalled) return;
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
    const loc = e.detail?.locale ?? getLocale();
    if (isModalOpen) buildModalBody(loc);
    const btn = document.querySelector("#pkgmgr-toggle");
    if (btn && isTauri() && !gameInstalled) {
      const tip = t("pkgmgr.disabled", loc);
      btn.title = tip;
      btn.setAttribute("aria-label", tip);
    }
  });

  // --- Game actions (Reparar / Desinstalar) -----------------------------------
  const confirmModal  = document.querySelector("#game-confirm-modal");
  const confirmTitle  = document.querySelector("#game-confirm-title");
  const confirmBody   = document.querySelector("#game-confirm-body");
  const confirmCancel = document.querySelector("#game-confirm-cancel");
  const confirmOk     = document.querySelector("#game-confirm-ok");
  let pendingAction   = null;
  let pendingIsRepair = false;

  function showGameConfirm(titleKey, bodyKey, isDanger, action, isRepair = false) {
    const loc = getLocale();
    if (confirmTitle) confirmTitle.textContent  = t(titleKey, loc);
    if (confirmBody)  confirmBody.textContent   = t(bodyKey,  loc);
    if (confirmCancel) confirmCancel.textContent = t("pkgmgr.confirm.cancel",  loc);
    if (confirmOk)    confirmOk.textContent     = t("pkgmgr.confirm.proceed", loc);
    confirmModal?.classList.toggle("game-confirm-modal--danger", isDanger);
    pendingAction   = action;
    pendingIsRepair = isRepair;
    if (confirmModal) {
      confirmModal.hidden = false;
      confirmModal.removeAttribute("hidden");
      confirmCancel?.focus();
    }
  }

  function closeConfirmModal() {
    if (confirmModal) confirmModal.hidden = true;
    pendingAction   = null;
    pendingIsRepair = false;
  }

  document.querySelector("#pkgmgr-repair")?.addEventListener("click", () => {
    showGameConfirm(
      "pkgmgr.repair.confirm.title",
      "pkgmgr.repair.confirm.body",
      false,
      () => window.__onRepairGame?.(),
      true
    );
  });

  document.querySelector("#pkgmgr-uninstall")?.addEventListener("click", () => {
    showGameConfirm(
      "pkgmgr.uninstall.confirm.title",
      "pkgmgr.uninstall.confirm.body",
      true,
      () => window.__onUninstallGame?.()
    );
  });

  confirmCancel?.addEventListener("click", closeConfirmModal);

  confirmOk?.addEventListener("click", () => {
    const shouldShowRepair = pendingIsRepair;
    pendingAction?.();
    closeConfirmModal();
    closeModal();
    setGameActionBusy(true);
    if (shouldShowRepair) openRepairProgressModal();
  });

  confirmModal?.addEventListener("click", (e) => {
    if (e.target === confirmModal) closeConfirmModal();
  });

  confirmModal?.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeConfirmModal();
  });
}

// ── Repair progress modal ────────────────────────────────────────────────────

function openRepairProgressModal() {
  const modal  = document.querySelector("#repair-progress-modal");
  const status = document.querySelector("#repair-progress-status");
  const fill   = document.querySelector("#repair-progress-fill");
  const track  = document.querySelector("#repair-progress-track");
  const pct    = document.querySelector("#repair-progress-pct");
  if (!modal) return;
  if (fill)  fill.style.width = "0%";
  if (track) track.setAttribute("aria-valuenow", "0");
  if (pct)   pct.textContent  = "0%";
  if (status) status.textContent = t("pkgmgr.repair.progress.status", getLocale());
  modal.hidden = false;
  modal.removeAttribute("hidden");
}

export function onRepairProgress(percent, statusMsg) {
  const modal  = document.querySelector("#repair-progress-modal");
  if (!modal || modal.hidden) return;
  const p      = Math.max(0, Math.min(100, Math.round(percent)));
  const fill   = document.querySelector("#repair-progress-fill");
  const track  = document.querySelector("#repair-progress-track");
  const pct    = document.querySelector("#repair-progress-pct");
  const status = document.querySelector("#repair-progress-status");
  if (fill)   fill.style.width = `${p}%`;
  if (track)  track.setAttribute("aria-valuenow", String(p));
  if (pct)    pct.textContent  = `${p}%`;
  if (status && statusMsg != null) status.textContent = statusMsg;
}

export function onRepairComplete() {
  const modal = document.querySelector("#repair-progress-modal");
  if (modal) modal.hidden = true;
  setGameActionBusy(false);
}
