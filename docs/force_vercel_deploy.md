# Forced Deploy on Vercel

This short guide explains how to trigger a production deploy manually. Use it when automated workflows fail or a quick hotfix is required.

1. Export your Vercel token as `VERCEL_TOKEN` in the shell:
   ```bash
   export VERCEL_TOKEN=your_token
   ```
2. Run the helper script:
   ```bash
   ./deploy-auto.sh
   ```
   The script verifies the token, creates `api/upload.js` if missing and executes `vercel --prod --yes`.
3. Point the production domain to **tryonme.com** in the Vercel dashboard if not already configured.

This process forces a deployment of the current code without relying on CI pipelines.
