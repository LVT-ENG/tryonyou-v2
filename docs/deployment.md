# Deployment Guide

This guide explains how to prepare the environment, run the tests and deploy TRYONME.

## Installing dependencies

```bash
npm install
pip install -r requirements.txt
```

## Running tests

```bash
npm test
pytest -q
```

## Deploying to Vercel

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Trigger the deployment:
   ```bash
   vercel --prod
   ```
3. Review the `vercel.json` file generated at the project root. It defines the `npm run build` command and sets the output directory to `build`. It also enables `autoJobCancellation` for GitHub.

## Deploying on your own server

You can serve `index.html` with a static server or run `node index.js` for a local demo.

## Deploying to Netlify

If your Netlify site shows **"Auto publishing locked"**, GitHub deploys will not go live automatically. You can unlock the site using the CLI:

```bash
npm install -g netlify-cli  # if not installed
netlify unlock --site <site-id>
```

If you do not remember the ID, first run `netlify sites:list` to list all your sites and copy the identifier. After running the command, new commits in GitHub will once again trigger automatic deploys.
