#!/bin/bash

# === DEPLOY-AUTO.SH - Crea upload.js si no existe y despliega ===
# Rubén Espinar – Proyecto TRYONYOU

set -e

# VERCEL_TOKEN se debe definir como variable de entorno
TOKEN="${VERCEL_TOKEN:-}"

# Comprobación básica del token
if [ -z "$TOKEN" ]; then
  echo "❌ VERCEL_TOKEN no está definido. Abortando despliegue." >&2
  exit 1
fi

# Asegurar que la CLI de Vercel está instalada
if ! command -v vercel >/dev/null 2>&1; then
  echo "⚙️  Instalando Vercel CLI..."
  npm install -g vercel >/dev/null 2>&1
fi

# Crear api/upload.js si no existe
if [ ! -f "api/upload.js" ]; then
  echo "📄 Generando archivo api/upload.js..."
  cat <<'EOV' > api/upload.js
export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Aquí puedes insertar lógica para procesar productos u otra info
  res.status(200).json({ message: 'Upload recibido correctamente.' });
}
EOV
  echo "✅ upload.js creado."
else
  echo "✔️ upload.js ya existe."
fi

# Despliegue automático
echo "🌐 Iniciando despliegue con Vercel..."
if vercel --token="$TOKEN" --prod --yes --confirm; then
  echo "🎉 Despliegue exitoso. Proyecto TRYONYOU online."
else
  echo "❌ Error en el despliegue." >&2
  exit 1
fi
