import json
import subprocess


def test_nft_minter():
    output = subprocess.check_output(
        ["python", "scripts/nft_minter.py", "tester", "SKU123", "--json"],
        text=True,
    ).strip()
    nft = json.loads(output)
    assert nft["owner"] == "tester"
    assert nft["sku"] == "SKU123"
    assert len(nft["token"]) == 64
    assert nft["url"].endswith(nft["token"])
