# TryOnMe Repository - Important Information Summary

## 🏗️ Project Overview
- **Name**: TRY-ON (tryon-app)
- **Version**: 1.0.0
- **Description**: Next-gen virtual fitting room powered by emotional AI and real-body avatars

## 🎯 Core Features
- Multi-dimensional comparison: fit + emotion + aesthetics
- Open to all brands, with LIVER 'IT as premium showcase
- Data is private, ethical and encrypted
- Generates 3D avatar based on body (manual or scan)
- Matches clothing that *feels right* (not just fits)
- Connects to brands like LIVER 'IT and others

## 🌐 Live Endpoints
- **Main Site**: https://tryonyou.app (Wix landing page)
- **App**: https://app.tryonyou.app (Active TryOnMe app)
- **API**: https://api.tryonyou.app (Node.js API connected to Firebase and Shopify)
- **AI Agents**: https://gpt.tryonyou.app (Custom AI agents)

## 🤖 AI Agents Status

### ✅ Implemented Agents (15 total)
Located in `/agents/` directory:
- **deployScriptMaster** - Deploys application to Vercel
- **testRunnerGPT** - Creates and runs automated tests
- **refactorAgentJS** - Refactors redundant JavaScript code
- **docuGen** - Generates basic documentation
- **taskResolver** - Resolves quick tasks from text format
- **compararTalla** - Calculates optimal size based on user measurements
- **recomendarPrenda** - Suggests ideal clothing based on occasion and style
- **reaccionPau** - Generates Pau reactions
- **validarDonacion** - Checks if clothing can be donated
- **generarAvatar** - Creates personalized 3D avatar
- **brandGuardian** - Validates content consistency with brand
- **fitAIAssistant** - Intelligent size recommendation assistant
- **lookCurator** - Aesthetic and commercial curator
- **checkoutUXMaster** - Checkout optimization

### 📝 Documented But Not Implemented (17 virtual agents)
These agents are documented in AGENTS.md but not yet implemented:
- PMV – Project Manager Virtual
- Content Pro – Web & Brand Writer  
- Ficha Técnica Master – Production & CMS
- Proveedor Tracker – Factory Control
- RRSS Automator – Smart Social Media
- Tester UX Web – Phantom User
- Factory Master – Production & Shipping
- Mockup Artist – Product Visualizer
- HR Supervisor – Agent Recommender
- Control CEO – Daily Summary
- InfraDeployer
- ContentSyncBot
- ShopifyAutoUploader
- HealthMonitor
- AI_Optimizer
- SupportAutoResponder
- BackupMaster

## 🛠️ Technical Stack

### Dependencies
- **@vercel/analytics** & **@vercel/speed-insights** - Performance monitoring
- **axios** - HTTP client
- **openai** - AI integration
- **playwright** - Browser automation
- **@notionhq/client** - Notion integration
- **csv-parser** - CSV processing
- **dotenv** - Environment configuration

### Development Tools
- **Vite** - Build tool and dev server
- **Jest** - Testing framework
- **Node.js** >=18.16.0 required

## 📦 Project Structure
```
├── agents/          # AI agent implementations
├── api/            # API endpoints
├── docs/           # Documentation (23 files)
├── products/       # Product catalogs
├── scripts/        # Automation scripts
├── automa_flows/   # 8 automation workflows
├── frontend/       # React components
├── public/         # Static assets
└── src/           # Main source code
```

## ⚙️ Configuration & Environment

### Key Environment Variables (23 total)
- **VERCEL_TOKEN** - Deployment authentication
- **OPENAI_API_KEY** - AI services
- **SHOPIFY_ACCESS_TOKEN** - E-commerce integration
- **NOTION_TOKEN** - Content management
- **MAKE_WEBHOOK_URL** - Automation workflows
- **SITE_URL** - Health monitoring
- **SMTP_*** - Email notifications

### Build & Deployment
- **Build Command**: `npm run build` (generates `dist/` folder)
- **Framework**: Vite-based with Vercel deployment
- **Output Directory**: `dist`
- **Auto-deployment**: Configured via Vercel integration

## 📱 Products & Content

### Product Catalogs
- **Casa Pavo Real Collection** - Sample fashion line (shirts, bags, dresses, hats)
- **TryOn Products** - Main product catalog
- **Shopify Integration** - CSV-based product sync

### Content Management
- **Home Texts**: "Dale Vida a Tu Estilo, Encuentra la prenda perfecta con TryOnMe"
- **Multilanguage Support** - Spanish, English, French
- **SEO Optimization** - Automated meta generation

## 🔄 Automation & Workflows

### Automa Flows (8 active)
- Site health monitoring with email alerts
- Shopify product upload automation
- Instagram content publishing
- Drive synchronization
- Sheets-triggered posting

### Scripts & Tools
- **Health Monitoring** - Automated site uptime checks
- **SEO Generation** - Meta tags and descriptions
- **Shopify Sync** - Product catalog synchronization
- **Trending Analysis** - Google Trends integration
- **Push Notifications** - OneSignal integration

## 🏥 Monitoring & Maintenance

### Health Checks
- **Site Health Check** - `site_health_check.py` runs every 5 minutes
- **Email Alerts** - SMTP-based notifications when site is down
- **Performance Monitoring** - Vercel Analytics integration

### Backup System
- **Weekly Backups** - Google Drive and Dropbox integration
- **Configuration Files** - Multiple backup configurations available
- **Recovery Procedures** - Documented recovery processes

## 🚀 Getting Started

### Local Development
1. `npm install` - Install dependencies
2. `npm run dev` - Start development server (localhost:5173)
3. `npm run build` - Build for production
4. `npm run preview` - Preview production build

### Deployment
- **Automatic**: Push to main branch triggers Vercel deployment
- **Manual**: Run `npm run build` then deploy `dist/` folder
- **Scripts**: Use `deploy-auto.sh` or `deploy-manual.sh`

---

*Last Updated*: Generated automatically by `scripts/extract_important_info.js`
*Full Details*: See `extracted_repo_info.json` for complete technical information