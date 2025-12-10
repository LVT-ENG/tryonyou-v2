# Assigning a Custom Domain on Vercel

If you deploy with `vercel deploy` and see the message:

```
No custom domains have been assigned. This will happen if there are none defined in Project Settings or the deploy was made with `vercel deploy --skip-domain`.
```

Follow these steps:

1. In the Vercel dashboard open **Settings → Domains** for your project.
2. Click **Add** and type your domain (e.g. `tryonyou.app`). Update your DNS records as instructed.
3. Alternatively, run:
   ```bash
   vercel domains add tryonyou.app
   ```
   This associates the domain with your project directly from the CLI.
4. Redeploy with `vercel --prod` or from your CI pipeline.

Once DNS propagation completes, the message will disappear and your site will load from the custom domain.
