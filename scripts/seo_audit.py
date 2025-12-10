import sys
import os
from bs4 import BeautifulSoup

REQUIRED = {
    'title': lambda soup: soup.title is not None,
    'description': lambda soup: soup.find('meta', attrs={'name':'description'}) is not None,
    'viewport': lambda soup: soup.find('meta', attrs={'name':'viewport'}) is not None,
    'canonical': lambda soup: soup.find('link', attrs={'rel':'canonical'}) is not None,
}

def audit_file(path):
    with open(path, 'r', encoding='utf-8') as f:
        soup = BeautifulSoup(f, 'html.parser')
    missing = [tag for tag, check in REQUIRED.items() if not check(soup)]
    if missing:
        print(f"{path}: missing {', '.join(missing)}")


def main():
    if len(sys.argv) < 2:
        print('Usage: python scripts/seo_audit.py <directory>')
        return 0
    directory = sys.argv[1]
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.html'):
                audit_file(os.path.join(root, file))
    return 0

if __name__ == '__main__':
    sys.exit(main())
