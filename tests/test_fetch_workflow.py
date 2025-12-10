import subprocess
import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1]))
from scripts.process_dataset import count_titles_with_word


def test_fetch_and_process():
    root = Path(__file__).resolve().parents[1]
    dataset = root / "dataset.json"
    if dataset.exists():
        dataset.unlink()

    subprocess.run(["node", str(root / "scripts" / "fetch_dataset.js")], check=True)
    assert dataset.exists()

    count = count_titles_with_word(dataset, "Post")
    assert isinstance(count, int)
    assert count >= 3
