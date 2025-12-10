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
   coloque en la carpeta `dist`. También habilita `autoJobCancellation` para
   GitHub.

## Despliegue en servidor propio

Puedes servir `index.html` con un servidor estático o ejecutar `node index.js` para una demo local.

## Despliegue en Netlify

Si tienes el mensaje **"Auto publishing locked"** en tu sitio de Netlify, los despliegues desde GitHub no se publicarán de forma automática. Puedes desbloquearlo con la CLI:

```bash
npm install -g netlify-cli  # si no la tienes
netlify unlock --site <id-del-sitio>
```

Si no recuerdas el ID, ejecuta primero `netlify sites:list` para ver todos tus sitios y copia el identificador del que quieras desbloquear. Tras ejecutar el comando, los nuevos commits en GitHub volverán a activar los deploys automáticamente.
