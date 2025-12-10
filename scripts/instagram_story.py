import argparse
import json
import os

import requests

GRAPH_URL = "https://graph.facebook.com/v19.0/me/media"


def publicar_story(access_token: str, imagen_url: str, texto: str) -> dict:
    """Envía una imagen como story a Instagram mediante la API Graph."""
    payload = {
        "image_url": imagen_url,
        "caption": texto,
        "access_token": access_token,
    }
    headers = {"Content-Type": "application/json"}
    response = requests.post(GRAPH_URL, json=payload, headers=headers)
    print("\ud83d\udcf8 Story publicada:", response.status_code)
    return response.json()


def generar_texto_story(nombre_producto: str, precio: float) -> str:
    """Genera el texto promocional de la story."""
    return f"🔥 Disponible ya: {nombre_producto} por solo {precio}€. ¡Descúbrelo en TRYONYOU.APP!"


def main() -> None:
    parser = argparse.ArgumentParser(description="Publica una story en Instagram")
    parser.add_argument("imagen_url", help="URL de la imagen de la story")
    parser.add_argument("nombre_producto", help="Nombre del producto")
    parser.add_argument("precio", type=float, help="Precio del producto")
    parser.add_argument(
        "--token",
        dest="token",
        default=os.getenv("INSTAGRAM_ACCESS_TOKEN"),
        help="Instagram access token",
    )
    args = parser.parse_args()

    if not args.token:
        raise SystemExit(
            "Se requiere un token de acceso de Instagram (--token o variable INSTAGRAM_ACCESS_TOKEN)"
        )
    texto = generar_texto_story(args.nombre_producto, args.precio)
    data = publicar_story(args.token, args.imagen_url, texto)
    print(json.dumps(data, ensure_ascii=False, indent=2))


if __name__ == "__main__":
    main()
