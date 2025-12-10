const deployScriptMaster = require('./deployScriptMaster');
const testRunnerGPT = require('./testRunnerGPT');
const refactorAgentJS = require('./refactorAgentJS');
const docuGen = require('./docuGen');
const taskResolver = require('./taskResolver');
const compararTalla = require('./compararTalla');
const recomendarPrenda = require('./recomendarPrenda');
const reaccionPau = require('./reaccionPau');
const validarDonacion = require('./validarDonacion');
const generarAvatar = require('./generarAvatar');
const domFix = require('./domFix');

module.exports = {
  deployScriptMaster,
  testRunnerGPT,
  refactorAgentJS,
  docuGen,
  taskResolver,
  compararTalla,
  recomendarPrenda,
  reaccionPau,
  validarDonacion,
  generarAvatar,
  domFix
};
