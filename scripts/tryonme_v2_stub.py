import csv
import json
import os
import requests

PRODUCTS_CSV = os.path.join('products', 'productos.csv')
PRICES_TXT = os.path.join('products', 'precios.txt')
SERVER_URL = os.environ.get('TRYONME_UPLOAD_URL', 'http://localhost:8000/upload')


def load_products():
    products = {}
    with open(PRODUCTS_CSV, encoding='utf-8') as f:
        reader = csv.reader(f)
        next(reader, None)  # skip header
        for pid, nombre in reader:
            products[pid] = {'nombre': nombre}
    return products


def load_prices():
    prices = {}
    with open(PRICES_TXT, encoding='utf-8') as f:
        for line in f:
            if ':' in line:
                pid, price = line.split(':', 1)
                prices[pid.strip()] = float(price.strip())
    return prices


def combine_data():
    products = load_products()
    prices = load_prices()
    for pid, info in products.items():
        info['precio'] = prices.get(pid)
    return products


def upload_data(data):
    try:
        response = requests.post(SERVER_URL, json=data, timeout=5)
        print('Upload status:', response.status_code)
    except Exception as exc:
        print('Upload failed:', exc)


if __name__ == '__main__':
    catalog = combine_data()
    for pid, info in catalog.items():
        print(f"{pid}: {info['nombre']} - ${info.get('precio','N/A')}")
    upload_data({'products': catalog})
