import argparse
from pathlib import Path


def generate_landing(brand_name: str, contact: str, demo_link: str) -> str:
    html = f"""
<html>
<head><title>Colabora con TRYONYOU</title></head>
<body>
  <h1>Hola {brand_name},</h1>
  <p>TRYONYOU.APP es una solución 360º para personalización textil.</p>
  <ul>
    <li>🔁 Sistema bajo pedido</li>
    <li>🤖 IA + ajuste corporal</li>
    <li>📦 Producción directa con márgenes altos</li>
  </ul>
  <p>Puedes ver una demo funcional aquí:</p>
  <a href="{demo_link}">{demo_link}</a>
  <p>Contacto directo: {contact}</p>
</body>
</html>
"""
    return html


def main() -> None:
    parser = argparse.ArgumentParser(description="Generate partner landing page")
    parser.add_argument("--brand", required=True, help="Brand name")
    parser.add_argument("--contact", required=True, help="Contact email")
    parser.add_argument("--demo-link", required=True, help="Demo URL")
    parser.add_argument(
        "--output",
        type=Path,
        default=Path("landing_partner.html"),
        help="Output HTML file",
    )
    args = parser.parse_args()

    html = generate_landing(args.brand, args.contact, args.demo_link)
    args.output.write_text(html, encoding="utf-8")
    print(f"🌐 Landing generada: {args.output}")


if __name__ == "__main__":
    main()
