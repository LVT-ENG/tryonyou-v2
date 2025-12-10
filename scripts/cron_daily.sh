#!/bin/bash
# Daily cleanup and sync
cd "$(dirname "$0")"/..
python scripts/auto_update.py
node scripts/sync_to_shopify.py
