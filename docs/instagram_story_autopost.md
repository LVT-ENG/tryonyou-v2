# Instagram Story Autopost

Este script permite publicar de forma automatizada stories en una cuenta de Instagram mediante la API Graph de Facebook.

## Uso

```bash
python scripts/instagram_story.py <imagen_url> <nombre_producto> <precio> --token <ACCESS_TOKEN>
```

Si no se indica `--token`, el script leerá la variable de entorno `INSTAGRAM_ACCESS_TOKEN`.

## Ejemplo

```bash
python scripts/instagram_story.py https://cdn.tryonyou.app/img/story001.jpg "Chaqueta Cubista" 219 --token ABC123
```

El comando mostrará el código de respuesta de la API y el JSON devuelto.
