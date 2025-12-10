"""Verify that the Vercel API can be reached.

The test loads ``VERCEL_TOKEN`` from the environment. If the token is missing or
the request cannot be completed (for instance due to network restrictions), the
test is skipped instead of failing so other tests continue to run.
"""

import os
import pytest
import requests


def test_vercel_api_access() -> None:
    token = os.getenv("VERCEL_TOKEN")
    if token is None:
        pytest.skip("VERCEL_TOKEN not provided")

    headers = {"Authorization": f"Bearer {token}"}
    try:
        response = requests.get(
            "https://api.vercel.com/v2/projects", headers=headers, timeout=10
        )
    except requests.exceptions.RequestException as e:
        pytest.skip(f"Connection blocked: {e}")

    assert response.status_code == 200, (
        f"Vercel API error: {response.status_code} - {response.text}"
    )
