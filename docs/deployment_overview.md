# Deployment Overview

This short document summarizes the key references for deploying **TryOnMe**.
It combines the relevant instructions from the Spanish and English guides so you
can quickly locate the latest resources.

## Core Guides
- [`docs/despliegue.md`](despliegue.md) – Spanish deployment guide.

## Automation & Monitoring
- Use the GitHub Actions workflow in `.github/workflows/health-check.yml` or a comparable scheduler to run `scripts/site_health_check.py` and your test suite regularly.
- `scripts/auto_update.py` keeps datasets and Shopify products in sync.
- `scripts/site_health_check.py` emails an alert if the site becomes unreachable. Configure the SMTP variables and `NOTIFY_EMAIL`.
- Automa flows are documented in [`docs/automa_flows.md`](automa_flows.md) and [`docs/automa_make_flow.md`](automa_make_flow.md) if you prefer browser or Make‑based automation.

## SEO Validation
Run `python scripts/seo_audit.py` to check that all HTML files contain
`title`, `description`, `viewport` and canonical tags.

## API & Environment Variables
Set `OPENAI_API_KEY`, `SMTP_HOST`, `SMTP_USER`, `SMTP_PASS` and `NOTIFY_EMAIL` in the environment before deploying. The server and health‑check script handle missing values gracefully, but some features will be disabled without them.
You can test OpenAI connectivity by running:

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

## Future Integrations
When new OpenAI models or IP services become available, update `server.js` and dependencies, then rerun `npm test` and `pytest` before redeploying.

This overview should help you navigate the repository and deploy with
confidence.
