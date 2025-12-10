# Automa + Make Full Automation

This guide outlines a recommended workflow to authorize and automate the entire TRYONME platform using the Automa browser extension together with Make.

## 1. Import Provided Templates
- Automa flows are located in the `automa_flows/` folder. Import them into Automa and customize the intervals or triggers to your needs.
- Make scenarios are in `scenarios/`. Upload them to your Make account to replicate each automation.

## 2. Connect Automa with Make
1. In Automa, set up a **Webhook** action that sends data to a Make webhook URL. This allows Automa to trigger a scenario whenever a new file or event is detected (e.g. from Google Drive).
2. In Make, receive the webhook and chain modules such as Shopify, Google Sheets and Vercel. The included `make_upload_scenario.json` demonstrates how to send an HTTP request to the API endpoint `https://tryonyou.vercel.app/api/upload`.
3. Store required API tokens and Shopify credentials as Make variables or in the `.env` file referenced by the scripts.

## 3. Example Flow
```text
[Automa Drive Sync Flow] → [Make Webhook] → [Process data] → [Upload to Shopify] → [Trigger Vercel Deploy]
```
This loop keeps the storefront updated without manual steps.

## 4. Scheduling and Reliability
- Use Automa's interval trigger (e.g. every 60 seconds) for quick sync tasks.
- For heavier jobs, rely on Make's scheduler and the pro plan to remove operation limits.

## 5. Going Further
- Combine multiple Automa flows (Instagram posts, product uploads) with a central Make scenario for full orchestration.
- Optionally upgrade your Make subscription to allow parallel scenarios and more monthly operations.
- Review `docs/flujo_automatizado_semanal.md` for inspiration on daily agent tasks that can be automated through these flows.

This setup provides a self-sufficient pipeline: Automa handles local or browser-based triggers while Make executes server-side tasks and deploys the latest updates.
