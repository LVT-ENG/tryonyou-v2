"""Utility to analyze fetched dataset."""
from __future__ import annotations

import json
from pathlib import Path


def count_titles_with_word(path: str | Path, word: str) -> int:
    """Return number of posts whose title contains the given word."""
    path = Path(path)
    with path.open(encoding='utf-8') as f:
        data = json.load(f)
    posts = data.get('posts', [])
    return sum(
        1 for post in posts if word.lower() in post.get('title', '').lower()
    )


if __name__ == "__main__":
    count = count_titles_with_word(Path(__file__).resolve().parents[1] / 'dataset.json', 'Post')
    print(count)
