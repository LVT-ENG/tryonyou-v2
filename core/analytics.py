"""Core domain analytics utilities."""
from __future__ import annotations

import json
from pathlib import Path


def count_titles_with_word(data: dict, word: str) -> int:
    """Return number of posts whose title contains the given word."""
    posts = data.get("posts", [])
    return sum(1 for post in posts if word.lower() in post.get("title", "").lower())


def load_dataset_and_count(path: str | Path, word: str) -> int:
    """Load dataset from path and count titles containing word."""
    path = Path(path)
    with path.open(encoding="utf-8") as f:
        data = json.load(f)
    return count_titles_with_word(data, word)
