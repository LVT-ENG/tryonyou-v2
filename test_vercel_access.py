import os
import requests
import pytest

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")
VERCEL_PROJECT_ID = os.getenv("VERCEL_PROJECT_ID")
VERCEL_ORG_ID = os.getenv("VERCEL_ORG_ID")


def test_vercel_api_access():
    """Check that the configured Vercel credentials can fetch the project."""
    if not all([VERCEL_TOKEN, VERCEL_PROJECT_ID, VERCEL_ORG_ID]):
        pytest.skip("❌ Credenciales de Vercel incompletas")

    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    try:
        response = requests.get(
            f"https://api.vercel.com/v9/projects/{VERCEL_PROJECT_ID}",
            headers=headers,
            params={"teamId": VERCEL_ORG_ID},
            timeout=10,
        )
    except requests.RequestException as exc:
        pytest.fail(f"🔒 ERROR DE RED: {exc}")

    assert response.status_code == 200, (
        f"❌ Falla conexión: {response.status_code} – {response.text}"
    )
    data = response.json()
    assert data.get("id") == VERCEL_PROJECT_ID, "❌ Project ID mismatch"
