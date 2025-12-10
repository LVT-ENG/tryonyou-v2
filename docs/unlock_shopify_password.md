# Disable Shopify Storefront Password

This script logs into the Shopify admin and disables the storefront password so visitors can access the store directly.

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the following environment variables in a `.env` file or your shell:
   - `SHOPIFY_ADMIN_EMAIL` – your Shopify admin login email
   - `SHOPIFY_ADMIN_PASSWORD` – the corresponding password
   - `SHOPIFY_STORE_DOMAIN` – your `.myshopify.com` domain (e.g. `tryonyou.myshopify.com`)
   - `SHOPIFY_PUBLIC_URL` – public storefront URL, default `https://tryonyou.app`
3. Run the script:
   ```bash
   node scripts/disable_shopify_password.js
   ```
   It will log in with Playwright, disable the password if enabled and verify the site is publicly accessible.

The script uses Playwright in headless mode, so no browser window opens.
