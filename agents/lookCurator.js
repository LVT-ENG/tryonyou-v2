const lookCurator = {
  descripcion: `Ordena productos y destaca los mas atractivos`,
  curate(products) {
    return products
      .slice()
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 3);
  },
  ejemplo: `lookCurator.curate([{rating:3},{rating:5},{rating:4}]) // -> [{rating:5},{rating:4},{rating:3}]`,
};

module.exports = lookCurator;
