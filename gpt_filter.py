"""Filtro de respuestas GPT con toque emocional para TRYONYOU."""


def gpt_response(user_input: str) -> str:
    """Devuelve una respuesta basada en palabras clave."""
    text = user_input.lower()
    if "odio" in text or "asco" in text:
        return (
            "🤖 DNA Agent: Este proyecto no es para todo el mundo. "
            "Pero si conectas, no hay vuelta atrás."
        )
    elif "me gusta" in text or "me flipa" in text:
        return (
            "💡 Stylist AI: Entonces estás listo. "
            "Prueba, compara y siente lo que te queda bien."
        )
    elif "cuánto vale" in text:
        return (
            "💰 Investor Translator: La inversión empieza en 160€. "
            "Subida según diseño, rareza y pedido."
        )
    else:
        return (
            "Client Whisperer: Dime qué buscas y lo encontraré para ti. "
            "TRYONYOU no es una marca, es tu reflejo."
        )


if __name__ == "__main__":
    ejemplos = [
        "odio esta chaqueta",
        "me flipa",
        "cuánto vale esto",
    ]
    for msg in ejemplos:
        print("🧠 Respuesta GPT:", gpt_response(msg))
