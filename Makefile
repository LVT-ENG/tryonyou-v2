build:
       @echo "🔧 Instalando dependencias..."
       npm install
       npm run build
       @if command -v next >/dev/null 2>&1; then \
               npx next export; \
       fi

deploy: build
       @echo "🚀 Desplegando en Vercel..."
       npx vercel --prod

notion:
       @echo "🧠 Registrando en Notion..."
       node scripts/deploy_and_log.js log "Deploy completado"

all: deploy notion
