# Auto Update Script

`scripts/auto_update.py` regularly fetches the demo dataset and can automatically sync products to Shopify. Use this to keep the content fresh without manual work.

## Usage
```bash
python scripts/auto_update.py --interval 60
```

Set `ENABLE_SHOPIFY_SYNC=1` in the environment if you want to upload products after each dataset refresh. Add `--once` to run a single update and exit.
