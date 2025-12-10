# Shopify Domain Setup

This guide explains how to connect `tryonyou.app` to your Shopify store and publish the site files from this repository.

## 1. Connect the domain
1. In the Shopify admin, go to **Settings → Domains** and choose **Connect existing domain**.
2. Enter `tryonyou.app` and follow the instructions.
3. Update your DNS:
   - Create an **A record** pointing to Shopify's IP address `23.227.38.65`.
   - Add a **CNAME record** for `www` pointing to `shops.myshopify.com`.
4. Wait for Shopify to verify the domain and issue the SSL certificate, then set `tryonyou.app` as the **primary domain**.
5. Optionally check that the DNS records have propagated using a tool such as `nslookup` or `dig`.

## 2. Upload the storefront
- If using Shopify's theme system, install the Shopify CLI and run:
  ```bash
  shopify theme push
  ```
  to upload `index.html`, `style.css` and related assets.
- Alternatively, host the static files on GitHub Pages or another provider and update the DNS records accordingly.

## 3. Disable the password
Once everything is connected and you are ready for visitors, disable the storefront password in **Online Store → Preferences** so that `https://tryonyou.app` is publicly accessible.

After these steps, you should see the Try-On landing page on your custom domain. Continue configuring products, languages and responsive design as outlined in the implementation plan.

## Automating with Make
The manual steps above can be streamlined using the `domain_connect_flow.json` scenario found in the `scenarios/` folder. Import it into Make and ensure the backend endpoints `/connect_domain`, `/update_dns`, `/set_primary_domain` and `/verify_dns` are deployed. The flow will connect the domain, update DNS records, set it as primary and confirm propagation automatically.

## Command-line helper
If you prefer to trigger the same automation from your terminal, use the script
`scripts/run_domain_flow.js`. Set the required environment variables and run:

```bash
DOMAIN=myshop.com \
A_RECORD=23.227.38.65 \
CNAME_TARGET=shops.myshopify.com \
node scripts/run_domain_flow.js
```

Use `DOMAIN_API_BASE` to override the default API base URL
(`https://tryonyou.vercel.app/api`) if you deploy the endpoints elsewhere.
