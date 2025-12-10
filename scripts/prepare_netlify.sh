#!/bin/bash
# Prepare Netlify deployment with Codex environment
# This script ensures all necessary files are in the public directory for deployment

set -e

echo "🔧 Preparando entorno Codex para Netlify..."

# Ensure public directory exists
mkdir -p public

# Copy essential HTML files from root to public if they don't exist there
echo "📋 Copiando archivos HTML esenciales..."

# Copy estructura.html if it doesn't exist in public
if [ -f "estructura.html" ] && [ ! -f "public/estructura.html" ]; then
  cp estructura.html public/
  echo "✅ estructura.html copiado a public/"
fi

# Copy meet_pau.html if it doesn't exist in public
if [ -f "meet_pau.html" ] && [ ! -f "public/meet_pau.html" ]; then
  cp meet_pau.html public/
  echo "✅ meet_pau.html copiado a public/"
fi

# Copy tryonme_landing.html if it doesn't exist in public
if [ -f "tryonme_landing.html" ] && [ ! -f "public/tryonme_landing.html" ]; then
  cp tryonme_landing.html public/
  echo "✅ tryonme_landing.html copiado a public/"
fi

# Copy textos_home.txt for estructura.html to work
if [ -f "textos_home.txt" ] && [ ! -f "public/textos_home.txt" ]; then
  cp textos_home.txt public/
  echo "✅ textos_home.txt copiado a public/"
fi

# Copy CSS if needed
if [ -f "style.css" ] && [ ! -f "public/style.css" ]; then
  cp style.css public/
  echo "✅ style.css copiado a public/"
fi

# Copy JavaScript if needed
if [ -f "script.js" ] && [ ! -f "public/script.js" ]; then
  cp script.js public/
  echo "✅ script.js copiado a public/"
fi

echo "✅ Entorno Codex preparado para Netlify"
echo "📦 Archivos listos en public/ para despliegue"
