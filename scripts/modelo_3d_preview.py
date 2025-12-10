# -*- coding: utf-8 -*-
"""Generate simple 3D model preview data.

This module exposes ``generar_modelo_3d`` which creates a dictionary
representing a 3D model preview for a clothing item.
"""

from __future__ import annotations


def generar_modelo_3d(nombre: str, color_base: str, geometria: str = "cubista") -> dict:
    """Return preview metadata for a clothing item.

    Parameters
    ----------
    nombre: str
        Identifier for the garment.
    color_base: str
        Base color for the preview.
    geometria: str, optional
        Style or geometry to display. Defaults to ``"cubista"``.

    Returns
    -------
    dict
        Dictionary with preview information.
    """
    return {
        "nombre": nombre,
        "estilo": geometria,
        "color": color_base,
        "preview_url": f"https://cdn.tryonyou.app/previews/{nombre}.glb",
    }


if __name__ == "__main__":  # pragma: no cover - demo usage
    modelo = generar_modelo_3d("chaqueta_epic", "verde limón")
    print("\U0001F9F5 Preview 3D generado:", modelo)

