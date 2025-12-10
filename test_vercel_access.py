import os
import requests
import pytest

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")


def test_vercel_api_access():
    """Check that the provided Vercel token can access the Projects API."""
    if not VERCEL_TOKEN:
        pytest.skip("❌ TOKEN NO ENCONTRADO – Inserta VERCEL_TOKEN en variables de entorno")

    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    try:
        response = requests.get(
            "https://api.vercel.com/v2/projects", headers=headers, timeout=10
        )
    except requests.RequestException as exc:
        pytest.fail(f"🔒 ERROR DE RED: {exc}")

    assert response.status_code == 200, f"❌ Falla conexión: {response.status_code} – {response.text}"
    print("✅ TOQUE VERCEL FUNCIONAL – ¡Conectado con éxito!")
