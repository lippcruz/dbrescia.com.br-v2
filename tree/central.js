const buttons = document.querySelectorAll('[data-mode]');
const cards = document.querySelectorAll('.unit-card');
const status = document.querySelector('[data-directory-status]');
const deliveryNote = document.querySelector('.delivery-note');
const prices = window.DBRESCIA_PRECOS;
let priceNote = null;

if (prices) {
  cards.forEach((card) => {
    const unit = prices.unidades[card.dataset.unit];
    if (!unit) return;
    const price = (value, label) => `<div class="unit-prices__item"><b><small>R$</small> ${value}</b>${label ? `<small>${label}</small>` : ''}</div>`;
    const today = new Date().toLocaleDateString('sv-SE');
    const promo = (prices.promocoes || []).find((item) => item.periodo === 'jantar' && item.ate >= today && item.unidades.includes(card.dataset.unit));
    const dinner = promo
      ? price(unit.jantar, promo.demaisDias) + `<div class="unit-prices__item unit-prices__item--promo"><s>de R$ ${unit.jantar}</s><b><small>R$</small> ${promo.preco}</b><small>Promoção · ${promo.dias}</small></div>`
      : price(unit.jantar);
    const block = document.createElement('div');
    block.className = 'unit-prices';
    block.innerHTML = `<strong>Rodízio</strong>`
      + `<div class="unit-prices__period"><h4>Almoço</h4><div class="unit-prices__row">${price(unit.almocoSemana, 'seg a sex')}${price(unit.almocoFimDeSemana, 'sáb, dom e fer')}</div></div>`
      + `<div class="unit-prices__period"><h4>Jantar</h4><div class="unit-prices__row">${dinner}</div></div>`
      + `<p class="unit-prices__extra"><em>Infantil (6 a 11 anos) <b>R$ ${unit.infantil}</b></em> <em>Só buffet <b>R$ ${unit.buffet}</b></em></p>`;
    card.querySelector('.unit-card__content > p').after(block);
    const menu = document.createElement('a');
    menu.dataset.menuLink = '';
    menu.href = `cardapios/${card.dataset.unit}.pdf`;
    menu.target = '_blank';
    menu.rel = 'noreferrer';
    menu.innerHTML = 'Ver cardápio completo <b>↗</b>';
    card.querySelector('[data-reservation]').after(menu);
  });
  priceNote = document.createElement('p');
  priceNote.className = 'price-note';
  priceNote.textContent = `Valores por pessoa, vigentes em ${prices.vigencia}. Bebidas e sobremesas à parte.`;
  deliveryNote.before(priceNote);
}

function setMode(mode) {
  const delivery = mode === 'delivery';
  const events = mode === 'events';
  buttons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  cards.forEach((card) => {
    card.hidden = delivery && card.dataset.delivery !== 'true';
    card.classList.toggle('is-delivery', delivery);
    card.classList.toggle('is-event', events);
    const image = card.querySelector(':scope > img');
    if (!image) return;
    if (!image.dataset.originalSrc) {
      image.dataset.originalSrc = image.getAttribute('src');
      image.dataset.originalAlt = image.alt;
    }
    image.src = events ? image.dataset.eventImage : image.dataset.originalSrc;
    image.alt = events ? `Salão para eventos da unidade D'Brescia ${card.querySelector('h3').textContent}` : image.dataset.originalAlt;
  });
  deliveryNote.hidden = events;
  if (priceNote) priceNote.hidden = delivery || events;
  status.textContent = events
    ? 'Conheça os ambientes e fale diretamente com a unidade para realizar seu evento.'
    : delivery
      ? 'Selecione uma unidade disponível para pedir pelo iFood ou Keeta.'
      : 'Escolha uma unidade para reservar pelo WhatsApp.';
}

buttons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));

const requestedMode = new URLSearchParams(window.location.search).get('mode');
if (["reservation", "delivery", "events"].includes(requestedMode)) {
  setMode(requestedMode);
  if (window.location.hash === "#unidades") {
    requestAnimationFrame(() => document.querySelector("#unidades").scrollIntoView({ behavior: "auto", block: "start" }));
  }
}
document.querySelector('[data-show-delivery]').addEventListener('click', () => {
  setMode('delivery');
  document.querySelector('#unidades').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

document.querySelector('[data-show-events]').addEventListener('click', () => {
  setMode('events');
  document.querySelector('#unidades').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reduceMotion && 'IntersectionObserver' in window) {
  const revealTargets = document.querySelectorAll('.section-heading, .mode-switch, .unit-card, .delivery-note, .other-links__grid, .footer');
  revealTargets.forEach((target) => target.classList.add('reveal'));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((target) => observer.observe(target));
}