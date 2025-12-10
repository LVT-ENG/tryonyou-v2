const recomendarPrenda = {
  description: 'Sugiere prendas según estilo y resultados de compararTalla.',
  recommend: (talla, catalogo) => {
    if (!talla || !catalogo) return [];
    return catalogo.filter(p => p.talla === talla.id);
  },
  instructions: 'Conectado a Make.com para disparar recomendaciones automáticas tras medir al usuario.'
};

module.exports = recomendarPrenda;
