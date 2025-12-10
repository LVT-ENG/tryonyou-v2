# TRY-ON

**TRY-ON** is a next-gen virtual fitting room powered by emotional AI and real-body avatars. It recommends clothing based on real measurements, aesthetic preferences and personal emotional context.

## 👤 What it does
- Generates a 3D avatar based on your body (manual or scan)
- Matches you with clothing that *feels right* (not just fits)
- Connects you to brands like LIVER 'IT and others

## 🔍 Features
- Multi-dimensional comparison: fit + emotion + aesthetics
- Open to all brands, with LIVER 'IT as premium showcase
- Data is private, ethical and encrypted

## 🚀 Demo
A working HTML/CSS demo is available in the `frontend/` folder. Activate GitHub Pages or Firebase Hosting to preview.

## 📦 Project structure
```
tryon-app/
├── frontend/
│   ├── index.html
│   ├── css/style.css
│   └── js/firebase-init.js
├── scripts/
│   ├── upload_to_shopify.py
│   └── wix_webhook.py
├── firebase.json
└── README.md
```

## 🛠️ How to run
1. Open `frontend/index.html` in a browser.
2. Customize avatar flow and clothing logic.
3. Use the Shopify script to upload products when ready.

## Firebase Hosting
1. Install the Firebase CLI: `npm install -g firebase-tools`.
2. Run `firebase login` and then `firebase init` to set up the project.
3. Deploy with `firebase deploy`. The `frontend/` folder is configured as the public site.

## Automation with Automa
[Automa](https://automa.site/) can automate repetitive tasks, such as refreshing product data or triggering the Shopify upload script. Create a workflow in Automa that runs `scripts/upload_to_shopify.py` whenever your product source files change.

## Shopify Integration
`scripts/upload_to_shopify.py` reads product data from `products.json` or `products.csv` and uploads each item to your Shopify store. Provide credentials via environment variables:
- `SHOPIFY_API_KEY`
- `SHOPIFY_API_PASSWORD`
- `SHOPIFY_STORE`

Run the script with `python scripts/upload_to_shopify.py`.

## Wix Publish Webhook
`scripts/wix_webhook.py` listens for POST requests from Wix when your site is
published. It uses Twilio to send a WhatsApp notification. Configure these
environment variables:

- `TWILIO_ACCOUNT_SID`
- `TWILIO_AUTH_TOKEN`
- `WHATSAPP_FROM` (your Twilio number, e.g. `whatsapp:+14155238886`)
- `TARGET_WHATSAPP` (destination, default `whatsapp:+33699469479`)

Start the service with:

```bash
python scripts/wix_webhook.py
```

## 👁️‍🗨️ License
MIT License — Feel free to fork, remix, and try it on.
