# Deployment Review Checklist

This short guide summarizes key points to verify before deploying **TryOnMe**. It combines the existing documentation and highlights the most up‑to‑date components.

## 1. Landing page
- The main public entrypoint is `index.html` in the repository root. It includes SEO meta tags (`description`, `canonical`, Open Graph and Twitter cards).
- Other HTML files (e.g. `frontend/index.html`, `tryonme_landing.html`) are legacy demos kept for reference.

## 2. API server
- `tryonme_server.js` exposes routes such as `/tryonme-core` and `/autodonate/check` that rely on the OpenAI API and are used by the front-end.
- Environment variables like `OPENAI_API_KEY` and `SHOPIFY_ACCESS_TOKEN` must be defined before starting the server.

## 3. Continuous tasks
- `scripts/auto_update.py` fetches datasets and, if `ENABLE_SHOPIFY_SYNC=1`, uploads products on a schedule. Run with `--interval N` to keep it running.
- `scripts/site_health_check.py` verifies that `SITE_URL` is reachable and sends an alert email when the site is down. Configure `SMTP_*` variables and `NOTIFY_EMAIL` for notifications.  
  You can also import the optional **Automa e-mail** flow from `automa_flows/` to trigger this script periodically without manual intervention.
- Automation flows for the Automa browser extension and Make scenarios are documented in `docs/automa_flows.md` and `docs/automa_make_flow.md`.

## 4. SEO checklist
- Confirm each HTML file served publicly has `title`, `description`, `viewport`, and canonical tags.
- Check Open Graph (`og:`) and Twitter card metadata for correct image links.
- Ensure `robots` meta is set to `index, follow` on production builds.
- To verify automatically, run `python scripts/seo_audit.py` and review any warnings.

## 5. Useful commands
```bash
npm install          # install Node dependencies
pip install -r requirements.txt  # Python tools
npm run build        # create Vite production build in public/
python scripts/auto_update.py --once   # fetch dataset and optionally sync
```

This document should help consolidate the deployment information and clarify which files are essential.

