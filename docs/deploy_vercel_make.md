# Deploying Kodex to Vercel with OpenAI and Make

This guide explains how to automate Kodex deployments to Vercel using Make and OpenAI.

## Prerequisites
- A repository with your Kodex code on GitHub.
- A [Vercel](https://vercel.com) account with a project linked to the repo.
- A [Make](https://www.make.com/) account.
- An OpenAI API key if your build steps rely on OpenAI services.

## Steps
1. **Create a Deploy Hook in Vercel**
   - In your Vercel project settings, go to **Git** > **Deploy Hooks** and generate a new hook URL (e.g. `https://api.vercel.com/v1/integrations/deploy/prj_...`).
   - Copy this URL for use in Make.
2. **Set environment variables**
   - In Vercel, add your `OPENAI_API_KEY` and any other secrets needed by your app.
3. **Configure a Make scenario**
   - Import the example scenario from `scenarios/make_upload_scenario.json` or create one from scratch.
   - Add an HTTP module that sends a `POST` request to the deploy hook URL created in step 1.
   - Optionally include modules that call the OpenAI API before triggering the deploy (for code generation or processing tasks).
4. **Trigger deployments automatically**
   - Whenever your scenario runs, Make will call the deploy hook, causing Vercel to build and deploy the latest commit from your repository.
   - You can schedule the scenario or connect it to other services (Google Sheets, Shopify, etc.).

## Example Make flow
```
[Trigger] → [Process with OpenAI] → [HTTP request to Vercel deploy hook]
```
This approach keeps your deployment pipeline code-free and fully automated.

## Next steps
- Review the existing GitHub Actions workflow `.github/workflows/vercel-deploy.yml` for an alternative CI-based deployment.
- See `docs/make_scenarios.md` for more details on editing and importing Make scenarios.
