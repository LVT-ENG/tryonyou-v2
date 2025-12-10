import requests

try:
    ip = requests.get("https://api64.ipify.org?format=json").json()["ip"]
    print(f"🌍 IP pública: {ip}")
    with open("last_known_ip.txt", "w") as f:
        f.write(ip)
except Exception:
    print("❌ Error obteniendo IP")
