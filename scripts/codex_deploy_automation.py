#!/usr/bin/env python3
"""Automate TryOnYou deployment via Make, Codex and Vercel."""
from __future__ import annotations

import os
import subprocess
from pathlib import Path

REQUIRED_VARS = [
    "VERCEL_TOKEN",
    "PROJECT_NAME",
    "GITHUB_REPO_ID",
    "NOTION_TOKEN",
    "NOTION_DATABASE_ID",
    "OPENAI_API_KEY",
    "DATASET_URL",
    "HTTPS_PROXY",
    "FORCE_FETCH",
]


def check_env() -> None:
    """Ensure all required environment variables are defined."""
    missing = [var for var in REQUIRED_VARS if not os.getenv(var)]
    if missing:
        raise SystemExit(f"Missing required env vars: {', '.join(missing)}")


def run(cmd: list[str]) -> None:
    """Run a command and exit on failure."""
    print("$", " ".join(cmd))
    subprocess.run(cmd, check=True)


def main() -> None:
    check_env()
    repo_root = Path(__file__).resolve().parents[1]
    os.chdir(repo_root)
    run(["node", "scripts/generate_vercel_env.js"])
    run(["make", "all"])


if __name__ == "__main__":
    main()
