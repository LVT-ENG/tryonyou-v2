from fpdf import FPDF


def generar_lookbook(usuario: str, looks: list):
    # Validate the 'looks' parameter
    if not isinstance(looks, list):
        raise ValueError("The 'looks' parameter must be a list.")
    for look in looks:
        if not isinstance(look, dict):
            raise ValueError("Each item in the 'looks' list must be a dictionary.")
        required_keys = {"titulo", "descripcion", "imagen"}
        if not required_keys.issubset(look.keys()):
            raise ValueError(f"Each dictionary in 'looks' must contain the keys: {required_keys}.")
    pdf = FPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()
    pdf.set_font("Arial", size=14)
    pdf.cell(200, 10, txt=f"Lookbook para {usuario}", ln=True, align="C")

    for look in looks:
        pdf.set_font("Arial", "B", 12)
        pdf.cell(200, 10, txt=look["titulo"], ln=True)
        pdf.set_font("Arial", size=10)
        pdf.multi_cell(0, 10, txt=look["descripcion"])
        pdf.image(look["imagen"], w=100)
        pdf.ln(10)

    filename = f"lookbook_{usuario}.pdf"
    pdf.output(filename)
    print(f"\ud83d\udc53 Lookbook generado: {filename}")


if __name__ == "__main__":
    looks_demo = [
        {
            "titulo": "Chaqueta 3D",
            "descripcion": "Cubismo asim\u00e9trico en tonos pastel.",
            "imagen": "chaqueta1.jpg",
        },
        {
            "titulo": "Gabardina \u00c9ptic",
            "descripcion": "Dise\u00f1o tech-futurista con visores.",
            "imagen": "gabardina1.jpg",
        },
    ]
    generar_lookbook("rubenes", looks_demo)
