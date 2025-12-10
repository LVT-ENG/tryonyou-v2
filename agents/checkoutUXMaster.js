const checkoutUXMaster = {
  descripcion: `Verifica que el carrito este listo para un checkout fluido`,
  check(cart) {
    return Array.isArray(cart.items) && cart.items.length > 0 && cart.total > 0;
  },
  ejemplo: `checkoutUXMaster.check({items:[{id:1}], total:100}) // -> true`,
};

module.exports = checkoutUXMaster;
