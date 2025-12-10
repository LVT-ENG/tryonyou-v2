# Deployment Guide

This guide explains how to prepare the environment, run tests and deploy TRYONME.

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
2. Deploy:
   ```bash
   vercel --prod
   ```
3. The `vercel.json` file specifies the `npm run build` command and outputs the
   result in the `dist` folder. It also enables `autoJobCancellation` for GitHub.

## Deploy on your own server

You can serve `index.html` with a static server or run `node index.js` for a local demo.

## Deploy to Netlify

If your Netlify site shows **"Auto publishing locked"**, deploys from GitHub will not go live automatically. You can unlock the site using the CLI:

```bash
npm install -g netlify-cli  # if you don't have it
netlify unlock --site <site-id>
```

Run `netlify sites:list` if you need to find the site ID. After unlocking, new commits will trigger deploys automatically.
