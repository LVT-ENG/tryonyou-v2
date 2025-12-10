import subprocess
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))
from core.analytics import load_dataset_and_count


def test_fetch_and_process():
    root = Path(__file__).resolve().parents[1]
    dataset = root / "dataset.json"
    if dataset.exists():
        dataset.unlink()

    subprocess.run(["node", str(root / "scripts" / "fetch_dataset.js")], check=True)
    assert dataset.exists()

    count = load_dataset_and_count(dataset, "Post")
    assert isinstance(count, int)
    assert count >= 3
