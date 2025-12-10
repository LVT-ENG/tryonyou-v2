import os
import requests

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")

def test_vercel_api_access():
    assert VERCEL_TOKEN is not None, "❌ No se encontró VERCEL_TOKEN"
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    try:
        response = requests.get(
            "https://api.vercel.com/v2/projects", headers=headers, timeout=10
        )
        assert response.status_code == 200, (
            f"❌ Error: {response.status_code} - {response.text}"
        )
        print("✅ Conexión con Vercel OK desde localhost")
    except requests.exceptions.RequestException as e:
        raise AssertionError(f"🔒 Acceso bloqueado: {e}")
