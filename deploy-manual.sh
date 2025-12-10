#!/bin/bash

# Fallback deployment script when automated CI deploys fail

set -e

if ! command -v vercel >/dev/null 2>&1; then
  echo "⚙️  Installing Vercel CLI..."
  npm install -g vercel >/dev/null 2>&1
fi

if [ -z "$VERCEL_TOKEN" ]; then
  echo "❌ VERCEL_TOKEN no definido" >&2
  exit 1
fi

echo "🚀 Deploy manual a Vercel..."
vercel --prod --yes --token "$VERCEL_TOKEN"

