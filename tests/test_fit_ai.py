import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parents[1] / "scripts"))

from fit_ai import calcular_talla, comparar_favoritas

def test_calcular_talla_slim_fit():
    assert calcular_talla(185, 75, {"cintura": 80}) == "L Slim Fit"


def test_calcular_talla_s():
    assert calcular_talla(170, 55, {"cintura": 70}) == "S"


def test_calcular_talla_xl():
    assert calcular_talla(170, 95, {"cintura": 80}) == "XL"


def test_calcular_talla_default():
    assert calcular_talla(170, 80, {"cintura": 80}) == "M"


def test_comparar_favoritas():
    result = comparar_favoritas({"pecho": 94, "cintura": 78}, {"pecho": 96, "cintura": 80})
    assert result == ["pecho: diferencia de 2cm", "cintura: diferencia de 2cm"]

