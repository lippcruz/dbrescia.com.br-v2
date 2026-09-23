const pageUnit = document.body.dataset.unit;
const base = "../../";
const centralLink = "https://linktr.ee/dbrescia";
const units = {
  "santo-andre": { name: "Santo André", tag: "ABC Paulista", address: "Av. Dom Pedro II, 444 · Jardim", image: "assets/optimized/unidade-santo-andre.webp", whatsapp: "https://wa.me/5511996057584" },
  paraiso: { name: "Paraíso", tag: "Bela Vista", address: "Rua Pedro Ivo, 63 · Bela Vista", image: "assets/optimized/unidade-paraiso.webp", whatsapp: "https://wa.me/5511974663743" },
  "faria-lima": { name: "Faria Lima", tag: "Adega · Parrilla", address: "Av. Brig. Faria Lima, 3167", image: "assets/optimized/unidade-faria-lima.webp", whatsapp: "https://wa.me/5511978285657" },
  "marginal-tiete": { name: "Marginal Tietê", tag: "Zona Norte", address: "Pç. Bento de Camargo Barros, 172", image: "assets/optimized/unidade-marginal-tiete.webp", whatsapp: centralLink },
  guarulhos: { name: "Guarulhos", tag: "Grande São Paulo", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-guarulhos.webp", whatsapp: centralLink },
  "vila-mariana": { name: "Vila Mariana", tag: "Zona Sul", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-vila-mariana.webp", whatsapp: centralLink },
  morumbi: { name: "Morumbi", tag: "Zona Oeste", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-morumbi.webp", whatsapp: centralLink },
  "sao-bernardo": { name: "São Bernardo", tag: "ABC Paulista", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-sao-bernardo.webp", whatsapp: centralLink },
  "barra-funda": { name: "Barra Funda", tag: "Zona Oeste", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-barra-funda.webp", whatsapp: centralLink },
};
const unit = units[pageUnit];
const query = encodeURIComponent(`D'Brescia Churrascaria ${unit.name}`);
const stories = [
  { type: "photo", label: "A casa", title: `D'Brescia ${unit.name}`, description: "Uma experiência de churrasco feita para encontros que merecem tempo à mesa.", image: unit.image },
  { type: "photo", label: "No fogo", title: "Cortes no ponto", description: "Seleção de carnes servida durante todo o rodízio.", image: "assets/figma/dbc1e.png" },
  { type: "photo", label: "Buffet", title: "Escolhas à vontade", description: "Entradas, saladas, pratos quentes e sobremesas completam a experiência.", image: "assets/figma/3e852.png" },
  { type: "video", label: "Em vídeo", title: "Veja a D'Brescia em movimento", description: "Um registro da nossa história e da atmosfera que une cada casa.", image: "assets/optimized/ambiente.webp", video: "GO7LX_fqPFc" },
];

document.querySelectorAll("[data-unit-name]").forEach((node) => { node.textContent = unit.name; });
document.querySelectorAll("[data-unit-tag]").forEach((node) => { node.textContent = unit.tag; });
document.querySelectorAll("[data-unit-address]").forEach((node) => { node.textContent = unit.address; });
document.querySelectorAll("[data-unit-image]").forEach((node) => { node.src = `${base}${unit.image}`; node.alt = `Ambiente da unidade D'Brescia ${unit.name}`; });
document.querySelectorAll("[data-unit-whatsapp]").forEach((node) => { node.href = unit.whatsapp; });
document.querySelectorAll("[data-unit-map]").forEach((node) => { node.href = `https://www.google.com/maps/search/?api=1&query=${query}`; });

const rail = document.querySelector("[data-story-rail]");
rail.innerHTML = stories.map((story, index) => `<button class="story-card" type="button" data-story="${index}" aria-label="Abrir ${story.label}: ${story.title}"><span class="story-ring"><img src="${base}${story.image}" alt="" loading="lazy" decoding="async"></span><span>${story.label}</span>${story.type === "video" ? '<b aria-hidden="true">▶</b>' : ""}</button>`).join("");

const gallery = document.querySelector("[data-gallery]");
gallery.innerHTML = stories.map((story, index) => `<button class="gallery-card gallery-card--${story.type}" type="button" data-story="${index}"><img src="${base}${story.image}" alt="" loading="lazy" decoding="async"><span>${story.type === "video" ? "▶ Vídeo" : "Galeria"}</span><strong>${story.title}</strong></button>`).join("");

const dialog = document.querySelector("#story-dialog");
const dialogBody = document.querySelector("[data-story-dialog-body]");
let activeStory = 0;
function renderStory(index) {
  activeStory = (index + stories.length) % stories.length;
  const story = stories[activeStory];
  const progress = stories.map((_, progressIndex) => `<i class="${progressIndex <= activeStory ? "is-active" : ""}"></i>`).join("");
  const media = story.type === "video"
    ? `<iframe src="https://www.youtube-nocookie.com/embed/${story.video}?autoplay=1&rel=0" title="Vídeo D'Brescia" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`
    : `<img src="${base}${story.image}" alt="${story.title}">`;
  dialogBody.innerHTML = `<div class="story-progress" aria-hidden="true">${progress}</div><button class="story-close" type="button" data-story-close aria-label="Fechar galeria">×</button><button class="story-nav story-nav--previous" type="button" data-story-previous aria-label="Foto anterior">‹</button><div class="story-media">${media}</div><div class="story-caption"><span>${story.label}</span><h2>${story.title}</h2><p>${story.description}</p></div><button class="story-nav story-nav--next" type="button" data-story-next aria-label="Próxima foto">›</button>`;
  dialog.querySelector("[data-story-close]").focus();
  dialog.querySelector("[data-story-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-story-previous]").addEventListener("click", () => renderStory(activeStory - 1));
  dialog.querySelector("[data-story-next]").addEventListener("click", () => renderStory(activeStory + 1));
}
function openStory(index) { renderStory(index); dialog.showModal(); }
document.querySelectorAll("[data-story]").forEach((button) => button.addEventListener("click", () => openStory(Number(button.dataset.story))));
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") renderStory(activeStory - 1); if (event.key === "ArrowRight") renderStory(activeStory + 1); });

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const items = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); } }), { threshold: 0.14 });
  items.forEach((item) => observer.observe(item));
}
