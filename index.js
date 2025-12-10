import { exec } from "child_process";

const agents = [
  "03_Agentes_Inteligentes/token_loader.js",
  "03_Agentes_Inteligentes/deploy_agent.js",
  "03_Agentes_Inteligentes/shopify_agent.js"
];

agents.forEach(agent => {
  exec(`node ${agent}`, (err, stdout, stderr) => {
    if (err) return console.error(`[ERROR] ${agent}:\n${stderr}`);
    console.log(`[OK] ${agent}:\n${stdout}`);
  });
});
