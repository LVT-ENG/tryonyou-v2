import argparse
import hashlib
import json
from datetime import datetime


def generar_nft_hash(sku: str, timestamp: str | None = None) -> str:
    """Genera un hash SHA-256 a partir del SKU y un timestamp."""
    data = f"{sku}-{timestamp or datetime.utcnow().isoformat()}"
    return hashlib.sha256(data.encode()).hexdigest()


def registrar_nft(owner: str, sku: str, announce: bool = True) -> dict:
    """Registra un NFT simple para una prenda."""
    token = generar_nft_hash(sku)
    url = f"https://nft.tryonyou.app/token/{token}"
    if announce:
        print(f"\U0001F3A8 NFT generado para {owner}:\n{url}")
    return {"owner": owner, "sku": sku, "token": token, "url": url}


def main() -> None:
    parser = argparse.ArgumentParser(description="Generar un NFT de prenda")
    parser.add_argument("owner", help="Propietario del NFT")
    parser.add_argument("sku", help="SKU de la prenda")
    parser.add_argument(
        "--json", action="store_true", help="Mostrar solo el JSON resultante"
    )
    args = parser.parse_args()

    nft = registrar_nft(args.owner, args.sku, announce=not args.json)
    if args.json:
        print(json.dumps(nft, ensure_ascii=False))
    else:
        print("\U0001F5BC️ NFT registrado:", nft)


if __name__ == "__main__":
    main()
