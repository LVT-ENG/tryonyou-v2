import os
import sys
from typing import Optional

import requests
from dotenv import load_dotenv


load_dotenv()

SHOP_NAME = os.getenv("SHOPIFY_SHOP_NAME")
ACCESS_TOKEN = os.getenv("SHOPIFY_ACCESS_TOKEN")
API_VERSION = os.getenv("SHOPIFY_API_VERSION", "2023-10")
DOMAIN = os.getenv("APP_DOMAIN")

if not all([SHOP_NAME, ACCESS_TOKEN, DOMAIN]):
    sys.exit("Missing SHOPIFY_SHOP_NAME, SHOPIFY_ACCESS_TOKEN or APP_DOMAIN")

BASE_URL = f"https://{SHOP_NAME}.myshopify.com/admin/api/{API_VERSION}"

HEADERS = {
    "X-Shopify-Access-Token": ACCESS_TOKEN,
    "Content-Type": "application/json",
    "Accept": "application/json",
}


def _get_domains() -> list[dict]:
    resp = requests.get(f"{BASE_URL}/domains.json", headers=HEADERS)
    resp.raise_for_status()
    return resp.json().get("domains", [])


def domain_exists() -> bool:
    for d in _get_domains():
        if d.get("host") == DOMAIN or d.get("name") == DOMAIN:
            return True
    return False


def add_domain() -> dict:
    url = f"{BASE_URL}/domains.json"
    payload = {"domain": {"host": DOMAIN}}
    resp = requests.post(url, json=payload, headers=HEADERS)
    resp.raise_for_status()
    return resp.json().get("domain", {})


def get_domain_id() -> Optional[int]:
    for d in _get_domains():
        if d.get("host") == DOMAIN or d.get("name") == DOMAIN:
            return d.get("id")
    return None


def make_primary(domain_id: int) -> None:
    url = f"{BASE_URL}/domains/{domain_id}/make_primary.json"
    resp = requests.put(url, headers=HEADERS)
    resp.raise_for_status()


def main() -> None:
    if domain_exists():
        print(f"✅ Domain '{DOMAIN}' already connected")
    else:
        info = add_domain()
        print("✅ Added domain", info)

    dom_id = get_domain_id()
    if dom_id:
        make_primary(dom_id)
        print("✅ Marked domain as primary")
    else:
        print("❌ Unable to identify domain ID")


if __name__ == "__main__":
    main()
