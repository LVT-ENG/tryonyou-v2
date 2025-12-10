# Guía de despliegue

Esta guía explica cómo preparar el entorno, ejecutar las pruebas y desplegar TRYONME.

## Instalación de dependencias

```bash
npm install
pip install -r requirements.txt
```

### Configurar token de Vercel en GitHub

Para utilizar el workflow de despliegue automático, ejecuta:

```bash
scripts/configurar_vercel_token.sh
```

El script autentica con la GitHub CLI y guarda tu token en el secreto
`VERCEL_TOKEN`.

## Ejecución de pruebas

```bash
npm test
pytest -q
```

## Despliegue en Vercel

1. Instala la CLI de Vercel:
   ```bash
   npm i -g vercel
   ```
2. Lanza el despliegue:
   ```bash
   vercel --prod
   ```

## Despliegue en servidor propio

Puedes servir `index.html` con un servidor estático o ejecutar `node index.js` para una demo local.
