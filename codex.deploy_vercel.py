"""Script para desplegar TRYONME en Vercel.

El token y la ruta del proyecto pueden definirse mediante variables de entorno
`VERCEL_TOKEN` y `PROJECT_DIR`. Si no existen, se usan los valores por defecto
documentados en `AGENTS.md`.
"""

import os
import subprocess
import sys

# Token por defecto generado desde Vercel (puede sobreescribirse con la
# variable de entorno `VERCEL_TOKEN`).
VERCEL_TOKEN = os.environ.get(
    "VERCEL_TOKEN", "verceltoken_v1_bfM3C0lY4LKeZjXXXXXXXXXXXX"
)

# Ruta del proyecto, reemplazable mediante la variable de entorno `PROJECT_DIR`.
PROJECT_DIR = os.environ.get("PROJECT_DIR", "/workspace/tryon-app")

deploy_command = [
    "vercel",
    "--token", VERCEL_TOKEN,
    "--prod",
    "--cwd", PROJECT_DIR
]

def deploy():
    confirm = input("¿Continuar con el despliegue en Vercel? [y/N]: ").strip().lower()
    if confirm != "y":
        print("Operación cancelada.")
        return

    try:
        print("🚀 Desplegando en Vercel...")
        subprocess.run(deploy_command + ["--confirm"], check=True)
        print("✅ Deploy completado con éxito.")
    except subprocess.CalledProcessError as e:
        print("❌ Error durante el deploy:", e)
        sys.exit(1)

if __name__ == "__main__":
    deploy()
