// Descarga y renderiza los servicios de la tienda desde la API de Core Legacy.
import { getLocale } from "./locale.js";
import { t } from "./i18n.js";

const STORE_URL = "https://apis.corelegacy.gg/store.php?function=getservices";

function formatPrice(item) {
  if (item.price !== undefined && item.price !== null) {
    const num = parseFloat(item.price);
    if (!Number.isNaN(num)) {
      return num === 0 ? t("store.free", getLocale()) : `${num.toFixed(0)} pts`;
    }
  }
  return null;
}

function buildCard(item) {
  const card = document.createElement("article");
  card.className = "store-card";

  if (item.image) {
    const img = document.createElement("img");
    img.className = "store-card__img";
    img.src = item.image;
    img.alt = item.name || item.title || "";
    img.loading = "lazy";
    card.appendChild(img);
  } else {
    const placeholder = document.createElement("div");
    placeholder.className = "store-card__img-placeholder";
    placeholder.innerHTML = `<i class="fa-solid fa-box-open" aria-hidden="true"></i>`;
    card.appendChild(placeholder);
  }

  const body = document.createElement("div");
  body.className = "store-card__body";

  const name = document.createElement("h3");
  name.className = "store-card__name";
  name.textContent = item.name || item.title || "";
  body.appendChild(name);

  if (item.description || item.content || item.short) {
    const desc = document.createElement("p");
    desc.className = "store-card__desc";
    desc.textContent = item.description || item.content || item.short || "";
    body.appendChild(desc);
  }

  const footer = document.createElement("div");
  footer.className = "store-card__footer";

  if (item.category) {
    const cat = document.createElement("span");
    cat.className = "store-card__cat";
    cat.textContent = item.category;
    footer.appendChild(cat);
  }

  const price = formatPrice(item);
  if (price !== null) {
    const priceEl = document.createElement("span");
    priceEl.className = "store-card__price";
    priceEl.textContent = price;
    footer.appendChild(priceEl);
  }

  body.appendChild(footer);
  card.appendChild(body);
  return card;
}

export async function loadStore(container) {
  if (!container) return;

  const locale = getLocale();

  container.innerHTML = `<p class="store__placeholder" role="status" data-i18n="store.loading">${t("store.loading", locale)}</p>`;

  try {
    const response = await fetch(`${STORE_URL}&locale=${locale}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data
      : Array.isArray(payload) ? payload
      : [];

    container.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "store__placeholder";
      empty.setAttribute("role", "status");
      empty.textContent = t("store.empty", locale);
      container.appendChild(empty);
      return;
    }

    const grid = document.createElement("div");
    grid.className = "store__grid";
    items.forEach((item) => grid.appendChild(buildCard(item)));
    container.appendChild(grid);
  } catch (error) {
    console.error("No se pudieron cargar los servicios de la tienda:", error);
    container.innerHTML = "";
    const failed = document.createElement("p");
    failed.className = "store__placeholder";
    failed.setAttribute("role", "status");
    failed.textContent = t("store.error", locale);
    container.appendChild(failed);
  }
}
