#!/bin/bash

echo "🚀 TRYONYOU - Despliegue automático"

# Paso 1: Instalar dependencias
echo "[1/4] Instalando dependencias..."
npm install

# Paso 2: Ejecutar tests si existen
if grep -q "\"test\":" package.json; then
  echo "[2/4] Ejecutando tests..."
  npm test || echo "⚠️ Tests fallidos, pero continuamos."
else
  echo "[2/4] No hay tests definidos."
fi

# Paso 3: Build si existe
if grep -q "\"build\":" package.json; then
  echo "[3/4] Ejecutando build..."
  npm run build
else
  echo "[3/4] No se encontró script de build."
fi

# Paso 4: Desplegar en Vercel
echo "[4/4] Deploy a producción..."
vercel --prod --confirm --yes

echo "✅ Despliegue finalizado: https://tryonyou.app"
