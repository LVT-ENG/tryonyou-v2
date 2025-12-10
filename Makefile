# === TRYONYOU MASTER MAKEFILE ===

start:
	@echo "🚀 Iniciando sistema completo TRYONYOU..."
	npm run dev

deploy:
	@echo "🚀 Preparando despliegue de producción..."
	npm install
	npm run build
	@# Export estático opcional para entornos Next.js
	npx next export || true
	@[ -d out ] && echo "✔️ export encontrado" || echo "⚠️ sin export"
	@echo "🚀 Desplegando en Vercel..."
	npx vercel --prod
	@echo "📝 Sincronizando con Notion..."
	node scripts/notion_sync.js || true

commit:
	@echo "📤 Haciendo commit y push..."
	git add .
	git commit -m "auto: update" && git push || true
