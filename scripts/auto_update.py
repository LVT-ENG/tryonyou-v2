"""Schedule periodic dataset fetches and optional Shopify sync."""
from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

import requests
import schedule

ROOT = Path(__file__).resolve().parents[1]
DATASET_FILE = ROOT / "dataset.json"
SYNC_SCRIPT = ROOT / "scripts" / "sync_to_shopify.py"

FALLBACK_DATASET = {
    "posts": [
        {"id": 1, "title": "Post 1"},
        {"id": 2, "title": "Post 2"},
        {"id": 3, "title": "Post 3"},
    ]
}


def fetch_dataset() -> None:
    """Download dataset from DATASET_URL or write fallback on failure."""
    url = os.getenv(
        "DATASET_URL",
        "https://raw.githubusercontent.com/typicode/demo/master/db.json",
    )
    proxies = None
    http_proxy = os.getenv("HTTP_PROXY")
    https_proxy = os.getenv("HTTPS_PROXY")
    if http_proxy or https_proxy:
        proxies = {}
        if http_proxy:
            proxies["http"] = http_proxy
        if https_proxy:
            proxies["https"] = https_proxy

    try:
        response = requests.get(url, timeout=10, proxies=proxies)
        response.raise_for_status()
    except requests.RequestException as exc:
        try:
            DATASET_FILE.write_text(json.dumps(FALLBACK_DATASET, indent=2))
        except OSError as write_exc:
            print(f"Failed to write fallback dataset after fetch error: {exc}. Write error: {write_exc}")
        else:
            print(f"Dataset fetch failed, wrote fallback dataset: {exc}")
        return

    try:
        data = response.json()
    except json.JSONDecodeError as exc:
        try:
            DATASET_FILE.write_text(json.dumps(FALLBACK_DATASET, indent=2))
        except OSError as write_exc:
            print(f"Response was not valid JSON: {exc}; additionally, failed to write fallback dataset: {write_exc}")
        else:
            print(f"Response was not valid JSON, wrote fallback dataset: {exc}")
        return
    try:
        DATASET_FILE.write_text(json.dumps(data, indent=2))
    except OSError as exc:
        print(f"Failed to write dataset: {exc}")
    else:
        print(f"Dataset saved to {DATASET_FILE}")


def perform_update() -> None:
    """Run dataset fetch and, optionally, Shopify sync."""
    fetch_dataset()
    if os.getenv("ENABLE_SHOPIFY_SYNC") == "1":
        subprocess.run([sys.executable, str(SYNC_SCRIPT)], check=True)
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
