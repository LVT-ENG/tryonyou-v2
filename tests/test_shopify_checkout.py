import re
import sys
from pathlib import Path

# Ensure repository root is on sys.path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from scripts.shopify_checkout import generar_checkout_url, validar_pago


def test_generar_checkout_url():
    url = generar_checkout_url("SKU99", 240)
    assert url.startswith(
        "https://tryonyou.myshopify.com/cart/SKU99:1?checkout_token="
    )
    match = re.search(r"checkout_token=([0-9a-f]{32})&price=240", url)
    assert match, "URL should contain a valid token and price"


def test_validar_pago():
    assert (
        validar_pago("paid")
        == "\u2705 Pedido confirmado y en cola de producción"
    )
    assert validar_pago("failed") == "\u274C Error en el pago. Intenta de nuevo."
    assert (
        validar_pago("pending")
        == "\u23F3 Esperando confirmación de pago..."
    )
