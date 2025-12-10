#!/bin/bash

# === TRYONYOU - DEPLOY SCRIPT ===
set -e

echo "➡️ Installing Node.js dependencies..."
npm ci --ignore-scripts

echo "➡️ Installing Python dependencies..."
pip install -r requirements.txt > /dev/null

echo "➡️ Running JavaScript tests..."
if grep -q "\"test\":" package.json; then
  npm test
fi

echo "➡️ Running Python tests..."
if ls tests/*.py >/dev/null 2>&1; then
  pytest -q
fi

echo "➡️ Building project..."
if grep -q "\"build\":" package.json; then
  npm run build
fi

echo "➡️ Deploying to Vercel..."
if ! command -v vercel >/dev/null 2>&1; then
  echo "⚙️ Installing Vercel CLI..."
  npm install -g vercel >/dev/null 2>&1
fi

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN is not set. Skipping deploy."
else
  if [ -n "$VERCEL_DOMAIN" ]; then
    vercel domains add "$VERCEL_DOMAIN" --token "$VERCEL_TOKEN" >/dev/null 2>&1 || true
  fi
  vercel --prod --yes --token "$VERCEL_TOKEN"
  echo "✅ Deployment completed at https://$VERCEL_DOMAIN"
fi
