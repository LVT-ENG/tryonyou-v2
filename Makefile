deploy:
	@echo "🚀 Desplegando proyecto completo..."
	npm install || { echo "❌ Error en instalación de dependencias"; exit 1; }
	npm run build || { echo "❌ Error en build del proyecto"; exit 1; }
	@if grep -q 'next export' package.json; then \
	echo "📦 Exportando proyecto..."; \
	npm run export || { echo "❌ Error en export"; exit 1; }; \
	fi
	npx vercel --prod || { echo "❌ Error al desplegar en Vercel"; exit 1; }
	@echo "✅ Proyecto desplegado correctamente."

notion:
	@echo "📝 Registrando en Notion..."
	node scripts/deploy_and_log.js || { echo "❌ Error al registrar en Notion"; exit 1; }
shopify:
	@echo "✅ Publicando producto en Shopify..."
	node shopifyUpload.js
all:
	@echo " Ejecutando todo: GitHub + Vercel + Notion + Shopify"
	make deploy
	make notion
	make shopify
