import json
import subprocess
from pathlib import Path


def test_generate_seo_meta(tmp_path):
    out_file = tmp_path / "seo_meta.json"
    subprocess.check_call([
        "python",
        "scripts/generate_seo_meta.py",
        "products/casa_pavo_real.json",
        "--output",
        str(out_file),
    ])
    data = json.loads(out_file.read_text(encoding="utf-8"))
    assert isinstance(data, list)
    assert data, "seo_meta.json should contain entries"
    for entry in data:
        assert "title" in entry and "description" in entry
