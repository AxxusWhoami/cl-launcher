// Descarga y renderiza las noticias del lanzador desde la API de Core Legacy.
const NEWS_URL = "https://apis.corelegacy.gg/news.php?function=getlaunchernews";

const TAG_CLASSES = {
  parche: "news-card__tag--patch",
  evento: "news-card__tag--event",
  ajustes: "news-card__tag--fix",
};

function tagClass(badget) {
  const key = (badget || "").trim().toLowerCase();
  return TAG_CLASSES[key] || "news-card__tag--fix";
}

function formatDate(value) {
  const date = new Date((value || "").replace(" ", "T"));
  if (Number.isNaN(date.getTime())) return value || "";
  return new Intl.DateTimeFormat("es-ES", {
    day: "numeric",
    month: "long",
  }).format(date);
}

function buildCard(item) {
  const card = document.createElement("article");
  card.className = "news-card";

  const tag = document.createElement("span");
  tag.className = `news-card__tag ${tagClass(item.badget)}`;
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
  date.textContent = formatDate(item.publish_date);
  footer.appendChild(date);

  if (item.link_foros) {
    const link = document.createElement("a");
    link.className = "news-card__link";
    link.href = item.link_foros;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Leer más...";
    footer.appendChild(link);
  }

  card.appendChild(footer);
  return card;
}

export async function loadNews(container) {
  if (!container) return;

  try {
    const response = await fetch(NEWS_URL);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const payload = await response.json();
    const items = Array.isArray(payload?.data) ? payload.data.slice(-2) : [];

    container.innerHTML = "";

    if (items.length === 0) {
      const empty = document.createElement("p");
      empty.className = "news__placeholder";
      empty.textContent = "No hay noticias disponibles.";
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
    failed.textContent = "No se pudieron cargar las noticias.";
    container.appendChild(failed);
  }
}
