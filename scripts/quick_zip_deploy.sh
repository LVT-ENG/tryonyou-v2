#!/bin/bash
# Quick unzip and deploy script
# Usage: ./scripts/quick_zip_deploy.sh <zipfile>

set -euo pipefail
trap 'echo "❌ Error en la linea $LINENO" >&2; exit 1' ERR

ZIPFILE="${1:-TRYONME_DEPLOY_LIMPIO_FINAL_MAC.zip}"
FOLDER="${ZIPFILE%.zip}"

if [ ! -f "$ZIPFILE" ]; then
  echo "❌ No se encuentra $ZIPFILE en el directorio actual." >&2
  exit 1
fi

rm -rf "$FOLDER"
if ! unzip -q "$ZIPFILE" -d "$FOLDER"; then
  echo "❌ Error al descomprimir $ZIPFILE" >&2
  exit 1
fi

if [ ! -d "$FOLDER" ]; then
  echo "❌ No se creo la carpeta $FOLDER" >&2
  exit 1
fi

cd "$FOLDER"

if ! command -v vercel >/dev/null 2>&1; then
  echo "⚙️  Instalando Vercel CLI..."
  npm install -g vercel >/dev/null 2>&1
fi

if ! vercel whoami >/dev/null 2>&1; then
  echo "⚠️  Ejecuta 'vercel login' para autenticarte." >&2
  exit 1
fi

vercel --prod --confirm
