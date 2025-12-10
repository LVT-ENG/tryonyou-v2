deploy:
@echo " Desplegando en Vercel..."
./deploy-auto.sh || ./deploy-manual.sh

notion:
	@echo " Registrando en Notion..."
	node index.js log

shopify:
	@echo "️ Publicando producto en Shopify..."
	node shopifyUpload.js

all:
	@echo " Ejecutando todo: GitHub + Vercel + Notion + Shopify"
	make deploy
	make notion
	make shopify
