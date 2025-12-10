# Guía de Despliegue

Estas son las instrucciones básicas para instalar dependencias, ejecutar tests y desplegar el proyecto TRYONME.

## Instalación

```bash
pip install -r requirements.txt
npm install
```

## Pruebas

Ejecuta los tests de Python y JavaScript:

```bash
pytest -q
npm test
```

## Despliegue

Para desplegar en Vercel ejecuta el agente `DeployScriptMaster` o usa tu propio flujo con:

```bash
vercel --prod
```

También puedes orquestar las tareas desde Make.com (Automa) conectando los agentes de `agents/`.
