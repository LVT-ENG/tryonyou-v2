import os
import base64
import sys
from pathlib import Path

# Ensure project root is on path to import the module
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.lookbook_generator import generar_lookbook

IMG_DATA = (
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/5+hHgAHggJ/p2sjjwAAAABJRU5ErkJggg=="
)


def test_generar_lookbook(tmp_path):
    img_path = tmp_path / "img.png"
    img_path.write_bytes(base64.b64decode(IMG_DATA))
    looks = [{"titulo": "Test", "descripcion": "Desc", "imagen": str(img_path)}]

    cwd = os.getcwd()
    os.chdir(tmp_path)
    try:
        generar_lookbook("user", looks)
    finally:
        os.chdir(cwd)

    assert (tmp_path / "lookbook_user.pdf").exists()
