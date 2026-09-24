const pageUnit = document.body.dataset.unit;
const base = "../../";
const centralLink = "https://linktr.ee/dbrescia";
const units = {
  "santo-andre": { name: "Santo André", tag: "ABC Paulista", address: "Av. Dom Pedro II, 444 · Jardim · Santo André - SP", phone: "1144361263", phoneDisplay: "(11) 4436-1263", image: "assets/optimized/unidade-santo-andre.webp", whatsapp: "https://wa.me/5511996057584" },
  paraiso: { name: "Paraíso", tag: "Bela Vista", address: "Rua Pedro Ivo, 63 · Paraíso · São Paulo - SP", phone: "1131412991", phoneDisplay: "(11) 3141-2991", image: "assets/optimized/unidade-paraiso.webp", whatsapp: "https://wa.me/5511974663743" },
  "faria-lima": { name: "Faria Lima", tag: "Adega · Parrilla", address: "Av. Brigadeiro Faria Lima, 3167 · Itaim Bibi · São Paulo - SP", phone: "1130793250", phoneDisplay: "(11) 3079-3250", image: "assets/optimized/unidade-faria-lima.webp", whatsapp: "https://wa.me/5511978285657" },
  "marginal-tiete": { name: "Marginal Tietê", tag: "Zona Norte", address: "Praça Bento de Camargo Barros, 172 · Marginal Tietê · São Paulo - SP", phone: "1132284271", phoneDisplay: "(11) 3228-4271", image: "assets/optimized/unidade-marginal-tiete.webp", whatsapp: "https://wa.me/5511913707061" },
  guarulhos: { name: "Guarulhos", tag: "Grande São Paulo", address: "Av. Antônio de Souza, 186 · Jardim Santa Francisca · Guarulhos - SP", phone: "1124434062", phoneDisplay: "(11) 2443-4062", image: "assets/optimized/unidade-guarulhos.webp", whatsapp: "https://wa.me/5511977891460" },
  "vila-mariana": { name: "Vila Mariana", tag: "Zona Sul", address: "Rua Pedro de Toledo, 1361 · Vila Mariana · São Paulo - SP", phone: "1155557489", phoneDisplay: "(11) 5555-7489", image: "assets/optimized/unidade-vila-mariana.webp", whatsapp: "https://wa.me/5511925296446" },
  morumbi: { name: "Morumbi", tag: "Zona Sul", address: "Av. Dr. Guilherme Dumont Vilares, 2394 · Vila Andrade · São Paulo - SP", phone: "11999088541", phoneDisplay: "(11) 99908-8541", image: "assets/optimized/unidade-morumbi.webp", whatsapp: "https://wa.me/5511995706960" },
  "sao-bernardo": { name: "São Bernardo", tag: "ABC Paulista", address: "Rua Carlos Olávo Vicentini, 77 · Planalto · São Bernardo do Campo - SP", phone: "11913662743", phoneDisplay: "(11) 91366-2743", image: "assets/optimized/unidade-sao-bernardo.webp", whatsapp: "https://wa.me/5511913662743" },
  "barra-funda": { name: "Barra Funda", tag: "Zona Oeste", address: "Av. Marquês de São Vicente, 1771 · Várzea da Barra Funda · São Paulo - SP", phone: "1153993456", phoneDisplay: "(11) 5399-3456", image: "assets/optimized/unidade-barra-funda.webp", whatsapp: "https://wa.me/5511943976727" },
};
const unit = units[pageUnit];
const query = encodeURIComponent(unit.address);
const publishedGallery = window.unitGalleries?.[pageUnit] || [];
const photos = publishedGallery.length ? publishedGallery : [
  { src: unit.image, alt: `Fachada ou ambiente da unidade D'Brescia ${unit.name}` },
];
const mediaItems = photos.map((photo, index) => ({
  type: "photo", label: ["A casa", "Ambiente", "Detalhes"][index] || "Galeria",
  title: index === 0 ? `D'Brescia ${unit.name}` : `D'Brescia ${unit.name} · Foto ${index + 1}`,
  description: "Um registro da experiência e da hospitalidade da nossa unidade.", image: photo.src,
  alt: photo.alt, thumb: photo.thumb || photo.src,
}));
document.querySelectorAll("[data-unit-name]").forEach((node) => { node.textContent = unit.name; });
document.querySelectorAll("[data-unit-tag]").forEach((node) => { node.textContent = unit.tag; });
document.querySelectorAll("[data-unit-address]").forEach((node) => { node.textContent = unit.address; });
document.querySelectorAll("[data-unit-phone]").forEach((node) => { node.textContent = unit.phoneDisplay; });
document.querySelectorAll("[data-unit-phone-link]").forEach((node) => { node.href = `tel:+55${unit.phone}`; });
document.querySelectorAll("[data-unit-image]").forEach((node) => { node.src = `${base}${publishedGallery[0]?.src || unit.image}`; node.alt = `Ambiente da unidade D'Brescia ${unit.name}`; });
document.querySelectorAll("[data-unit-whatsapp]").forEach((node) => { node.href = unit.whatsapp; });
document.querySelectorAll("[data-unit-map]").forEach((node) => { node.href = `https://www.google.com/maps/search/?api=1&query=${query}`; });

const rail = document.querySelector("[data-story-rail]");
rail.innerHTML = mediaItems.slice(0, 4).map((story, index) => `<button class="story-card" type="button" data-story="${index}" aria-label="Abrir ${story.label}: ${story.title}"><span class="story-ring"><img src="${base}${story.thumb || story.image}" alt="" loading="lazy" decoding="async"></span><span>${story.label}</span>${story.type === "video" ? '<b aria-hidden="true">▶</b>' : ""}</button>`).join("");

const gallery = document.querySelector("[data-gallery]");
gallery.innerHTML = `<div class="gallery-viewer" role="region" aria-label="Galeria de fotos da unidade ${unit.name}"><div class="gallery-viewer__stage"><button class="gallery-viewer__control gallery-viewer__control--previous" type="button" data-gallery-previous aria-label="Foto anterior"><span aria-hidden="true">←</span></button><button class="gallery-viewer__main" type="button" data-gallery-main data-gallery-open aria-haspopup="dialog" aria-label="Abrir foto em tela cheia"><img data-gallery-image src="" alt=""></button><button class="gallery-viewer__control gallery-viewer__control--next" type="button" data-gallery-next aria-label="Próxima foto"><span aria-hidden="true">→</span></button></div><div class="gallery-viewer__toolbar"><p class="gallery-viewer__count" data-gallery-count aria-live="polite"></p><div class="gallery-viewer__thumbs" aria-label="Fotos da unidade">${mediaItems.map((story, index) => `<button class="gallery-viewer__thumb" type="button" data-gallery-thumb="${index}" aria-pressed="false" aria-label="Ver foto ${index + 1} de ${mediaItems.length}: ${story.alt}"><img src="${base}${story.thumb || story.image}" alt="" loading="lazy" decoding="async"></button>`).join("")}</div></div></div>`;
let activeGalleryItem = 0;
const galleryImage = gallery.querySelector("[data-gallery-image]");
const galleryMain = gallery.querySelector("[data-gallery-main]");
const galleryCount = gallery.querySelector("[data-gallery-count]");
const galleryPrevious = gallery.querySelector("[data-gallery-previous]");
const galleryNext = gallery.querySelector("[data-gallery-next]");
function setGalleryItem(index, focus = false) {
  activeGalleryItem = (index + mediaItems.length) % mediaItems.length;
  const item = mediaItems[activeGalleryItem];
  galleryImage.src = `${base}${item.image}`;
  galleryImage.alt = item.alt || item.title;
  galleryMain.setAttribute("aria-label", `Abrir foto ${activeGalleryItem + 1} de ${mediaItems.length} em tela cheia`);
  galleryCount.textContent = `${activeGalleryItem + 1} / ${mediaItems.length}`;
  gallery.querySelectorAll("[data-gallery-thumb]").forEach((thumb, thumbIndex) => {
    const selected = thumbIndex === activeGalleryItem;
    thumb.classList.toggle("is-active", selected);
    thumb.setAttribute("aria-pressed", String(selected));
    thumb.setAttribute("aria-current", selected ? "true" : "false");
    if (selected) { thumb.scrollIntoView({ block: "nearest", inline: "center", behavior: focus ? "smooth" : "auto" }); }
  });
}
setGalleryItem(0);
gallery.querySelectorAll("[data-gallery-thumb]").forEach((thumb) => thumb.addEventListener("click", () => setGalleryItem(Number(thumb.dataset.galleryThumb), true)));
galleryPrevious.addEventListener("click", () => setGalleryItem(activeGalleryItem - 1, true));
galleryNext.addEventListener("click", () => setGalleryItem(activeGalleryItem + 1, true));
let galleryPointerStart = null;
let galleryDidSwipe = false;
galleryMain.addEventListener("pointerdown", (event) => { galleryDidSwipe = false; galleryPointerStart = { x: event.clientX, y: event.clientY }; });
galleryMain.addEventListener("pointerup", (event) => {
  if (!galleryPointerStart) return;
  const distanceX = event.clientX - galleryPointerStart.x;
  const distanceY = event.clientY - galleryPointerStart.y;
  galleryPointerStart = null;
  if (Math.abs(distanceX) >= 48 && Math.abs(distanceX) > Math.abs(distanceY)) { galleryDidSwipe = true; setGalleryItem(activeGalleryItem + (distanceX < 0 ? 1 : -1), true); }
});
galleryMain.addEventListener("pointercancel", () => { galleryPointerStart = null; });

const dialog = document.querySelector("#story-dialog");
const dialogBody = document.querySelector("[data-story-dialog-body]");
let activeStory = 0;
let dialogTrigger = null;
function renderStory(index) {
  activeStory = (index + mediaItems.length) % mediaItems.length;
  const story = mediaItems[activeStory];
  dialogBody.innerHTML = `<button class="story-close" type="button" data-story-close aria-label="Fechar foto em tela cheia">×</button><button class="story-nav story-nav--previous" type="button" data-story-previous aria-label="Foto anterior">‹</button><div class="story-media"><img src="${base}${story.image}" alt="${story.alt || story.title}"></div><p class="story-counter" aria-live="polite">${activeStory + 1} / ${mediaItems.length}</p><button class="story-nav story-nav--next" type="button" data-story-next aria-label="Próxima foto">›</button>`;
  dialog.querySelector("[data-story-close]").focus();
  dialog.querySelector("[data-story-close]").addEventListener("click", () => dialog.close());
  dialog.querySelector("[data-story-previous]").addEventListener("click", () => renderStory(activeStory - 1));
  dialog.querySelector("[data-story-next]").addEventListener("click", () => renderStory(activeStory + 1));
}
function openStory(index, trigger) { dialogTrigger = trigger || null; renderStory(index); dialog.showModal(); }
document.querySelectorAll("[data-story]").forEach((button) => button.addEventListener("click", () => openStory(Number(button.dataset.story), button)));
galleryMain.addEventListener("click", (event) => { if (galleryDidSwipe) { event.preventDefault(); galleryDidSwipe = false; return; } openStory(activeGalleryItem, galleryMain); });
dialog.addEventListener("close", () => { if (dialogTrigger) { dialogTrigger.focus(); dialogTrigger = null; } });
dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("keydown", (event) => { if (event.key === "ArrowLeft") renderStory(activeStory - 1); if (event.key === "ArrowRight") renderStory(activeStory + 1); });
let storyPointerStart = null;
function navigateStoryBySwipe(start, end) { const distanceX = end.x - start.x; const distanceY = end.y - start.y; if (Math.abs(distanceX) < 48 || Math.abs(distanceX) <= Math.abs(distanceY)) return; renderStory(activeStory + (distanceX < 0 ? 1 : -1)); }
function startsOnStoryControl(target) { return target instanceof Element && Boolean(target.closest("button")); }
dialog.addEventListener("pointerdown", (event) => { if (!startsOnStoryControl(event.target)) storyPointerStart = { x: event.clientX, y: event.clientY }; });
dialog.addEventListener("pointerup", (event) => { if (!storyPointerStart) return; navigateStoryBySwipe(storyPointerStart, { x: event.clientX, y: event.clientY }); storyPointerStart = null; });
dialog.addEventListener("pointercancel", () => { storyPointerStart = null; });
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!reduceMotion && "IntersectionObserver" in window) {
  const items = document.querySelectorAll("[data-reveal]");
  const observer = new IntersectionObserver((entries, currentObserver) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add("is-visible"); currentObserver.unobserve(entry.target); } }), { threshold: 0.14 });
  items.forEach((item) => observer.observe(item));
}