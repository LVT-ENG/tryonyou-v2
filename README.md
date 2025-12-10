<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest">

# TRY-ON

**TRY-ON** is a next-gen virtual fitting room powered by emotional AI and real-body avatars. It recommends clothing based on real measurements, aesthetic preferences, and personal emotional context.

## 👤 What it does
- Generates a 3D avatar based on your body (manual or scan)
- Matches you with clothing that *feels right* (not just fits)
- Connects you to brands like LIVER 'IT and others

## 🔍 Features
- Multi-dimensional comparison: fit + emotion + aesthetics
- Open to all brands, with LIVER 'IT as premium showcase
- Data is private, ethical and encrypted

## 🚀 Demo
A working HTML/CSS demo is available in the `frontend/` folder. Activate GitHub Pages to preview.

## 📦 Project structure
```
TRY-ON_APP/
├── frontend/
│   ├── index.html
│   └── css/style.css
├── backend/           # Ready for Flask or FastAPI
├── assets/            # Images and logos
├── docs/              # Technical documentation
└── README.md
```

## 🛠️ How to run
- Open `frontend/index.html` in a browser
- Customize avatar flow and clothing logic
- Expand with backend connection later

## 🛒 Selling on Shopify
1. Create a Shopify store and add your clothing products.
2. In `frontend/index.html`, replace `YOUR_SHOPIFY_DOMAIN` and
   `YOUR_STOREFRONT_ACCESS_TOKEN` in the Shopify script with your credentials.
3. Upload the contents of the `frontend/` folder as a custom theme or embed the
   buy button snippet in an existing theme.
4. Deploy the store so customers can create avatars and purchase recommended
   items directly from Shopify.

## 👁️‍🗨️ License
MIT License — Feel free to fork, remix, and try it on.
