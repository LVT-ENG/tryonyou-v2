# Deployment Consolidated Guide

This document summarizes the essential instructions for deploying and maintaining **TryOnMe**. It aggregates the key information scattered across `docs/` so everything is available in one place.

## Preparation
1. Install dependencies:
   ```bash
   npm install --ignore-scripts
   pip install -r requirements.txt
   ```
2. Build the front-end with Vite:
   ```bash
   npm run build
   ```
3. Configure environment variables. Copy `.env.example` to `.env` and fill in values for:
   - `OPENAI_API_KEY`
   - `SHOPIFY_STORE_DOMAIN`
   - `SHOPIFY_ACCESS_TOKEN`
   - `SMTP_*` and `NOTIFY_EMAIL` for alerts
   - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` if deploying to Vercel

## Verification
- Run all automated tests:
  ```bash
  npm test
  pytest -q
  ```
- Validate SEO metadata:
  ```bash
  python scripts/seo_audit.py public
  ```
- Check site health and email alerts:
  ```bash
  python scripts/site_health_check.py
  ```

## Continuous Operations
- `scripts/auto_update.py` keeps datasets and Shopify products synced. Use `--interval N` to run on a schedule.
- Import the flows in `automa_flows/` into the Automa browser extension to automate social posts, health checks and data syncing.
- For Make scenarios, see `docs/automa_make_flow.md` and `docs/deploy_vercel_make.md`.

## Deployment
- Deploy manually using `node deploy/deploy_netlify.js` or your preferred platform.
- The Node API lives in `server.js` and relies on the `openai` package. Ensure the `OPENAI_API_KEY` environment variable is set.
- Review the final checklist in `docs/deployment_review.md` before going live.

This consolidated guide should help you verify that SEO, API integrations and automated agents are configured correctly.
