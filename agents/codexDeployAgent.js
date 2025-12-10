const { execSync } = require('child_process');

const codexDeployAgent = {
  deploy: () => {
    execSync("netlify deploy --prod --dir=tryonme-final-deploy", { stdio: "inherit" });
  },
  instructions: `Requiere tener instalado netlify-cli globalmente.\nEjecuta este agente para desplegar \u2018tryonme-final-deploy\u2019 en Netlify.`
};

module.exports = codexDeployAgent;
