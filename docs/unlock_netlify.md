# Unlocking Netlify Auto Publishing

If your Netlify site shows **"Auto publishing locked"**, deploys from GitHub will not go live automatically. You can unlock the site using the Netlify CLI:

```bash
npm install -g netlify-cli  # if not installed
netlify unlock --site <site-id>
```

If you do not know the site ID, run:

```bash
netlify sites:list
```

Look for the line matching your domain, e.g. `tryonme2.netlify.app`, and copy the ID from the first column. Then execute:

```bash
netlify unlock --site <site-id>
```

After unlocking, pushes to the connected GitHub repository will trigger new deploys automatically.

You can also unlock the site from the Netlify dashboard under **Deploys → Production Deploys → Unlock Auto publishing**.

## Codex Environment Configuration

For information about the Netlify Codex environment setup and build configuration, see [netlify_codex_setup.md](netlify_codex_setup.md).
