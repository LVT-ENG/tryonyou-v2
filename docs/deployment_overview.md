# Deployment Overview

This short document summarizes the key references for deploying **TryOnMe**.
It combines the relevant instructions from the Spanish and English guides so you
can quickly locate the latest resources.

## Core Guides
- [`docs/deployment.md`](deployment.md) – English step‑by‑step setup.
- [`docs/despliegue.md`](despliegue.md) – Spanish equivalent.
- [`docs/deployment_review.md`](deployment_review.md) – Final checklist before
going live.

## Automation & Monitoring
- `scripts/auto_update.py` keeps datasets and Shopify products in sync.
 - `scripts/site_health_check.py` sends an email alert if the site becomes
   unreachable. Configure the SMTP variables and `NOTIFY_EMAIL`.
 - Import `automa_flows/site_health_email.automa.json` in the Automa
   extension if you want the health check to run automatically on a
   schedule.
 - Automa and Make flows are documented in
   [`docs/automa_flows.md`](automa_flows.md) and
   [`docs/automa_make_flow.md`](automa_make_flow.md).

## SEO Validation
Run `python scripts/seo_audit.py` to check that all HTML files contain
`title`, `description`, `viewport` and canonical tags.

## API Connectivity
The Node server relies on the `openai` package. Ensure `OPENAI_API_KEY`
is set in the environment so routes in `server.js` can access GPT-4.
You can test connectivity by running:

```bash
node scripts/openai_bedtime_story.js
```
It should print a short story without errors.

## Useful Commands
```bash
npm install --ignore-scripts
pip install -r requirements.txt
npm test && pytest -q
```

This overview should help you navigate the repository and deploy with
confidence.
