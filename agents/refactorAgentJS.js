const refactorAgentJS = {
  beforeRefactor: `function calculateTotal(a, b) {
  let result = a + b;
  return result;
}

function sumValues(x, y) {
  return x + y;
}`,
  afterRefactor: `function sum(a, b) {
  return a + b;
}`,
  instructions: `Este agente identifica funciones redundantes y las simplifica.
En este ejemplo, unifica 'calculateTotal' y 'sumValues' en una sola función 'sum'.
✅ Compatible con refactor automático de agents.js`
};

module.exports = refactorAgentJS;
