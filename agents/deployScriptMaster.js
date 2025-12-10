const deployScriptMaster = {
  vercelConfig: {
    version: 2,
    builds: [
      { src: "index.js", use: "@vercel/node@5.3.6" }
    ],
    routes: [
      { src: "/(.*)", dest: "index.js" }
    ]
  },
  deployScript: `#!/bin/bash

echo "🚀 Desplegando TRYONME en Vercel..."

git init
git remote add origin https://github.com/TuUsuario/tryon-app.git
git add .
git commit -m "Deploy inicial desde DeployScriptMaster"
git branch -M main
git push -u origin main
vercel --prod`,
  instructions: `Este script configura y despliega automáticamente el proyecto TRYONME en Vercel.
✅ Reemplaza 'TuUsuario' por tu usuario de GitHub antes de ejecutar.
✅ Ejecuta con: sh deploy_tryonme.sh`
};

module.exports = deployScriptMaster;
