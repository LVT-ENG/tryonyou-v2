<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="manifest" href="/site.webmanifest"># TRY-ON

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

## 🦚 Casa Pavo Real Collection
The project includes a sample "Casa Pavo Real" fashion line. Shirts, bags,
dresses and hats are defined in `products/casa_pavo_real.json` and loaded
automatically in the demo.

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
- Consulta la [guía de despliegue](docs/despliegue.md) para más detalles

## 📤 Exporting the project
Run `./export.sh` to bundle the website and demo app into `TryonApp_export.zip`. You
can then upload the ZIP archive to Google Drive or any file-sharing service to
share the LIVE 'IT and TRY-ON demo.

## 👁️‍🗨️ License
MIT License — Feel free to fork, remix, and try it on.
## 🧠 AI Modules
The project includes modular AI agents located in the `agents/` folder. Import them via `require('./agents')` to access:
- DeployScriptMaster: deploys to Vercel.
- TestRunnerGPT: sets up and runs tests.
- RefactorAgentJS: simplifies JavaScript functions.
- DocuGen: generates documentation snippets.
- TaskResolver: provides quick task actions.
- compararTalla: compara medidas y devuelve la talla óptima.
- recomendarPrenda: sugiere la prenda ideal.
- reaccionPau: genera reacciones de Pau.
- validarDonacion: comprueba si una prenda puede donarse.
- generarAvatar: crea un avatar 3D personalizado.

Para ver la lista completa de agentes GPT consulta el [Panel de Control de Agentes](docs/panel_control_agentes.md).

