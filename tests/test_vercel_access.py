import os
import requests
import pytest


API_URL = "https://api.vercel.com/v2/projects"

def test_vercel_api_access():
    """Verifica que el token puede acceder a la API de Vercel."""
    token = os.getenv("VERCEL_TOKEN")
    assert token, "❌ No se encontró VERCEL_TOKEN"

    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(API_URL, headers=headers, timeout=10)
    except requests.exceptions.RequestException as exc:
        pytest.fail(f"🔒 Acceso bloqueado: {exc}. Revisa configuración de red o entorno.")

    assert response.status_code == 200, f"❌ Error {response.status_code}: {response.text}"
    print("✅ Conexión con Vercel OK desde localhost")
