import uuid


def generar_checkout_url(producto_sku: str, precio: int | float) -> str:
    """Generate a Shopify checkout URL for a given SKU and price."""
    token = uuid.uuid4().hex
    return (
        f"https://tryonyou.myshopify.com/cart/{producto_sku}:1?"
        f"checkout_token={token}&price={precio}"
    )


def validar_pago(status: str) -> str:
    """Return a message based on the payment status."""
    if status == "paid":
        return "\u2705 Pedido confirmado y en cola de producción"
    if status == "failed":
        return "\u274C Error en el pago. Intenta de nuevo."
    return "\u23F3 Esperando confirmación de pago..."


if __name__ == "__main__":
    checkout_url = generar_checkout_url("SKU99", 240)
    print("\U0001F6D2 Checkout generado:", checkout_url)
    print(validar_pago("paid"))
