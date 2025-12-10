from pathlib import Path
import sys

# Ensure repository root is on path so we can import scripts.modelo_3d_preview
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))

from scripts.modelo_3d_preview import generar_modelo_3d


def test_generar_modelo_3d_defaults():
    modelo = generar_modelo_3d("prenda_test", "rojo")
    assert modelo["nombre"] == "prenda_test"
    assert modelo["estilo"] == "cubista"
    assert modelo["color"] == "rojo"
    assert modelo["preview_url"].endswith("prenda_test.glb")


def test_generar_modelo_3d_custom_style():
    modelo = generar_modelo_3d("prenda_test", "azul", geometria="esferico")
    assert modelo["estilo"] == "esferico"
