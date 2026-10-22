// Preços do rodízio por unidade. Para reajustar, altere as tabelas abaixo e a vigência.
// Os cardápios completos ficam em tree/cardapios/<unidade>.pdf (substitua o arquivo mantendo o nome).
window.DBRESCIA_PRECOS = (() => {
  const tabela = (almocoSemana, almocoFimDeSemana, jantar, infantil) => ({
    almocoSemana,
    almocoFimDeSemana,
    jantar,
    infantil,
    buffet: '119,90'
  });
  const premium = tabela('189,90', '199,90', '174,90', '99,90');
  const paraiso = tabela('179,90', '189,90', '169,90', '99,90');
  const intermediaria = tabela('159,90', '179,90', '149,90', '99,90');
  const padrao = tabela('154,90', '169,90', '144,90', '89,90');

  return {
    vigencia: 'outubro de 2026',
    unidades: {
      'faria-lima': premium,
      'barra-funda': premium,
      paraiso,
      morumbi: intermediaria,
      'sao-bernardo': intermediaria,
      'santo-andre': padrao,
      guarulhos: padrao,
      'vila-mariana': padrao,
      'marginal-tiete': padrao
    }
  };
})();
