#!/bin/bash
# Simple manual deployment script in case CI network restrictions apply
set -e

if [ -z "$VERCEL_TOKEN" ]; then
  echo "VERCEL_TOKEN is not set" >&2
  exit 1
fi

node scripts/deploy_and_log.js deploy "$@"
