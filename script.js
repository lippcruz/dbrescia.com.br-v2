const centralLink = "https://linktr.ee/dbrescia";

const menuItems = {
  carnes: {
    title: "Categoria selecionada · Carnes",
    points: [
      "Picanha nobre e cortes especiais",
      "Bife ancho, chorizo e assado de tira",
      "Costela premium e cordeiro",
      "Seleção rotativa do mestre churrasqueiro",
    ],
    images: ["assets/figma/dbc1e.png", "assets/figma/3e852.png", "assets/figma/bd625.png"],
    captions: ["Cortes nobres", "Buffet completo", "Sobremesas da casa"],
  },
  buffet: {
    title: "Categoria selecionada · Buffet",
    points: [
      "26 tipos de saladas e entradas frescas",
      "Culinária japonesa e pratos quentes",
      "Acompanhamentos clássicos do churrasco",
      "Reposição constante durante o serviço",
    ],
    images: ["assets/figma/3e852.png", "assets/figma/dbc1e.png", "assets/figma/4d13c.png"],
    captions: ["Buffet completo", "Cortes da casa", "Ambiente acolhedor"],
  },
  bebidas: {
    title: "Categoria selecionada · Bebidas",
    points: [
      "Vinhos selecionados para cortes nobres",
      "Chopp gelado e cervejas parceiras",
      "Drinques clássicos e autorais",
      "Atendimento por unidade para eventos",
    ],
    images: ["assets/figma/4d13c.png", "assets/figma/53ff4.png", "assets/figma/cb8c1.png"],
    captions: ["Adega e salão", "Ambev", "Brahma"],
  },
  sobremesas: {
    title: "Categoria selecionada · Sobremesas",
    points: [
      "Produção diária feita na casa",
      "Receitas clássicas para fechar o rodízio",
      "Opções cremosas, frutas e doces brasileiros",
      "Seleção rotativa conforme a unidade",
    ],
    images: ["assets/figma/bd625.png", "assets/figma/3e852.png", "assets/figma/dbc1e.png"],
    captions: ["Sobremesas da casa", "Buffet completo", "Cortes nobres"],
  },
};

const units = [
  {
    name: "Santo André",
    tag: "ABC Paulista",
    address: "Av. Dom Pedro II, 444 · Jardim",
    image: "content/unidades/Santo%20Andr%C3%A9.png",
    whatsapp: "https://wa.me/5511996057584",
  },
  {
    name: "Paraíso",
    tag: "Bela Vista",
    address: "Rua Pedro Ivo, 63 · Bela Vista",
    image: "content/unidades/Para%C3%ADso.png",
    whatsapp: "https://wa.me/5511974663743",
  },
  {
    name: "Faria Lima",
    tag: "Adega · Parrilla",
    address: "Av. Brig. Faria Lima, 3167",
    image: "content/unidades/Faria%20Lima.png",
    whatsapp: "https://wa.me/5511978285657",
  },
  {
    name: "Marginal Tietê",
    tag: "Zona Norte",
    address: "Pç. Bento de Camargo Barros, 172",
    image: "content/unidades/Marginal%20Tiet%C3%AA.png",
    whatsapp: centralLink,
  },
  {
    name: "Guarulhos",
    tag: "Grande São Paulo",
    address: "Unidade Guarulhos",
    image: "content/unidades/Guarulhos.png",
    whatsapp: centralLink,
  },
  {
    name: "Vila Mariana",
    tag: "Zona Sul",
    address: "Unidade Vila Mariana",
    image: "content/unidades/Vila%20Mariana.jpg",
    whatsapp: centralLink,
  },
  {
    name: "Morumbi",
    tag: "Zona Oeste",
    address: "Unidade Morumbi",
    image: "content/unidades/Morumbi.jpeg",
    whatsapp: centralLink,
  },
  {
    name: "São Bernardo",
    tag: "ABC Paulista",
    address: "Unidade São Bernardo",
    image: "content/unidades/S%C3%A3o%20Bernardo.png",
    whatsapp: centralLink,
  },
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
  });

  menuPanel.innerHTML = `
    <h3>${item.title}</h3>
    <ul>${item.points.map((point) => `<li>${point}</li>`).join("")}</ul>
    <a class="text-link" href="https://www.dbrescia.com.br/" target="_blank" rel="noreferrer">Ver cardápio completo</a>
  `;

  [menuImageMain.src, menuImageSide.src, menuImageBottom.src] = item.images;
  [menuCaptionMain.textContent, menuCaptionSide.textContent, menuCaptionBottom.textContent] = item.captions;
}

menuTabs.forEach((tab) => {
  tab.addEventListener("click", () => setMenu(tab.dataset.menuTab));
});

setMenu("carnes");

const unitControls = document.querySelector(".unit-controls");
const unitGrid = document.querySelector(".unit-grid");
const unitImage = document.querySelector("[data-unit-main-image]");
const unitIndex = document.querySelector("[data-unit-index]");
const unitName = document.querySelector("[data-unit-name]");
const unitAddress = document.querySelector("[data-unit-address]");
const unitWhatsapp = document.querySelector("[data-unit-whatsapp]");

function setUnit(index) {
  const unit = units[index];
  unitImage.src = unit.image;
  unitImage.alt = `Unidade ${unit.name}`;
  unitIndex.textContent = `${String(index + 1).padStart(2, "0")} / ${String(units.length).padStart(2, "0")}`;
  unitName.textContent = unit.name;
  unitAddress.textContent = `${unit.tag} · ${unit.address}`;
  unitWhatsapp.href = unit.whatsapp;

  document.querySelectorAll(".unit-thumb").forEach((button, buttonIndex) => {
    button.classList.toggle("is-active", buttonIndex === index);
    button.setAttribute("aria-pressed", String(buttonIndex === index));
  });
}

unitControls.innerHTML = units
  .map((unit, index) => `<button class="unit-thumb" type="button" data-unit="${index}" aria-pressed="false">${unit.name}</button>`)
  .join("");

unitGrid.innerHTML = units
  .map(
    (unit, index) => `
      <button class="unit-card" type="button" data-unit="${index}">
        <img src="${unit.image}" alt="">
        <div>
          <strong>${unit.name}</strong>
          <span>${unit.tag}</span>
        </div>
      </button>
    `
  )
  .join("");

document.querySelectorAll("[data-unit]").forEach((button) => {
  button.addEventListener("click", () => {
    setUnit(Number(button.dataset.unit));
    document.querySelector(".unit-feature").scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
});

setUnit(0);

const menuButton = document.querySelector(".menu-button");
const mobileMenu = document.querySelector("#mobile-menu");
const closeMenuButton = document.querySelector("[data-close-menu]");

function closeMobileMenu() {
  mobileMenu.close();
  document.body.classList.remove("menu-open");
  menuButton.focus();
}

menuButton.addEventListener("click", () => {
  mobileMenu.showModal();
  document.body.classList.add("menu-open");
});

closeMenuButton.addEventListener("click", closeMobileMenu);

mobileMenu.addEventListener("click", (event) => {
  if (event.target === mobileMenu || event.target.matches("a")) {
    closeMobileMenu();
  }
});

mobileMenu.addEventListener("close", () => {
  document.body.classList.remove("menu-open");
});
