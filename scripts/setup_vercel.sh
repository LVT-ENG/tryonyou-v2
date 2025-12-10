#!/bin/bash

# Script to ensure basic project structure and configure GitHub Actions for Vercel

echo ""
echo "🧱 AgentStructureBuilder: Verificando archivos esenciales..."

# Crear index.html si no existe
if [ ! -f index.html ]; then
  echo "✅ Creando index.html"
  echo '<!DOCTYPE html><html><head><title>TryOnMe</title></head><body>Hello Vercel</body></html>' > index.html
else
  echo "✔️ index.html ya existe"
fi

# Crear README.md si no existe
if [ ! -f README.md ]; then
  echo "✅ Creando README.md"
  echo "# Proyecto TryOnMe" > README.md
else
  echo "✔️ README.md ya existe"
fi

# Crear vercel.json si no existe
if [ ! -f vercel.json ]; then
  echo "✅ Generando vercel.json"
  cat <<'EOV' > vercel.json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
EOV
else
  echo "✔️ vercel.json ya existe"
fi

# Crear .gitignore si no existe
if [ ! -f .gitignore ]; then
  echo "✅ Creando .gitignore"
  echo -e "node_modules\n.env\n.DS_Store" > .gitignore
else
  echo "✔️ .gitignore ya existe"
fi

echo ""
echo "⚙️ AgentGitHubActionsInjector: Configurando flujo de deploy..."

# Crear carpeta de workflows
echo "Configurando carpeta .github/workflows"
mkdir -p .github/workflows

# Crear flujo de GitHub Actions para deploy a Vercel
cat <<'EOW' > .github/workflows/vercel-deploy.yml
name: Prepare & Deploy to Vercel

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest

    steps:
    - name: ⬇️ Checkout del repositorio
      uses: actions/checkout@v3

    - name: 🛠 Instalar Vercel CLI
      run: npm install -g vercel

    - name: 🔍 Validar estructura básica
      run: |
        [ -f index.html ] || echo '<!DOCTYPE html><html><head><title>TryOnMe</title></head><body>Hello</body></html>' > index.html
        [ -f vercel.json ] || cat <<'EOFV' > vercel.json
{
  "version": 2,
  "builds": [{ "src": "index.html", "use": "@vercel/static" }],
  "routes": [{ "src": "/(.*)", "dest": "/index.html" }]
}
EOFV

    - name: 🚀 AgentSecureDeployer: Ejecutar despliegue Vercel
      run: |
        vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}
        vercel build --token=${{ secrets.VERCEL_TOKEN }}
        vercel deploy --prod --token=${{ secrets.VERCEL_TOKEN }}
EOW

echo ""
echo "🎯 Todos los agentes completaron su tarea. Tu repositorio está listo para hacer deploy seguro en Vercel con GitHub Actions."
