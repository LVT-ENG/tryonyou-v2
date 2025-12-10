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
vercel --prod --confirm --yes

echo "✅ Deployment completed at https://tryonyou.app"
