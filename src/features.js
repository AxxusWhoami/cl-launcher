import { t } from "./i18n.js";

const FEATURES_URL = "https://apis.corelegacy.gg/features.php";

const FEATURE_ICONS = [
  "fa-robot",
  "fa-star",
  "fa-bolt",
  "fa-shield-halved",
  "fa-wand-magic-sparkles",
  "fa-trophy",
  "fa-swords",
  "fa-gem",
];

function buildCard(item, index) {
  const card = document.createElement("article");
  card.className = "feature-card";

  const iconName = FEATURE_ICONS[index % FEATURE_ICONS.length];

  const iconWrap = document.createElement("div");
  iconWrap.className = "feature-card__icon-wrap";
  iconWrap.innerHTML = `<i class="fa-solid ${iconName}" aria-hidden="true"></i>`;
  card.appendChild(iconWrap);

  const body = document.createElement("div");
  body.className = "feature-card__body";

  const title = document.createElement("h3");
  title.className = "feature-card__title";
  title.textContent = item.title || "";
  body.appendChild(title);

  const content = document.createElement("p");
  content.className = "feature-card__content";
  content.textContent = item.content || "";
  body.appendChild(content);

  card.appendChild(body);
  return card;
}

export async function loadFeatures(container) {
  if (!container) return;

  try {
    const response = await fetch(FEATURES_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];

    container.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "features__placeholder";
      empty.textContent = t("features.empty", "esES");
      container.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((item, i) => fragment.appendChild(buildCard(item, i)));
    container.appendChild(fragment);
  } catch (error) {
    console.error("No se pudieron cargar las características:", error);
    container.innerHTML = "";
    const failed = document.createElement("p");
    failed.className = "features__placeholder";
    failed.textContent = t("features.error", "esES");
    container.appendChild(failed);
  }
}
