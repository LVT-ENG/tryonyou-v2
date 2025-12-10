#!/bin/bash
# Quick unzip and deploy script
# Usage: ./scripts/quick_zip_deploy.sh <zipfile>

set -e
ZIPFILE="${1:-TRYONME_DEPLOY_LIMPIO_FINAL_MAC.zip}"
FOLDER="${ZIPFILE%.zip}"

if [ ! -f "$ZIPFILE" ]; then
  echo "❌ No se encuentra $ZIPFILE en el directorio actual." >&2
  exit 1
fi

rm -rf "$FOLDER"
unzip -q "$ZIPFILE" -d "$FOLDER"

cd "$FOLDER"

if ! command -v vercel >/dev/null 2>&1; then
  echo "⚙️  Instalando Vercel CLI..."
  npm install -g vercel >/dev/null 2>&1
fi

vercel --prod --confirm

