# Guía de despliegue

Esta guía explica cómo preparar el entorno, ejecutar las pruebas y desplegar TRYONME.

## Instalación de dependencias

```bash
npm install
pip install -r requirements.txt
```

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
3. Revisa el archivo `vercel.json` generado en la raíz del proyecto. Ahí se
   define el comando de build `npm run build` y que el resultado se
   coloque en la carpeta `build`. También habilita `autoJobCancellation` para
   GitHub.

## Despliegue en servidor propio

Puedes servir `index.html` con un servidor estático o ejecutar `node index.js` para una demo local.
