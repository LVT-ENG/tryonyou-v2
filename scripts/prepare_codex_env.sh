#!/bin/bash
# Codex Environment Preparation Script
# This script prepares the TryOnMe Codex environment for Netlify deployment

set -e

echo "🟡 Preparing Codex environment for Netlify deployment..."

# Check Node.js version
echo "📦 Checking Node.js version..."
node --version
npm --version

# Verify required files exist
echo "📋 Verifying required files..."
required_files=(
  "package.json"
  "vite.config.js"
  "netlify.toml"
  "index.html"
  "estructura.html"
)

for file in "${required_files[@]}"; do
  if [ ! -f "$file" ]; then
    echo "❌ Missing required file: $file"
    exit 1
  fi
  echo "✅ Found: $file"
done

# Check if Codex executor exists
if [ -f "codex.super_executor.py" ]; then
  echo "✅ Codex super executor found"
else
  echo "⚠️  Codex super executor not found (optional)"
fi

# Verify agents directory
if [ -d "agents" ]; then
  agent_count=$(find agents -type f -name "*.js" | wc -l)
  echo "✅ Found agents directory with $agent_count agent(s)"
else
  echo "⚠️  Agents directory not found (optional)"
fi

# Check if public directory exists for static assets
if [ -d "public" ]; then
  echo "✅ Public directory found"
else
  echo "⚠️  Public directory not found"
fi

echo ""
echo "✅ Codex environment preparation complete!"
echo "🚀 Ready for Netlify build process"
echo ""
