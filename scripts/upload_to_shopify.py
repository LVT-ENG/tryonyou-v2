import os
import json
import csv
import requests

API_KEY = os.getenv("SHOPIFY_API_KEY")
PASSWORD = os.getenv("SHOPIFY_API_PASSWORD")
SHOP_NAME = os.getenv("SHOPIFY_STORE")
API_VERSION = os.getenv("SHOPIFY_API_VERSION", "2023-04")

if not (API_KEY and PASSWORD and SHOP_NAME):
    raise SystemExit("Missing Shopify credentials")

BASE_URL = f"https://{API_KEY}:{PASSWORD}@{SHOP_NAME}.myshopify.com/admin/api/{API_VERSION}"


def upload_product(product):
    url = f"{BASE_URL}/products.json"
    response = requests.post(url, json={"product": product})
    response.raise_for_status()
    return response.json()


def load_products(path):
    if path.endswith(".json"):
        with open(path) as f:
            return json.load(f)
    elif path.endswith(".csv"):
        with open(path, newline="") as f:
            reader = csv.DictReader(f)
            return [row for row in reader]
    raise ValueError("Unsupported file type")


if __name__ == "__main__":
    file_path = os.getenv("PRODUCT_FILE", "products.json")
    products = load_products(file_path)
    for product in products:
        data = upload_product(product)
        print(f"Uploaded {data['product']['title']}")
