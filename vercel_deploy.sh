#!/bin/bash

# Script para desplegar el proyecto en Vercel

# Paso 1: crear Makefile si no existe
if [ ! -f Makefile ]; then
  cat <<'EOT' > Makefile.template
deploy:
\t@echo "🚀 Desplegando proyecto completo..."
\tnpm install || { echo "❌ Error en instalación de dependencias"; exit 1; }
\tnpm run build || { echo "❌ Error en build del proyecto"; exit 1; }
\t@if grep -q 'next export' package.json; then \\
\t\techo "📦 Exportando proyecto..."; \\
\t\tnpm run export || { echo "❌ Error en export"; exit 1; }; \\
\tfi
\tnpx vercel --prod || { echo "❌ Error al desplegar en Vercel"; exit 1; }
\t@echo "✅ Proyecto desplegado correctamente."
EOT
  printf '%b' "$(cat Makefile.template)" > Makefile
  rm Makefile.template
fi

# Paso 2: instalar dependencias si faltan
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias..."
  npm install
fi

# Paso 3: build
echo "Ejecutando build..."
npm run build || { echo "Fallo en build"; exit 1; }

# Paso 4: exportar si hay script
if grep -q 'next export' package.json; then
  echo "Exportando proyecto..."
  npm run export || { echo "Fallo en export"; exit 1; }
fi

# Paso 5: desplegar
if command -v vercel >/dev/null 2>&1; then
  echo "Desplegando en Vercel..."
  npx vercel --prod || { echo "Fallo en despliegue"; exit 1; }
else
  echo "Vercel CLI no encontrado. Instálalo con: npm i -g vercel"
  exit 1
fi

# Paso 6: confirmación
echo "✅ Despliegue completado. Revisa tu Vercel dashboard para verificar."
