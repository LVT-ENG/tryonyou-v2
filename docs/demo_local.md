# Guía rápida para ejecutar la demo local

Sigue estos pasos para compilar, personalizar y ejecutar TRYONME en tu entorno de desarrollo.

## 1. Clona el repositorio
```bash
git clone <url-del-repo>
cd tryon-app
```

## 2. Instala dependencias
```bash
npm install
pip install -r requirements.txt
```

## 3. Configura variables de entorno
Copia `.env.example` a `.env` y añade tu clave de OpenAI:
```bash
OPENAI_API_KEY=tu_clave
```
Esta variable es necesaria para las funciones de IA del servidor.

## 4. Personaliza los estilos
Modifica `style.css` para cambiar colores, fuentes y diseño. Los cambios se reflejarán al recargar la página.

## 5. Compila y ejecuta la demo
Lanza el servidor de desarrollo de Vite:
```bash
npm run dev
```
Abre `http://localhost:5173` en tu navegador. Si quieres un build estático:
```bash
npm run build
npm run preview
```

Con esto tendrás la demo activa y podrás seguir ajustando el CSS o el código según tus necesidades.
