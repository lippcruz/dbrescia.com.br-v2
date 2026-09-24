const buttons = document.querySelectorAll('[data-mode]');
const cards = document.querySelectorAll('.unit-card');
const status = document.querySelector('[data-directory-status]');
const deliveryNote = document.querySelector('.delivery-note');

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
  status.textContent = events
    ? 'Conheça os ambientes e fale diretamente com a unidade para realizar seu evento.'
    : delivery
      ? 'Selecione uma unidade disponível para pedir pelo iFood ou Keeta.'
      : 'Escolha uma unidade para reservar pelo WhatsApp.';
}

buttons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
document.querySelector('[data-show-delivery]').addEventListener('click', () => {
  setMode('delivery');
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