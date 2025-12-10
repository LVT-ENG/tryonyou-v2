# TRY-ON

**Version 2.0** — This release brings refined styling and placeholder assets for the TRYONME web system.

This project is a prototype virtual fitting room. It now includes sample data files and a script that loads products from `products/productos.csv` and displays them on the main page. A placeholder video (`assets/video_portada.mp4`) and home text (`assets/textos_home.txt`) are also loaded dynamically.

The buttons in the demo attempt to contact an avatar backend at `/api/avatar`. Recommendation logic powered by GPT + AutoDonate is left as a TODO in `scripts/shopify.js`.

## How to run
1. Open `index.html` (or `frontend/index.html`) in a browser.
2. Ensure a backend is listening on `/api/avatar` to handle avatar creation.
3. Edit files in `products/` or `assets/` to customise the demo content.

## License
MIT License
