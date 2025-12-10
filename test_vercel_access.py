import os
import pytest
import requests

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")

@pytest.mark.skipif(VERCEL_TOKEN is None, reason="No se encontró VERCEL_TOKEN")
def test_vercel_api_access():
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    try:
        response = requests.get(
            "https://api.vercel.com/v2/projects", headers=headers, timeout=10
        )
    except requests.exceptions.RequestException as e:
        pytest.skip(f"🔒 Acceso bloqueado: {e}")

    assert response.status_code == 200, (
        f"❌ Error: {response.status_code} - {response.text}"
    )
    print("✅ Conexión con Vercel OK desde localhost")
