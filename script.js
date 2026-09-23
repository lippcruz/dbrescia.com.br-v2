const centralLink = "https://linktr.ee/dbrescia";

const menuItems = {
  carnes: { title: "Categoria selecionada · Carnes", points: ["Picanha nobre e cortes especiais", "Bife ancho, chorizo e assado de tira", "Costela premium e cordeiro", "Seleção rotativa do mestre churrasqueiro"], images: ["assets/figma/dbc1e.png", "assets/figma/3e852.png", "assets/figma/bd625.png"], captions: ["Cortes nobres", "Buffet completo", "Sobremesas da casa"] },
  buffet: { title: "Categoria selecionada · Buffet", points: ["26 tipos de saladas e entradas frescas", "Culinária japonesa e pratos quentes", "Acompanhamentos clássicos do churrasco", "Reposição constante durante o serviço"], images: ["assets/figma/3e852.png", "assets/figma/dbc1e.png", "assets/optimized/ambiente.webp"], captions: ["Buffet completo", "Cortes da casa", "Ambiente acolhedor"] },
  bebidas: { title: "Categoria selecionada · Bebidas", points: ["Vinhos selecionados para cortes nobres", "Chopp gelado e cervejas parceiras", "Drinques clássicos e autorais", "Atendimento por unidade para eventos"], images: ["assets/optimized/ambiente.webp", "assets/figma/53ff4.png", "assets/figma/cb8c1.png"], captions: ["Adega e salão", "Ambev", "Brahma"] },
  sobremesas: { title: "Categoria selecionada · Sobremesas", points: ["Produção diária feita na casa", "Receitas clássicas para fechar o rodízio", "Opções cremosas, frutas e doces brasileiros", "Seleção rotativa conforme a unidade"], images: ["assets/figma/bd625.png", "assets/figma/3e852.png", "assets/figma/dbc1e.png"], captions: ["Sobremesas da casa", "Buffet completo", "Cortes nobres"] },
};

const units = [
  { name: "Santo André", slug: "santo-andre", tag: "ABC Paulista", address: "Av. Dom Pedro II, 444 · Jardim", image: "assets/optimized/unidade-santo-andre.webp", whatsapp: "https://wa.me/5511996057584" },
  { name: "Paraíso", slug: "paraiso", tag: "Bela Vista", address: "Rua Pedro Ivo, 63 · Bela Vista", image: "assets/optimized/unidade-paraiso.webp", whatsapp: "https://wa.me/5511974663743" },
  { name: "Faria Lima", slug: "faria-lima", tag: "Adega · Parrilla", address: "Av. Brig. Faria Lima, 3167", image: "assets/optimized/unidade-faria-lima.webp", whatsapp: "https://wa.me/5511978285657" },
  { name: "Marginal Tietê", slug: "marginal-tiete", tag: "Zona Norte", address: "Pç. Bento de Camargo Barros, 172", image: "assets/optimized/unidade-marginal-tiete.webp", whatsapp: centralLink },
  { name: "Guarulhos", slug: "guarulhos", tag: "Grande São Paulo", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-guarulhos.webp", whatsapp: centralLink },
  { name: "Vila Mariana", slug: "vila-mariana", tag: "Zona Sul", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-vila-mariana.webp", whatsapp: centralLink },
  { name: "Morumbi", slug: "morumbi", tag: "Zona Oeste", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-morumbi.webp", whatsapp: centralLink },
  { name: "São Bernardo", slug: "sao-bernardo", tag: "ABC Paulista", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-sao-bernardo.webp", whatsapp: centralLink },
  { name: "Barra Funda", slug: "barra-funda", tag: "Zona Oeste", address: "Endereço confirmado pela central D'Brescia", image: "assets/optimized/unidade-barra-funda.webp", whatsapp: centralLink },
];

const menuPanel = document.querySelector("#menu-panel");
const menuTabs = document.querySelectorAll("[data-menu-tab]");
const menuImageMain = document.querySelector("[data-menu-image-main]");
const menuImageSide = document.querySelector("[data-menu-image-side]");
const menuImageBottom = document.querySelector("[data-menu-image-bottom]");
const menuCaptionMain = document.querySelector("[data-menu-caption-main]");
const menuCaptionSide = document.querySelector("[data-menu-caption-side]");
const menuCaptionBottom = document.querySelector("[data-menu-caption-bottom]");

function setMenu(key) {
  const item = menuItems[key];
  if (!item) return;
  menuTabs.forEach((tab) => {
    const active = tab.dataset.menuTab === key;
    tab.classList.toggle("is-active", active);
    tab.setAttribute("aria-selected", String(active));
    tab.setAttribute("tabindex", active ? "0" : "-1");
  });
  menuPanel.setAttribute("aria-labelledby", `tab-${key}`);
  menuPanel.innerHTML = `<h3>${item.title}</h3><ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul><a class="text-link" href="https://www.dbrescia.com.br/" target="_blank" rel="noreferrer">Ver cardápio completo</a>`;
  [menuImageMain.src, menuImageSide.src, menuImageBottom.src] = item.images;
  [menuCaptionMain.textContent, menuCaptionSide.textContent, menuCaptionBottom.textContent] = item.captions;
}

menuTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => setMenu(tab.dataset.menuTab));
  tab.addEventListener("keydown", (event) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === "Home" ? 0 : event.key === "End" ? menuTabs.length - 1 : (index + (event.key === "ArrowRight" ? 1 : -1) + menuTabs.length) % menuTabs.length;
    setMenu(menuTabs[nextIndex].dataset.menuTab);
    menuTabs[nextIndex].focus();
  });
});
setMenu("carnes");

const unitControls = document.querySelector(".unit-controls");
const unitGrid = document.querySelector(".unit-grid");
const unitImage = document.querySelector("[data-unit-main-image]");
const unitIndex = document.querySelector("[data-unit-index]");
const unitName = document.querySelector("[data-unit-name]");
const unitAddress = document.querySelector("[data-unit-address]");
const unitWhatsapp = document.querySelector("[data-unit-whatsapp]");
const unitPage = document.querySelector("[data-unit-page]");

function setUnit(index) {
  const unit = units[index];
  unitImage.src = unit.image;
  unitImage.alt = `Fachada ou ambiente da unidade D'Brescia ${unit.name}`;
  unitIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${String(units.length).padStart(2, "0")}`;
  unitName.textContent = unit.name;
  unitAddress.textContent = `${unit.tag} · ${unit.address}`;
  unitWhatsapp.href = unit.whatsapp;
  if (unitPage) unitPage.href = `unidades/${unit.slug}/`;
  document.querySelectorAll(".unit-thumb").forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === index);
    button.setAttribute("aria-pressed", String(buttonIndex === index));
  });
}

unitControls.innerHTML = units.map((unit, index) => `<button class="unit-thumb" type="button" data-unit="${index}" aria-pressed="false">${unit.name}</button>`).join("");
unitGrid.innerHTML = units.map((unit) => `<a class="unit-card" href="unidades/${unit.slug}/" aria-label="Abrir página da unidade ${unit.name}"><img src="${unit.image}" alt="" loading="lazy" decoding="async"><div><strong>${unit.name}</strong><span>${unit.tag}</span></div><em>Conheça a unidade <span aria-hidden="true">→</span></em></a>`).join("");

document.querySelectorAll(".unit-thumb").forEach((button) => button.addEventListener("click", () => {
  setUnit(Number(button.dataset.unit));
  document.querySelector(".unit-feature").scrollIntoView({ behavior: "smooth", block: "nearest" });
}));
setUnit(0);

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const closeMenuButton = document.querySelector("[data-close-menu]");
function closeMobileMenu() { mobileMenu.close(); menuButton.focus(); }
menuButton.addEventListener("click", () => { mobileMenu.showModal(); menuButton.setAttribute("aria-expanded", "true"); closeMenuButton.focus(); });
closeMenuButton.addEventListener("click", closeMobileMenu);
mobileMenu.addEventListener("click", (event) => { if (event.target === mobileMenu || event.target.matches("a")) mobileMenu.close(); });
mobileMenu.addEventListener("close", () => { document.body.classList.remove("menu-open"); menuButton.setAttribute("aria-expanded", "false"); });
mobileMenu.addEventListener("cancel", () => menuButton.setAttribute("aria-expanded", "false"));

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealTargets = document.querySelectorAll(".proof-band, .section, .partners, .closing, .site-footer");
if (!reduceMotion && "IntersectionObserver" in window) {
  revealTargets.forEach((target) => target.classList.add("reveal"));
  const revealObserver = new IntersectionObserver((entries, observer) => entries.forEach((entry) => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: 0.12 });
  revealTargets.forEach((target) => revealObserver.observe(target));
}
