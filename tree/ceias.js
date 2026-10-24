// Links das ceias de 2026, informados pelo cliente.
const ceiasLinks = {
  natal: {
    'santo-andre': 34283,
    'sao-bernardo': 34379,
    guarulhos: 34370,
    'faria-lima': 34359,
    paraiso: 34374,
    'vila-mariana': 34380,
    'marginal-tiete': 34371,
    'barra-funda': 34358,
    morumbi: 34372
  },
  reveillon: {
    'santo-andre': 34284,
    'sao-bernardo': 34378,
    guarulhos: 34376,
    'faria-lima': 34361,
    paraiso: 34375,
    'vila-mariana': 34381,
    'marginal-tiete': 34377,
    'barra-funda': 34360,
    morumbi: 34373
  }
};
const ceiasUnits = [
  ['santo-andre', 'Santo André'],
  ['sao-bernardo', 'São Bernardo'],
  ['guarulhos', 'Guarulhos'],
  ['faria-lima', 'Faria Lima'],
  ['paraiso', 'Paraíso'],
  ['vila-mariana', 'Vila Mariana'],
  ['marginal-tiete', 'Marginal Tietê'],
  ['barra-funda', 'Barra Funda'],
  ['morumbi', 'Morumbi']
];

document.querySelectorAll('[data-ceia]').forEach((card) => {
  const occasion = card.dataset.ceia;
  const select = card.querySelector('[data-ceia-unit]');
  const action = card.querySelector('[data-ceia-action]');
  ceiasUnits.forEach(([key, label]) => {
    const option = document.createElement('option');
    option.value = key;
    option.textContent = label;
    select.append(option);
  });
  select.addEventListener('change', () => {
    const eventId = ceiasLinks[occasion][select.value];
    if (!eventId) {
      action.removeAttribute('href');
      action.setAttribute('aria-disabled', 'true');
      action.textContent = 'Selecione uma unidade';
      action.removeAttribute('aria-label');
      return;
    }
    const slug = occasion === 'natal' ? 'natal' : 'reveillon';
    action.href = 'https://www.ticket360.com.br/evento/' + eventId + '/ingressos-para-ceia-de-' + slug;
    action.setAttribute('aria-disabled', 'false');
    action.textContent = 'Comprar ingresso';
    action.setAttribute('aria-label', 'Comprar ingresso de ' + (occasion === 'natal' ? 'Natal' : 'Réveillon') + ' para ' + select.selectedOptions[0].textContent + ' na Ticket360');
  });
  action.addEventListener('click', (event) => {
    if (action.getAttribute('aria-disabled') === 'true') event.preventDefault();
  });
});