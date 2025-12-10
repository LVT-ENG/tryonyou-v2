#!/bin/bash

# === FINALIZE_AND_DEPLOY.SH ===
# Deploy script for TRYONYOU production with presentation mode
# Rubén Espinar – Proyecto TRYONYOU

set -euo pipefail

# Repository SSH URL for cloning
export REPO_SSH="git@github.com:LVT-ENG/TRYONME-TRYONYOU-ABVETOS--INTELLIGENCE--SYSTEM.git"

# Check if VERCEL_TOKEN is set
if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "❌ VERCEL_TOKEN no está definido. Abortando despliegue." >&2
  exit 1
fi

# Create temporary working directory
workdir="$(mktemp -d)"
echo "📁 Directorio temporal creado: $workdir"

# Clone the repository
echo "📥 Clonando repositorio..."
git clone -b main --depth=1 "$REPO_SSH" "$workdir"

# Change to working directory
cd "$workdir"

# Create production environment file with presentation mode
echo "⚙️  Configurando PRESENTATION_MODE=1..."
echo "PRESENTATION_MODE=1" > .env.production

# Install dependencies
echo "📦 Instalando dependencias..."
npm install

# Build the project
echo "🔨 Construyendo el proyecto..."
npm run build

# Deploy to Vercel
echo "🚀 Desplegando a Vercel..."
deployment_url=$(vercel deploy --prod --token "$VERCEL_TOKEN" --yes 2>&1 | grep -oE 'https://[^ ]+\.vercel\.app' | tail -1)

# Set up domain alias
if [ -n "$deployment_url" ]; then
  echo "🌐 Configurando alias de dominio..."
  vercel alias set "$deployment_url" tryonyou.app --token "$VERCEL_TOKEN"
else
  echo "⚠️  No se pudo obtener la URL de despliegue para configurar el alias."
fi

# Success message
echo "✅ Deploy completado → https://www.tryonyou.app"

# Clean up (optional, as temp dir will be removed on reboot)
if [ -n "$workdir" ] && [ -d "$workdir" ]; then
  echo "🧹 Limpiando directorio temporal..."
  rm -rf "$workdir"
fi
