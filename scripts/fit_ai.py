"""Simple Fit-AI helper functions."""
from __future__ import annotations

from typing import Dict, List
from subscription import require_module


def calcular_talla(altura: int, peso: int, medidas: Dict[str, int]) -> str:
    """Return a size recommendation based on height, weight and measurements."""
    if altura > 180 and peso < 80:
        return "L Slim Fit"
    if medidas.get("cintura", 0) < 75:
        return "S"
    if peso > 90:
        return "XL"
    return "M"


def comparar_favoritas(prenda_user: Dict[str, int], prenda_ref: Dict[str, int]) -> List[str]:
    """Compare user's garment with a reference garment and return differences."""
    resultado: List[str] = []
    for key in prenda_user:
        diff = abs(prenda_user[key] - prenda_ref.get(key, prenda_user[key]))
        resultado.append(f"{key}: diferencia de {diff}cm")
    return resultado


if __name__ == "__main__":
    try:
        require_module("fit_ai")
    except RuntimeError as exc:
        print(exc)
        raise SystemExit(1)

    medidas = {"pecho": 94, "cintura": 78, "cadera": 90}
    talla = calcular_talla(190, 78, medidas)
    print("\U0001f9cd\u200d\u2642\ufe0f Talla sugerida:", talla)
    comparativa = comparar_favoritas({"pecho": 94, "cintura": 78}, {"pecho": 96, "cintura": 80})
    print("\ud83d\udccf Comparaci\u00f3n de prenda:", comparativa)
