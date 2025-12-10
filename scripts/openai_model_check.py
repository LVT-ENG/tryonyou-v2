import requests
import os

API_KEY = os.getenv("OPENAI_API_KEY")
headers = {"Authorization": f"Bearer {API_KEY}"}

try:
    r = requests.get("https://api.openai.com/v1/models", headers=headers)
    modelos = sorted([m["id"] for m in r.json()["data"]])
    with open("model_snapshot.txt", "w") as f:
        f.write("\n".join(modelos))
except Exception as e:
    print(f"❌ Error consultando modelos: {e}")
