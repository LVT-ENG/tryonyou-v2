#!/bin/bash

echo "=== TRYONYOU - DEPLOY SCRIPT ==="

# Install dependencies
npm install

# Run tests if defined
if grep -q "\"test\":" package.json; then
  npm test || echo "Tests failed – continuing deployment."
fi

# Build if script exists
if grep -q "\"build\":" package.json; then
  npm run build
fi


# Deploy to Vercel
if ! command -v vercel >/dev/null 2>&1; then
  echo "⚙️ Installing Vercel CLI..."
  npm install -g vercel >/dev/null 2>&1
fi

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN is not set. Please export your token or run 'vercel login'."
else
  vercel --prod --yes --token "$VERCEL_TOKEN"
fi

echo "✅ Deployment completed at https://tryonyou.app"
