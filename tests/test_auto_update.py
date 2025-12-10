import os
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))
from scripts.auto_update import perform_update


def test_perform_update(tmp_path, monkeypatch):
    dataset = Path(__file__).resolve().parents[1] / "dataset.json"
    if dataset.exists():
        dataset.unlink()

    monkeypatch.delenv("ENABLE_SHOPIFY_SYNC", raising=False)
    perform_update()

    assert dataset.exists()
