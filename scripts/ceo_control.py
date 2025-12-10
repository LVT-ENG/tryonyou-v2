from datetime import datetime
import argparse


def resumen_diario(pedidos: int, visitas: int, likes: int) -> str:
    """Genera un resumen diario con métricas clave."""
    fecha = datetime.now().strftime("%d/%m/%Y")
    estado = "\U0001F525 ALTA DEMANDA" if pedidos > 20 else "Normal"
    return f"""
\U0001F9E0 RESUMEN DIARIO – {fecha}
\U0001F4E6 Pedidos: {pedidos}
\U0001F440 Visitas: {visitas}
\u2764\uFE0F Likes: {likes}
\U0001F4C8 Estado: {estado}
"""


def main() -> None:
    parser = argparse.ArgumentParser(description="Genera un resumen diario para el CEO")
    parser.add_argument("pedidos", type=int, nargs="?", default=0, help="Numero de pedidos")
    parser.add_argument("visitas", type=int, nargs="?", default=0, help="Numero de visitas")
    parser.add_argument("likes", type=int, nargs="?", default=0, help="Numero de likes")
    args = parser.parse_args()

    print(resumen_diario(args.pedidos, args.visitas, args.likes))


if __name__ == "__main__":
    main()
