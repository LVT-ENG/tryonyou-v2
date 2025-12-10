deploy:
       @echo "🚀 Desplegando en Vercel..."
       node scripts/deploy_and_log.js deploy

notion:
       @echo "🧠 Registrando en Notion..."
       node scripts/deploy_and_log.js log "Registro manual"

shopify:
       @echo "🛍️ Publicando producto en Shopify..."
       node scripts/upload_to_shopify.js

all:
       @echo "🔥 Ejecutando todo: GitHub + Vercel + Notion + Shopify"
       node scripts/deploy_and_log.js
       node scripts/upload_to_shopify.js
