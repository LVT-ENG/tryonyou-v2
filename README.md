# TRY-ON

**TRY-ON** is a next-gen virtual fitting room powered by emotional AI and real-body avatars. It recommends clothing based on real measurements, aesthetic preferences, and personal emotional context.

## 👤 What it does

- Generates a 3D avatar based on your body (manual or scan)
- Matches you with clothing that _feels right_ (not just fits)
- Connects you to brands like LIVER 'IT and others

## 🔍 Features

- Multi-dimensional comparison: fit + emotion + aesthetics
- Open to all brands, with LIVER 'IT as premium showcase
- Data is private, ethical and encrypted

## 🚀 Demo

A working HTML/CSS demo is available in the `public/` folder. Activate GitHub Pages to preview. The landing page now includes a video hero, a horizontal carousel of looks, a 3D avatar preview and an animated contact form to showcase the refreshed UI/UX.

A React version called `HeroVideo` lives in `components/` if you prefer JSX.

## 🦚 Casa Pavo Real Collection

The project includes a sample "Casa Pavo Real" fashion line. Shirts, bags,
dresses and hats are defined in `products/casa_pavo_real.json` and loaded
automatically in the demo.

## 📦 Project structure

```
TRY-ON_APP/
├── public/
│   └── index.html
├── frontend/
│   └── css/style.css
├── backend/           # Ready for Flask or FastAPI
├── assets/            # Images and logos
├── docs/              # Technical documentation
└── README.md
```

See [docs/live_it_codex.md](docs/live_it_codex.md) for the full LIVE IT launch codex in Spanish.

The best reference for deployment is **[docs/deployment_overview.md](docs/deployment_overview.md)**. For an overview of every folder, start with **[docs/repository_structure.md](docs/repository_structure.md)**. Legacy folders `03_Agentes_Inteligentes` and `04_Scripts_Produccion` are preserved under `archive/` for reference only.

## 🛠️ How to run

- Run `npm run dev` and open <http://localhost:5173> to preview the app.
- Run `node server.js` to start the unified API server on port 4000. The server handles AI features (avatar generation, recommendations, emotional companion) and serves static files from `public/`.
- `index.html` at the project root loads `src/main.js` and demonstrates the `/api/fetch-data` endpoint.
- `public/index.html` contains the full TryOnMe experience with Pau le Paon integration and is served by the API server.
- Run `npm run build` to generate the static files in the `dist/` folder. This is the same command used by Vercel during deployment.
- Ensure you have Node.js 18 or newer installed to run the build script locally and match the version used in production.
- Consulta la [guía de despliegue](docs/despliegue.md) para más detalles.
- Si usas Netlify y ves el mensaje **"Auto publishing locked"**, sigue [estas instrucciones](docs/unlock_netlify.md) para desbloquearlo.
- Para una explicación rápida en español sobre cómo compilar y ejecutar la demo local, revisa [docs/demo_local.md](docs/demo_local.md).

## 🚧 Build

Run `npm run build` to generate the static `dist/` directory used by Vercel. This copies the main HTML, CSS and assets so the site can be deployed anywhere.

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
To remove the storefront password automatically, follow
[docs/unlock_shopify_password.md](docs/unlock_shopify_password.md).

## 🌐 Live Endpoints

Access the project via the following subdomains:

- `https://tryonyou.app` – Wix landing page
- `https://app.tryonyou.app` – The active TryOnMe app
- `https://api.tryonyou.app` – Node.js API connected to Firebase and Shopify
- `https://gpt.tryonyou.app` – Custom AI agents

## 👁️‍🗨️ License

MIT License — Feel free to fork, remix, and try it on.

## 📊 Motor TryOnMe (Google Sheets Prototype)

A functional prototype recommendation engine built with Google Apps Script. Create a complete user management, measurements, trends, and recommendations system in Google Sheets.

**Quick Start:**
1. Open [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Go to **Extensions** > **Apps Script**
3. Copy the code from [`google-apps-script/motor.gs`](google-apps-script/motor.gs)
4. Run `initTryOnMe()` to initialize the system

**Documentation:**
- [Quick Start Guide](google-apps-script/QUICKSTART.md) - Fast setup and usage
- [Complete Documentation](google-apps-script/README.md) - Full feature reference
- [Deployment Guide](google-apps-script/DEPLOYMENT.md) - Multiple deployment methods

The Motor creates 7 sheets: README, Lists, Usuarios, Medidas, Tendencias, Reglas, and Recomendaciones, with automatic data validation and a custom menu for easy access.

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
- brandGuardian: asegura la coherencia de la marca.

Para una introducción rápida a estos agentes consulta
[docs/agentes_basicos.md](docs/agentes_basicos.md).

## 💳 Subscription Plans

Set the `TRYON_PLAN` environment variable to control which modules are active.
Available plans are `basic`, `pro` and `ultra`. Premium scripts like `fit_ai.py`
will exit if the required module is not enabled for your plan.

## 📈 Fashion Trends Script

Run `python scripts/trending_products.py` to fetch trending searches in Google Trends for the Apparel category and generate prompt ideas.

## 📝 SEO Metadata

Run `python scripts/generate_seo_meta.py` to create `products/seo_meta.json` with titles and descriptions derived from your product list. The script now reads from `products/tryon-products.json` by default.
Run `python scripts/generate_image_meta.py` to create `products/image_meta.json` with alt text and social image tags for each product. It also defaults to `products/tryon-products.json`.

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
For a combined workflow using both tools, check [docs/automa_make_flow.md](docs/automa_make_flow.md).

## 🔍 Site Health Check

Run `python scripts/site_health_check.py` to verify that the main site is reachable.
If the check fails and email credentials are configured via `SMTP_HOST`,
`SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `NOTIFY_EMAIL`, an alert will be sent automatically.

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

See the [deployment overview](docs/deployment_overview.md) for detailed steps. A Spanish version is available in [docs/despliegue.md](docs/despliegue.md). To validate SEO tags across all pages, run `python scripts/seo_audit.py`.

If you use Netlify and see **"Auto publishing locked"**, follow [these instructions](docs/unlock_netlify.md) to unlock it.

## 🛠️ Build

Run `npm run build` to generate the static `dist/` directory used by Vercel.  
This copies the main HTML, CSS and assets so the site can be deployed anywhere.
Deployment scripts are consolidated in the `prod/` directory with date-prefixed names for easier version tracking.
