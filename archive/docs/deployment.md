# Deployment Guide

This guide explains how to prepare the environment, run tests and deploy TRYONME.

### Prerequisites

Ensure you have Node.js 18 or newer and Python 3.11 installed. The build
process relies on these versions to match the production environment.

## Install dependencies

```bash
npm install
pip install -r requirements.txt
```

## Running tests

```bash
npm test
pytest -q
```

## Deploy to Vercel

1. Install the Vercel CLI:
   ```bash
   npm i -g vercel
   ```
2. Build and deploy:
   ```bash
   npm run build
   vercel --prod --confirm
   ```
   Passing `--confirm` avoids interactive prompts during automated scripts.
3. The `vercel.json` file specifies the `npm run build` command and outputs the
   result in the `build` folder. It also enables `autoJobCancellation` for GitHub.

## Deploy on your own server

You can serve `index.html` with a static server or run `node index.js` for a local demo.

## Deploy to Netlify

If your Netlify site shows **"Auto publishing locked"**, deploys from GitHub will not go live automatically. You can unlock the site using the CLI:

```bash
npm install -g netlify-cli  # if you don't have it
netlify unlock --site <site-id>
```

Run `netlify sites:list` if you need to find the site ID. After unlocking, new commits will trigger deploys automatically.
