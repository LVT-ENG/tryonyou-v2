#!/bin/bash

# Ensure the build command executes from the project root
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="${SCRIPT_DIR}/.."

cd "$ROOT_DIR" || {
  echo "❌ Could not change to project root: $ROOT_DIR" >&2
  exit 1
}

if grep -q "\"build\"" package.json; then
  echo "🏗️  Running npm build from $ROOT_DIR"
  npm run build
else
  echo "⚠️  No build script found in package.json" >&2
  exit 1
fi
