import json
import os
from pathlib import Path

import requests
from dotenv import load_dotenv

API_VERSION = "2023-07"


def load_products(file_path: Path):
    if not file_path.exists():
        raise FileNotFoundError(f"Product file not found: {file_path}")
    with file_path.open("r", encoding="utf-8") as f:
        return json.load(f)


def create_shopify_session():
    load_dotenv()
    store_domain = os.getenv("SHOPIFY_STORE_DOMAIN")
    access_token = os.getenv("SHOPIFY_ACCESS_TOKEN")
    if not store_domain or not access_token:
        raise EnvironmentError(
            "SHOPIFY_STORE_DOMAIN and SHOPIFY_ACCESS_TOKEN must be set"
        )
    base_url = f"https://{store_domain}/admin/api/{API_VERSION}"
    session = requests.Session()
    session.headers.update({"X-Shopify-Access-Token": access_token})
    return session, base_url


def create_product(session: requests.Session, base_url: str, product: dict):
    data = {
        "product": {
            "title": product.get("name", "Unnamed Product"),
            "body_html": product.get("description", ""),
            "product_type": product.get("category", ""),
        }
    }
    img = product.get("img")
    if img:
        data["product"]["images"] = [{"src": img}]

    url = f"{base_url}/products.json"
    response = session.post(url, json=data)
    if response.status_code == 201:
        print(f"Created: {product.get('name')}")
    else:
        print(
            f"Failed to create {product.get('name')}: {response.status_code} {response.text}"
        )


def main():
    import argparse

    parser = argparse.ArgumentParser(description="Sync local products to Shopify")
    parser.add_argument(
        "file",
        default=Path("products/tryon-products.json"),
        type=Path,
        nargs="?",
        help="Path to products JSON file",
    )
    args = parser.parse_args()

    try:
        products = load_products(args.file)
    except FileNotFoundError:
        fallback = Path("products/casa_pavo_real.json")
        print(f"{args.file} not found. Loading {fallback} instead.")
        products = load_products(fallback)

    session, base_url = create_shopify_session()

    for product in products:
        create_product(session, base_url, product)


if __name__ == "__main__":
    main()
