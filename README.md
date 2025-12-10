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
A working HTML/CSS demo is available in the `frontend/` folder. Activate GitHub Pages to preview.

## 📦 Project structure
```
TRY-ON_APP/
├── frontend/
│   ├── index.html
│   └── css/style.css
├── backend/
│   └── app.py
├── tests/
│   └── test_upload.py
├── assets/            # Images and logos
├── docs/              # Technical documentation
└── README.md
```

## 🛠️ How to run
1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
2. Start the backend server:
   ```bash
   python backend/app.py
   ```
3. Open `frontend/index.html` in a browser.

## 🧪 Running tests
Execute the following command to run the test suite:
```bash
pytest
```

## 📤 Exporting the project
Run `./export.sh` to bundle the website and demo app into `TryonApp_export.zip`. You can then upload the ZIP archive to Google Drive or any file-sharing service to share the LIVE 'IT and TRY-ON demo.

## 👁️‍🗨️ License
MIT License — Feel free to fork, remix, and try it on.
