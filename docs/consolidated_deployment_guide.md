# Consolidated Deployment Guide

This document centralizes the most important references from the multiple deployment and automation guides scattered across the repository. Use it as a quick start before launching **TryOnMe**.

## Key Steps
1. **Install dependencies**
   ```bash
   npm install
   pip install -r requirements.txt
   ```
2. **Run tests**
   ```bash
   npm test
   pytest -q
   ```
3. **Set environment variables**
   Ensure `SHOPIFY_ACCESS_TOKEN` and the other values from `.env.example` are
   exported before running any deployment script.

4. **Build and deploy**
   ```bash
   npm run build
   vercel --prod --confirm
   ```

## Automation
- Automa flows and Make scenarios are located under `automa_flows/` and `scenarios/`. Import them to synchronize data, upload to Shopify and trigger Vercel deployments automatically. See `docs/automa_make_flow.md` for a detailed example.
- Continuous update scripts live in `scripts/auto_update.py` (dataset + Shopify sync) and `scripts/site_health_check.py` (email alerts). The **Automa e-mail** flow can run these on a schedule.

## SEO Verification
Run `python scripts/seo_audit.py` to ensure each HTML file contains `title`, `meta description`, `viewport` and canonical tags. Update any file reported by the script before deploying.

## Additional References
- `docs/deployment_review.md` – Checklist of specific files and tasks.
- `docs/deployment.md` and `docs/despliegue.md` – Full English and Spanish setup instructions.

This consolidated page should help you locate the most up-to-date information quickly without searching through every folder.
