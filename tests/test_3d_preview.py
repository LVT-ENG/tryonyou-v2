from pathlib import Path
import sys

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.generar_modelo_3d import generar_modelo_3d, Modelo3D


def test_generar_modelo_3d():
    modelo = generar_modelo_3d("camisa_cool", "azul")
    assert isinstance(modelo, Modelo3D)
    assert modelo.nombre == "camisa_cool"
    assert modelo.estilo == "cubista"
    assert modelo.color == "azul"
    assert modelo.preview_url.endswith("camisa_cool.glb")
    assert modelo.texture_size == "1k"

    custom = generar_modelo_3d("camisa_cool", "azul", texture_size="4k")
    assert custom.texture_size == "4k"
