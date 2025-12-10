"""Utility to analyze fetched dataset."""
from __future__ import annotations

from pathlib import Path

from core.analytics import load_dataset_and_count


def count_titles_with_word(path: str | Path, word: str) -> int:
    """Return number of posts whose title contains the given word."""
    return load_dataset_and_count(path, word)


if __name__ == "__main__":
    count = load_dataset_and_count(Path(__file__).resolve().parents[1] / 'dataset.json', 'Post')
    print(count)
