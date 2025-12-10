import subprocess
from pathlib import Path


def test_generate_partner_landing(tmp_path):
    outfile = tmp_path / "landing.html"
    subprocess.check_call([
        "python",
        "scripts/generate_partner_landing.py",
        "--brand",
        "Levi's",
        "--contact",
        "ruben@tryonyou.app",
        "--demo-link",
        "https://app.tryonyou.app/demo",
        "--output",
        str(outfile),
    ])
    content = outfile.read_text(encoding="utf-8")
    assert "Levi's" in content
    assert "https://app.tryonyou.app/demo" in content
