#!/bin/bash

# Script interactivo para configurar el token de Vercel en GitHub

echo "🔐 Autenticando con GitHub CLI..."

if ! command -v gh >/dev/null 2>&1; then
  echo "❌ GitHub CLI no está instalado. Visita https://cli.github.com para instalarlo."
  exit 1
fi

# Iniciar login
gh auth login || { echo "❌ Falló login GitHub"; exit 1; }

echo "🔑 Inserta tu token de Vercel (crea uno en https://vercel.com/account/tokens)"
read -s -p "👉 Token VERCEL: " TOKEN
echo ""

gh secret set VERCEL_TOKEN --body "$TOKEN" || {
  echo "❌ Error al guardar el secreto VERCEL_TOKEN"
  exit 1
}

echo "🧪 Verificando flujo de GitHub Actions..."
if gh workflow run vercel-deploy.yml; then
  echo "✅ Listo. Token añadido, autenticado y flujo disparado."
else
  echo "⚠️ Asegúrate de tener el workflow creado."
fi

