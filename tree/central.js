const buttons = document.querySelectorAll('[data-mode]');
const cards = document.querySelectorAll('.unit-card');
const status = document.querySelector('[data-directory-status]');

function setMode(mode) {
  const delivery = mode === 'delivery';
  buttons.forEach((button) => {
    const active = button.dataset.mode === mode;
    button.classList.toggle('is-active', active);
    button.setAttribute('aria-pressed', String(active));
  });
  cards.forEach((card) => {
    card.hidden = delivery && card.dataset.delivery !== 'true';
    card.classList.toggle('is-delivery', delivery);
  });
  status.textContent = delivery ? 'Selecione uma unidade disponível para pedir pelo iFood.' : 'Escolha uma unidade para reservar pelo WhatsApp.';
}

buttons.forEach((button) => button.addEventListener('click', () => setMode(button.dataset.mode)));
document.querySelector('[data-show-delivery]').addEventListener('click', () => {
  setMode('delivery');
  document.querySelector('#unidades').scrollIntoView({ behavior: 'smooth', block: 'start' });
});
