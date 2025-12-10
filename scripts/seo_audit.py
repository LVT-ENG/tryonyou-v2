"""Audit basic SEO tags in HTML files."""
from __future__ import annotations
from pathlib import Path
import argparse
from bs4 import BeautifulSoup

REQUIRED_SELECTORS = [
    "title",
    "meta[name=description]",
    "meta[name=viewport]",
    "link[rel=canonical]",
]


def check_file(path: Path) -> list[str]:
    soup = BeautifulSoup(path.read_text(encoding="utf-8"), "html.parser")
    # Skip snippets without full HTML structure
    if not soup.find("html") or not soup.find("head"):
        return []
    missing = [sel for sel in REQUIRED_SELECTORS if not soup.select_one(sel)]
    return missing


def audit_directory(root: Path) -> dict[str, list[str]]:
    results = {}
    for html in root.rglob("*.html"):
        if "node_modules" in html.parts:
            continue
        missing = check_file(html)
        if missing:
            results[str(html)] = missing
    return results


def main() -> None:
    parser = argparse.ArgumentParser(description="Check HTML files for SEO tags")
    parser.add_argument("root", nargs="?", default=".", help="Directory to scan")
    args = parser.parse_args()

    results = audit_directory(Path(args.root))
    if not results:
        print("All HTML files contain basic SEO tags.")
    else:
        for file, tags in results.items():
            print(f"{file}: missing {', '.join(tags)}")


if __name__ == "__main__":  # pragma: no cover - CLI usage
    main()
