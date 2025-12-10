"""Schedule periodic dataset fetches and optional Shopify sync."""
from __future__ import annotations

import argparse
import os
import subprocess
import time
from datetime import datetime
from pathlib import Path

import schedule

ROOT = Path(__file__).resolve().parents[1]
FETCH_SCRIPT = ROOT / "scripts" / "fetch_dataset.js"
SYNC_SCRIPT = ROOT / "scripts" / "sync_to_shopify.py"


def perform_update() -> None:
    """Run dataset fetch and, optionally, Shopify sync."""
    subprocess.run(["node", str(FETCH_SCRIPT)], check=True)
    if os.getenv("ENABLE_SHOPIFY_SYNC") == "1":
        subprocess.run(["python", str(SYNC_SCRIPT)], check=True)
    stamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    print(f"[{stamp}] Update complete")


def run_scheduler(interval: int) -> None:
    schedule.every(interval).minutes.do(perform_update)
    perform_update()
    while True:
        schedule.run_pending()
        time.sleep(1)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Continuously fetch dataset and sync products"
    )
    parser.add_argument(
        "--interval", type=int, default=60, help="Update interval in minutes"
    )
    parser.add_argument(
        "--once", action="store_true", help="Run a single update and exit"
    )
    args = parser.parse_args()

    if args.once:
        perform_update()
    else:
        run_scheduler(args.interval)
