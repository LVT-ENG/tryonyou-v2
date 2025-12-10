# Agent Discrepancy Note

AGENTS.md lists several "Agentes Virtuales" from line 20 onward:
- PMV – Project Manager Virtual
- Content Pro – Redactor Web & Marca
- Ficha Técnica Master – Producción & CMS
- Proveedor Tracker – Control de Fábricas
- RRSS Automator – Redes Sociales Inteligentes
- Tester UX Web – Usuario Fantasma
- Factory Master – Producción & Envío
- Mockup Artist – Visualizador de Producto
- Checkout UX Master – Optimización del Checkout
- Look Curator – Curador Estético + Comercial
- Fit-AI Assistant – Asistente de Tallas Inteligente
- Brand Guardian – Guardián de la Identidad
- HR Supervisor – Recomendador de Agentes
- Control CEO – Resumen Diario

These agents are not implemented in the `agents/` directory. Only the following files are exported in `agents/index.js`:
- compararTalla.js
- deployScriptMaster.js
- docuGen.js
- generarAvatar.js
- index.js
- reaccionPau.js
- recomendarPrenda.js
- refactorAgentJS.js
- taskResolver.js
- testRunnerGPT.js
- validarDonacion.js

`codex.super_executor.py` defines a few placeholder functions for some virtual agents but there is no full implementation. This indicates the documentation overstates the number of operational agents compared to the repository.
