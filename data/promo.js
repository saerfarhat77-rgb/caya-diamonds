/* GERADO por _tools/montar_promocao.py a partir de _tools/promocao.json — nao edite aqui.
   Promocao global do site: o preco do catalogo ja sai com o desconto em comum.js,
   e o servidor (supabase/functions/_shared/promo.ts) usa a mesma conta no checkout. */
window.CAYA_PROMO = (function () {
  const P = {
  "ativa": true,
  "nome": "Promoção de Novembro",
  "percentual": 15,
  "especiais": {},
  "precos": {
    "colors-collection|pts=10": 1900,
    "colors-collection|pts=30": 4030,
    "colors-collection|pts=40": 4790,
    "colors-collection|pts=50": 6090,
    "noivado-amarelo-retangular-399": 210536,
    "noivado-espiral-300": 126011,
    "noivado-cushion-halo-425": 340258,
    "noivado-amarelo-oval-410": 118133,
    "noivado-redondo-374": 46090,
    "noivado-amarelo-retangular-360": 121183,
    "noivado-amarelo-pera-425": 100130
  },
  "inicio": "2026-11-01T00:00:00-03:00",
  "fim": "2026-11-30T23:59:59-03:00",
  "passo": 10,
  "acumula_primeira": false,
  "faixa": {
    "titulo": "Novembro Caya · 15% off em todas as peças",
    "detalhe": "até 30 de novembro"
  }
};
  const quando = (s) => (s ? Date.parse(s) : null);
  /* dentro da janela da promocao (datas com o fuso de Brasilia no proprio texto) */
  P.vigente = function () {
    if (!P.ativa) return false;
    const agora = Date.now(), i = quando(P.inicio), f = quando(P.fim);
    return (i === null || agora >= i) && (f === null || agora <= f);
  };
  /* percentual da peca: o de "especiais" ou, sem ele, o geral */
  P.percentualDe = function (id) { return (P.especiais || {})[id] || P.percentual; };
  /* preco com desconto, arredondado para baixo em multiplos de `passo` reais */
  P.preco = function (cheio, id, pts) {
    /* preco final exato definido por peca ou por tamanho vale antes do percentual */
    const fixo = (P.precos || {})[id] || (P.precos || {})[id + '|pts=' + pts];
    if (fixo && fixo < cheio) return fixo;
    const passo = P.passo || 1;
    const novo = Math.floor((cheio * (100 - P.percentualDe(id))) / 100 / passo) * passo;
    return novo > 0 && novo < cheio ? novo : cheio;
  };
  return P;
})();
