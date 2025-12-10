"""Generador de modelos 3D simplificado para TRYONME.

Esta utilidad crea un diccionario con la informaci\xc3\xb3n b\xc3\xa1sica de un
modelo 3D y la ruta de previsualizaci\xc3\xb3n.
"""

from __future__ import annotations

from dataclasses import dataclass


@dataclass
class Modelo3D:
    nombre: str
    estilo: str
    color: str
    preview_url: str


def generar_modelo_3d(nombre: str, color_base: str, geometria: str = "cubista") -> Modelo3D:
    """Genera la descripci\xc3\xb3n de un modelo 3D.

    Parameters
    ----------
    nombre: str
        Nombre del modelo.
    color_base: str
        Color principal de la prenda o art\xc3\xadculo.
    geometria: str, optional
        Tipo de geometr\xc3\xada o estilo del modelo. Por defecto ``"cubista"``.

    Returns
    -------
    Modelo3D
        Dataclass con la informaci\xc3\xb3n del modelo y una URL de preview.
    """
    return Modelo3D(
        nombre=nombre,
        estilo=geometria,
        color=color_base,
        preview_url=f"https://cdn.tryonyou.app/previews/{nombre}.glb",
    )


if __name__ == "__main__":
    modelo = generar_modelo_3d("chaqueta_epic", "verde lim\xc3\xb3n")
    print("\ud83e\uddf5 Preview 3D generado:", modelo)
