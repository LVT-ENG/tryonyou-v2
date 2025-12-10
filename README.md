
**TRY-ON** is a virtual fitting room powered by emotional AI. Version 2.0 is under development.

## 👤 What it does
- Generates a 3D avatar based on your body (manual or scan)
- Matches you with clothing that *feels right* (not just fits)
- Connects you to brands like LIVER 'IT and others

## 🔍 Features
- Multi-dimensional comparison: fit + emotion + aesthetics
- Open to all brands, with LIVER 'IT as premium showcase
- Data is private, ethical and encrypted

## v2.0 Modules (placeholders)
- Multilanguage site for Wix (`estructura.html`, `video_portada.mp4`, `textos_home.txt`)
- Shopify import via `productos.csv` and `precios.txt`
- Make server connection to `/upload`
- 3D avatar matching logic
- AutoDonate integration
- GPT agents: LookCurator, PMV, ContentPro, FactoryMaster
- Backup codes and credential security

> **Note**: These modules are stubs in this repository and require further implementation.

## 🚀 Demo
A working HTML/CSS demo is available in the `frontend/` folder.

## 📦 Project structure
```
TRY-ON_APP/
├── frontend/
│   ├── index.html
│   └── css/style.css
├── scripts/
│   └── tryonme_v2_stub.py
├── products/
│   ├── productos.csv
│   └── precios.txt
└── README.md
```

## 🛠️ How to run
- Open `frontend/index.html` in a browser
- Run `python3 scripts/tryonme_v2_stub.py` to parse products and upload to the server.
- Install dependencies with `pip install -r requirements.txt`

## 👀‍☠️ License
MIT License — Feel free to fork, remix, and try it on.
