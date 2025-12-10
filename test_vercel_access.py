"""Test connectivity with the Vercel API.

This test requires ``VERCEL_TOKEN`` to be set in the environment. If the token
is missing or the connection is blocked the test will be skipped so that other
tests can continue to run.
"""

import os
import pytest
import requests

VERCEL_TOKEN = os.getenv("VERCEL_TOKEN")

@pytest.mark.skipif(VERCEL_TOKEN is None, reason="VERCEL_TOKEN not provided")
def test_vercel_api_access():
    headers = {"Authorization": f"Bearer {VERCEL_TOKEN}"}
    try:
        response = requests.get(
            "https://api.vercel.com/v2/projects", headers=headers, timeout=10
        )
    except requests.exceptions.RequestException as e:
        pytest.skip(f"Connection blocked: {e}")

    assert response.status_code == 200, (
        f"Vercel API error: {response.status_code} - {response.text}"
    )
