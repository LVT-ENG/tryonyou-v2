<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest"># TRY-ON

**TRY-ON** is a next-gen virtual fitting room powered by emotional AI and real-body avatars. It recommends clothing based on real measurements, aesthetic preferences, and personal emotional context.

## 👤 What it does
- Generates a 3D avatar based on your body (manual or scan)
- Matches you with clothing that *feels right* (not just fits)
- Connects you to brands like LIVER 'IT and others

## 🔍 Features
- Multi-dimensional comparison: fit + emotion + aesthetics
- Open to all brands, with LIVER 'IT as premium showcase
- Data is private, ethical and encrypted

## 🚀 Demo
A working HTML/CSS demo is available in the `frontend/` folder. Activate GitHub Pages to preview. The landing page now includes a video hero, a horizontal carousel of looks, a 3D avatar preview and an animated contact form to showcase the refreshed UI/UX.

## 🦚 Casa Pavo Real Collection
The project includes a sample "Casa Pavo Real" fashion line. Shirts, bags,
dresses and hats are defined in `products/casa_pavo_real.json` and loaded
automatically in the demo.

## 📦 Project structure
```
TRY-ON_APP/
├── frontend/
│   ├── index.html
│   └── css/style.css
├── backend/           # Ready for Flask or FastAPI
├── assets/            # Images and logos
├── docs/              # Technical documentation
└── README.md
```

## 🛠️ How to run
- Open `frontend/index.html` in a browser
- Customize avatar flow and clothing logic
- Expand with backend connection later
- Run `npm run build` to generate the static files in the `build/` folder. This is the same command used by Vercel during deployment.
- Ensure you have Node.js 18 or newer installed to run the build script locally and match the version used in production.
- Consulta la [guía de despliegue](docs/despliegue.md) para más detalles.
- Si usas Netlify y ves el mensaje **"Auto publishing locked"**, sigue [estas instrucciones](docs/unlock_netlify.md) para desbloquearlo.

## 🚧 Build
Run `npm run build` to generate the static `build/` directory used by Vercel. This copies the main HTML, CSS and assets so the site can be deployed anywhere.

## 🔑 Setup .env with Vercel API
Run `node scripts/generate_vercel_env.js` to create a `.env` file with your Vercel organization and project IDs. Set `VERCEL_TOKEN` beforehand so the script can query the API.

## 🚀 Codex Deployment Automation
`python scripts/codex_deploy_automation.py` generates the `.env` file and runs `make all`.
Ensure the environment variables from `.env.example` are exported before executing it. The script connects Make, Codex (GPT-4) and Vercel for a full automated deploy.

## 📤 Exporting the project
Run `./export.sh` to bundle the website and demo app into `TryonApp_export.zip`. You
can then upload the ZIP archive to Google Drive or any file-sharing service to
share the LIVE 'IT and TRY-ON demo.

## 🌐 Shopify Domain Setup
See [docs/shopify_domain_setup.md](docs/shopify_domain_setup.md) for instructions
on connecting `tryonyou.app` to Shopify and uploading the storefront files.

## 🌐 Live Endpoints
Access the project via the following subdomains:

- `https://tryonyou.app` – Wix landing page
- `https://app.tryonyou.app` – The active TryOnMe app
- `https://api.tryonyou.app` – Node.js API connected to Firebase and Shopify
- `https://gpt.tryonyou.app` – Custom AI agents

## 👁️‍🗨️ License
MIT License — Feel free to fork, remix, and try it on.
## 🧠 AI Modules
The project includes modular AI agents located in the `agents/` folder. Import them via `require('./agents')` to access:
- DeployScriptMaster: deploys to Vercel.
- TestRunnerGPT: sets up and runs tests.
- RefactorAgentJS: simplifies JavaScript functions.
- DocuGen: generates documentation snippets.
- TaskResolver: provides quick task actions.
- compararTalla: compara medidas y devuelve la talla óptima.
- recomendarPrenda: sugiere la prenda ideal.
- reaccionPau: genera reacciones de Pau.
- validarDonacion: comprueba si una prenda puede donarse.
- generarAvatar: crea un avatar 3D personalizado.

Para una introducción rápida a estos agentes consulta
[docs/agentes_basicos.md](docs/agentes_basicos.md).

## 💳 Subscription Plans
Set the `TRYON_PLAN` environment variable to control which modules are active.
Available plans are `basic`, `pro` and `ultra`. Premium scripts like `fit_ai.py`
will exit if the required module is not enabled for your plan.


## 📈 Fashion Trends Script
Run `python scripts/trending_products.py` to fetch trending searches in Google Trends for the Apparel category and generate prompt ideas.

## 📝 SEO Metadata
Run `python scripts/generate_seo_meta.py` to create `products/seo_meta.json` with titles and descriptions derived from your product list.

## 🛒 Dropshipping Report
Run `python scripts/dropshipping_scraper.py` to gather factory offers from `data/dropshipping_sites.json` into `dropshipping_report.csv`.

## 📤 Shopify Product Sync
Use `python scripts/sync_to_shopify.py` to upload products defined in `products/tryon-products.json` (or `products/casa_pavo_real.json` as a fallback) directly to your Shopify store. The script expects `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_ACCESS_TOKEN` environment variables for authentication. A Node.js variant is available via `node scripts/upload_to_shopify.js` using the same variables.

## 🔄 Continuous Update
Run `python scripts/auto_update.py --once` to fetch the demo dataset and optionally sync products. Add the `--interval N` flag to run it every `N` minutes or keep it running continuously. Set `ENABLE_SHOPIFY_SYNC=1` in the environment to push new products after each fetch.

## 📲 Push Notifications
Run `python scripts/send_push.py USER_ID "Your message"` to send a notification via OneSignal. Supply `ONESIGNAL_API_KEY` and `ONESIGNAL_APP_ID` as options or environment variables.
Automation flows for the Automa extension can be found in [docs/automa_flows.md](docs/automa_flows.md).
Scenarios for the Make platform are listed in [docs/make_scenarios.md](docs/make_scenarios.md).
For instructions on automating Vercel deploys with Make and OpenAI, see [docs/deploy_vercel_make.md](docs/deploy_vercel_make.md).

## 🔁 Flujo Automatizado Semanal
El archivo [docs/flujo_automatizado_semanal.md](docs/flujo_automatizado_semanal.md) detalla una agenda semanal de agentes para coordinar productos, pedidos y contenido.


## 📸 Instagram Story Autopost
Use `python scripts/instagram_story.py <imagen_url> <nombre> <precio> --token YOUR_TOKEN` to post product stories to your Instagram account. The token can also come from the `INSTAGRAM_ACCESS_TOKEN` environment variable. See [docs/instagram_story_autopost.md](docs/instagram_story_autopost.md) for details.

## 🤖 Concurrent Agent Bot
Run `python codex.super_executor.py` to launch a minimal bot that triggers multiple virtual agents in parallel (PMV, HR Supervisor, Tester UX Web and others). Each agent prints its progress so you can verify the coordination.

## 🧪 Full TryOnMe System Example
The folder `scripts/tryonme_full` contains a minimal implementation that combines a Node.js helper to generate TryOnMe profiles with GPT-4, a Flask API to create or search profiles and an embeddable HTML interface. Install dependencies with `npm install` and `pip install -r requirements.txt`. Launch the Flask app via `python scripts/tryonme_full/flask_app.py` and open `scripts/tryonme_full/embed.html` in a browser.

## 💳 Financial Infrastructure
Consulta [docs/financial_infrastructure.md](docs/financial_infrastructure.md) para detalles sobre la capa de pagos y recompensas basada en Revolut Ultra.


## 📦 Deployment Guide
See the [deployment guide](docs/deployment.md) for more details.

If you use Netlify and see **"Auto publishing locked"**, follow [these instructions](docs/unlock_netlify.md) to unlock it.

## 🛠️ Build
Run `npm run build` to generate the static `build/` directory used by Vercel.  
This copies the main HTML, CSS and assets so the site can be deployed anywhere.
