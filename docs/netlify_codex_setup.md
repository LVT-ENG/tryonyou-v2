# Netlify Codex Environment Setup

This document explains the Netlify deployment configuration and Codex environment preparation for the TryOnMe application.

## Overview

The TryOnMe application uses Netlify for deploy previews and production deployments. The "Codex environment" refers to the complete system including:

- The main application files
- Multiple HTML pages (estructura, landing, dashboard, etc.)
- The Codex super executor (`codex.super_executor.py`)
- All AI agents in the `agents/` directory
- Static assets from the `public/` directory

## Configuration Files

### netlify.toml

The Netlify configuration file defines:

- **Build Command**: `bash scripts/prepare_codex_env.sh && npm run build`
  - First runs environment preparation checks
  - Then builds the application with Vite
- **Publish Directory**: `dist` (where Vite outputs the built files)
- **Node Version**: 18.16.0
- **Redirects**:
  - Root (`/`) redirects to `/estructura.html` (main landing page)
  - 404 fallback to `/index.html` for SPA routing

### vite.config.js

The Vite configuration includes:

- **Multiple Entry Points**: All HTML pages are explicitly included as entry points
  - index.html
  - estructura.html
  - meet_pau.html
  - ops_panel.html
  - pau_emotion.html
  - tryon_dashboard.html
  - tryonme_landing.html
  - commits.html
- **Public Directory**: Maps to `public/` for static assets
- **Output Directory**: `dist/`

### scripts/prepare_codex_env.sh

This preparation script runs before the build and:

1. Checks Node.js and npm versions
2. Verifies all required files exist:
   - package.json
   - vite.config.js
   - netlify.toml
   - index.html
   - estructura.html
3. Checks for optional Codex components:
   - codex.super_executor.py
   - agents/ directory
   - public/ directory
4. Outputs success status for logging

## Build Process

When Netlify receives a deployment trigger:

1. **Environment Preparation** (`scripts/prepare_codex_env.sh`):
   - Validates environment
   - Checks all required files
   - Confirms Codex components are present

2. **Build** (`npm run build`):
   - Vite processes all HTML entry points
   - Bundles JavaScript and CSS
   - Copies static assets from `public/`
   - Outputs everything to `dist/`

3. **Deploy**:
   - Netlify serves files from `dist/`
   - Root redirect sends users to estructura.html
   - All other pages accessible via their paths

## Key Changes Made

### Fixed Issues

1. **Removed Non-Existent Base Directory**: 
   - Old config pointed to `04_Scripts_Produccion` which was moved to `archive/`
   - Now builds from project root

2. **Updated Publish Directory**:
   - Changed from `public` to `dist`
   - Aligns with Vite's output directory

3. **Added Multi-Page Support**:
   - Updated vite.config.js to build all HTML pages
   - Ensures estructura.html and other pages are included in build

4. **Created Environment Preparation Script**:
   - Validates Codex environment before build
   - Provides clear logging for debugging
   - Checks for all required and optional components

### Build Output

The `dist/` directory contains:

- All HTML pages (8 files)
- Bundled JavaScript in `assets/`
- Bundled CSS in `assets/`
- Static files from `public/` (robots.txt, sitemap.xml, etc.)
- Favicon and images

## Testing Locally

To test the build process locally:

```bash
# Clean previous build
rm -rf dist

# Run the complete build process
bash scripts/prepare_codex_env.sh && npm run build

# Preview the built site
npm run preview
```

## Troubleshooting

### Build Fails on Netlify

1. Check the build logs for the environment preparation output
2. Verify all required files are committed to the repository
3. Ensure Node.js version is compatible (18.16.0 or newer)

### Pages Not Found After Deploy

1. Verify the page is listed in `vite.config.js` input section
2. Check that the HTML file exists in the project root
3. Confirm the build output includes the page in `dist/`

### Redirect Issues

1. Check `netlify.toml` redirects section
2. Verify the target file exists in `dist/`
3. Clear browser cache if testing locally

## Related Documentation

- [Netlify Documentation](https://docs.netlify.com/)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [Project README](../README.md)
- [AGENTS.md](../AGENTS.md) - Information about Codex agents

## Maintenance

When adding new HTML pages:

1. Create the HTML file in the project root
2. Add it to `vite.config.js` input section
3. Test the build locally
4. Commit and push to trigger Netlify deployment

When updating the Codex environment:

1. Update `scripts/prepare_codex_env.sh` if new requirements are added
2. Test the script locally
3. Update this documentation

---

*Last Updated: 2025-10-27*
*Prepared for Netlify Deploy Preview*
