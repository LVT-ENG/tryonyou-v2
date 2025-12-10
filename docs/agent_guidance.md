# TRYONYOU Deployment Agents

This file summarizes the multi-agent workflow used to deploy the TRYONYOU storefront on Shopify. Each agent corresponds to a phase in the rollout process.

## Agent 1 – Domain Connector
- Connect the domain `tryonyou.app` to Shopify.
- Update the DNS A record to `23.227.38.65` and set the CNAME for `www` to `shops.myshopify.com`.
- Enable SSL and mark the domain as primary once verified.

## Agent 2 – Web Assembler
- Upload all static site files (HTML, CSS, JS and media) using the Shopify CLI or the Wix editor.
- Integrate `video_portada.mp4` as the hero video and configure the language menu.

## Agent 3 – Avatar Simulator
- Build the initial avatar creation flow where users either provide their measurements or select a base garment.
- Render a basic avatar and suggest an outfit visually.

## Agent 4 – Shopify Loader
- Import products from `productos.csv`.
- Check that images, prices and variants are correct, then publish the products with purchase buttons.

## Agent 5 – PAU Assistant
- Display friendly motivational messages as shoppers explore products.
- Style the assistant as a small chatbot mascot.

## Agent 6 – AutoDonate Dummy
- After checkout, ask shoppers if they wish to donate a garment.
- Show a short thank-you message if they agree (no real integration required).

## Agent 7 – UX Tester
- Simulate a full customer journey, testing navigation, language switching, the cart and the avatar feature.
- Report any loading errors or blockers.

## Agent 8 – Factory Connector
- Verify print-ready files and prepare an email to the manufacturing partner requesting a production quote.

## Agent 9 – Launch Master
- Remove the storefront password, connect the domain and publish the live site.
- Confirm everything is visible and working.

---

These steps can be followed manually or adapted into scripts for automation. They complement the broader implementation plan documented in `docs/implementation_plan.md`.
