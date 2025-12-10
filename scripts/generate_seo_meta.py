import json
from pathlib import Path
import argparse


def load_products(path: Path):
    with path.open('r', encoding='utf-8') as f:
        return json.load(f)


def generate_meta(product):
    name = product.get('name', 'Product')
    desc = product.get('description', '')
    title = f"Buy {name} | TryOnMe"
    meta_desc = desc[:117] + '...' if len(desc) > 120 else desc
    return {"title": title, "description": meta_desc}


def main():
    parser = argparse.ArgumentParser(description="Generate SEO metadata for products")
    parser.add_argument('file', type=Path, nargs='?', default=Path('products/casa_pavo_real.json'),
                        help='Path to products JSON')
    parser.add_argument('--output', type=Path, default=Path('products/seo_meta.json'),
                        help='Output JSON file with SEO metadata')
    args = parser.parse_args()

    products = load_products(args.file)
    seo_data = []
    for p in products:
        meta = generate_meta(p)
        seo_data.append({**p, **meta})

    with args.output.open('w', encoding='utf-8') as f:
        json.dump(seo_data, f, ensure_ascii=False, indent=2)
    print(f"SEO metadata saved to {args.output}")


if __name__ == '__main__':
    main()
