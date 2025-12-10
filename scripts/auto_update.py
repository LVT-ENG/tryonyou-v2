"""Actualizar metadatos y dataset local con IP y modelos de OpenAI."""
from __future__ import annotations

import json
import os
from datetime import datetime
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
DATASET_FILE = ROOT / "dataset.json"
MODELS_FILE = ROOT / "openai_models.json"
IP_FILE = ROOT / "server_ip.txt"


def fetch_public_ip() -> None:
    """Guarda la IP pública del servidor en un archivo."""
    try:
        ip = requests.get("https://api.ipify.org", timeout=10).text.strip()
        IP_FILE.write_text(ip)
    except requests.RequestException as exc:  # pragma: no cover - offline
        print(f"Warning: unable to fetch server IP: {exc}")


def fetch_openai_models() -> None:
    """Descarga la lista de modelos de OpenAI si hay API key."""
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        print("Warning: OPENAI_API_KEY not set; skipping model fetch")
        return
    headers = {"Authorization": f"Bearer {api_key}"}
    try:
        resp = requests.get("https://api.openai.com/v1/models", headers=headers, timeout=10)
        resp.raise_for_status()
        MODELS_FILE.write_text(json.dumps(resp.json(), indent=2))
    except requests.RequestException as exc:  # pragma: no cover - network
        print(f"Warning: unable to fetch OpenAI models: {exc}")


def perform_update() -> None:
    """Actualiza dataset.json y metadatos."""
    DATASET_FILE.write_text(json.dumps({"updated_at": datetime.utcnow().isoformat()}))
    fetch_public_ip()
    fetch_openai_models()
    print("Update complete")


if __name__ == "__main__":
    perform_update()
