# Makefile – ROOT LEVEL (para ejecución por Codex, Vercel y agentes)

# Despliegue completo con control de errores
deploy:
	@echo "🚀 Desplegando proyecto completo..."
	npm install || { echo "❌ Error en instalación de dependencias"; exit 1; }
	npm run build || { echo "❌ Error en build del proyecto"; exit 1; }
	@if grep -q 'next export' package.json; then echo "📦 Exportando proyecto..."; npm run export || { echo "❌ Error en export"; exit 1; }; fi
	npx vercel --prod || { echo "❌ Error al desplegar en Vercel"; exit 1; }
	@echo "✅ Proyecto desplegado correctamente."

# Registro en Notion (requiere script y variables definidas)
notion:
	@echo "📝 Registrando en Notion..."
	node scripts/deploy_and_log.js || { echo "❌ Error al registrar en Notion"; exit 1; }

# Publicar en Shopify y activar trigger externo
shopify:
	@echo "️ Publicando producto en Shopify..."
	node scripts/upload_to_shopify.js || { echo "❌ Error al subir a Shopify"; exit 1; }
	curl -X POST -H 'Content-Type: application/json' -d '{}' https://tu-servidor.onrender.com/upload || { echo "❌ Error al activar trigger"; exit 1; }

# Ejecutar todo de forma secuencial
all: deploy notion shopify

.PHONY: deploy notion shopify all
