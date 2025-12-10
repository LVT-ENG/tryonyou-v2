#!/usr/bin/env python3
"""Run tests and SEO audit to verify deployment readiness."""
from __future__ import annotations
import os
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def run(cmd: list[str]) -> None:
    print(f"$ {' '.join(cmd)}")
    result = subprocess.run(cmd, capture_output=True, text=True)
    sys.stdout.write(result.stdout)
    if result.returncode != 0:
        sys.stderr.write(result.stderr)
        sys.exit(result.returncode)


def main() -> None:
    os.chdir(ROOT)
    run(["npm", "test"])
    run(["pytest", "-q"])
    run(["python", str(ROOT / "scripts" / "seo_audit.py")])
    required = ["OPENAI_API_KEY", "SHOPIFY_ACCESS_TOKEN"]
    missing = [v for v in required if not os.getenv(v)]
    if missing:
        print("Warning: missing env vars:", ", ".join(missing))
    else:
        print("All required environment variables are set.")


if __name__ == "__main__":
    main()
