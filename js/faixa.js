/* Faixa da promocao no topo da pagina. Aparece sozinha enquanto a promocao de
   _tools/promocao.json estiver vigente (data/promo.js), e desaparece no dia seguinte
   ao fim, sem mexer em pagina nenhuma. Precisa de comum.js antes.
   Uso: Caya.montarFaixa() */
(function () {
  Caya.montarFaixa = function () {
    const P = Caya.promo;
    if (!P || !P.faixa || !P.faixa.titulo) return;
    const faixa = document.createElement('aside');
    faixa.className = 'faixa-promo';
    faixa.setAttribute('aria-label', P.nome || 'Promoção');
    const detalhe = P.faixa.detalhe ? '<span>' + P.faixa.detalhe + '</span>' : '';
    faixa.innerHTML = '<p><b>' + P.faixa.titulo + '</b>' + detalhe + '</p>';
    document.body.prepend(faixa);
  };
})();
