// Descarga y renderiza las noticias del lanzador desde la API de Core Legacy.
import { getLocale } from "./locale.js";
import { t } from "./i18n.js";

const NEWS_URL = "https://apis.corelegacy.gg/news.php?function=getlaunchernews";

const TAG_COLOR_POOL = [
  "news-card__tag--patch",
  "news-card__tag--event",
  "news-card__tag--fix",
  "news-card__tag--danger",
  "news-card__tag--nature",
  "news-card__tag--arcane",
  "news-card__tag--fire",
];

function tagClass() {
  return TAG_COLOR_POOL[Math.floor(Math.random() * TAG_COLOR_POOL.length)];
}

function isoDate(value) {
  if (!value) return "";
  const d = new Date((value || "").replace(" ", "T"));
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function formatDate(value) {
  const locale = getLocale();
  const intlLocale = locale === "enUS" ? "en-US" : "es-ES";
  const date = new Date((value || "").replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value || "";
  return new Intl.DateTimeFormat(intlLocale, {
    day: "numeric",
    month: "long",
  }).format(date);
}

function buildCard(item) {
  const locale = getLocale();

  const card = document.createElement("article");
  card.className = "news-card";

  const tag = document.createElement("span");
  tag.className = `news-card__tag ${tagClass()}`;
  tag.textContent = item.badget || "Noticia";
  card.appendChild(tag);

  const title = document.createElement("h3");
  title.className = "news-card__title";
  title.textContent = item.title || "";
  card.appendChild(title);

  const body = document.createElement("p");
  body.className = "news-card__body";
  body.textContent = item.short || "";
  card.appendChild(body);

  const footer = document.createElement("div");
  footer.className = "news-card__footer";

  const date = document.createElement("time");
  date.className = "news-card__date";
  const iso = isoDate(item.publish_date);
  if (iso) date.setAttribute("datetime", iso);
  date.textContent = formatDate(item.publish_date);
  footer.appendChild(date);

  if (item.link_foros) {
    const link = document.createElement("a");
    link.className = "news-card__link";
    link.href = item.link_foros;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = t("news.readmore", locale);
    footer.appendChild(link);
  }

  card.appendChild(footer);
  return card;
}

export async function loadNews(container) {
  if (!container) return;

  const locale = getLocale();

  try {
    const response = await fetch(`${NEWS_URL}&locale=${locale}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data : [];

    container.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "news__placeholder";
      empty.setAttribute("role", "status");
      empty.textContent = t("news.empty", locale);
      container.appendChild(empty);
      return;
    }

    const fragment = document.createDocumentFragment();
    items.forEach((item) => fragment.appendChild(buildCard(item)));
    container.appendChild(fragment);
  } catch (error) {
    console.error("No se pudieron cargar las noticias:", error);
    container.innerHTML = "";
    const failed = document.createElement("p");
    failed.className = "news__placeholder";
    failed.setAttribute("role", "status");
    failed.textContent = t("news.error", locale);
    container.appendChild(failed);
  }
}
