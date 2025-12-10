import json
from pathlib import Path
import argparse


def load_products(path: Path):
    with path.open('r', encoding='utf-8') as f:
        return json.load(f)


def generate_image_meta(product):
    name = product.get('name', 'Product')
    img = product.get('img', '')
    alt = f"{name} product image"
    return {"alt": alt, "og_image": img, "twitter_image": img}


def main():
    parser = argparse.ArgumentParser(description="Generate SEO image metadata for products")
    parser.add_argument('file', type=Path, nargs='?', default=Path('products/casa_pavo_real.json'),
                        help='Path to products JSON')
    parser.add_argument('--output', type=Path, default=Path('products/image_meta.json'),
                        help='Output JSON file with SEO image metadata')
    args = parser.parse_args()

    products = load_products(args.file)
    image_data = []
    for p in products:
        meta = generate_image_meta(p)
        image_data.append({**p, **meta})

    with args.output.open('w', encoding='utf-8') as f:
        json.dump(image_data, f, ensure_ascii=False, indent=2)
    print(f"SEO image metadata saved to {args.output}")


if __name__ == '__main__':
    main()
