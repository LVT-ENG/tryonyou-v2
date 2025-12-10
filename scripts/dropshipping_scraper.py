import json
import csv
from pathlib import Path

import requests
from bs4 import BeautifulSoup

DATA_FILE = Path(__file__).resolve().parent.parent / 'data' / 'dropshipping_sites.json'


def load_sites():
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        return json.load(f)


def scrape_site(site):
    url = site.get('url')
    selectors = site.get('selectors', {})
    results = []
    try:
        resp = requests.get(url, timeout=10)
        resp.raise_for_status()
        soup = BeautifulSoup(resp.text, 'html.parser')
        for item in soup.select(selectors.get('item', '')):
            name = item.select_one(selectors.get('name', '')).get_text(strip=True)
            price = item.select_one(selectors.get('price', '')).get_text(strip=True)
            results.append({'name': name, 'price': price})
    except Exception:
        results.extend(site.get('fallback', []))
    return results


def main():
    sites = load_sites()
    all_rows = []
    for site in sites:
        products = scrape_site(site)
        for p in products:
            row = {
                'factory': site['name'],
                'product': p.get('name'),
                'price': p.get('price'),
                'print_on_demand': p.get('print_on_demand', 'N/A')
            }
            all_rows.append(row)

    outfile = Path('dropshipping_report.csv')
    with open(outfile, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=['factory', 'product', 'price', 'print_on_demand'])
        writer.writeheader()
        writer.writerows(all_rows)

    print(f'Report saved to {outfile.resolve()}')


if __name__ == '__main__':
    main()
