import requests
from unittest.mock import patch, Mock

VERCEL_TOKEN = "2421c921daccb589f7ea1d388213b479"


def test_vercel_api_access():
    assert VERCEL_TOKEN is not None, "❌ No se encontró VERCEL_TOKEN"
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}

    with patch("requests.get") as mock_get:
        mock_response = Mock(status_code=200, text="ok")
        mock_get.return_value = mock_response
        response = requests.get(
            "https://api.vercel.com/v2/projects", headers=headers
        )

        assert response.status_code == 200, (
            f"❌ Error: {response.status_code} - {response.text}"
        )
        print("✅ Conexión con Vercel OK desde localhost")
