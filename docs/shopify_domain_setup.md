# Connecting tryonyou.app to Shopify

The steps below describe how to link your custom domain and publish the TRY-ON storefront.

## 1. Connect the domain
1. In the Shopify admin, open **Settings → Domains** and choose **Connect existing domain**.
2. Follow Shopify's instructions to update your DNS records:
   - Create an **A** record pointing to Shopify's IP address.
   - Create a **CNAME** record for `www` that points to Shopify's domain.
3. Wait for verification and SSL provisioning, then set `tryonyou.app` as the **primary domain**.

## 2. Upload or sync storefront files
- If you use the Shopify theme system, run `shopify theme push` (from the Shopify CLI) or upload the files through the Theme editor. Include `index.html`, CSS and other assets from this repository.
- Alternatively, you can host a static build elsewhere (e.g. GitHub Pages) and point the DNS records to that host instead of Shopify.

## 3. Disable the storefront password
Once the domain is configured and the files are uploaded, disable any storefront password in Shopify so visitors can reach the site directly.

After completing these steps, visiting [https://tryonyou.app](https://tryonyou.app) should display the TRY-ON landing page.
