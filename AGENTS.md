# AGENTS.md - Documentación de Agentes Activos

Este proyecto cuenta con varios agentes automáticos y módulos de IA que ayudan en el despliegue, pruebas y recomendaciones dentro de TRYONME.

## Agentes en `agents/`

- **DeployScriptMaster**: despliega la aplicación en Vercel.
- **TestRunnerGPT**: crea y ejecuta pruebas automatizadas.
- **RefactorAgentJS**: refactoriza código JavaScript redundante.
- **DocuGen**: genera documentación básica.
- **TaskResolver**: resuelve tareas rápidas a partir de un formato de texto.
- **compararTalla**: calcula la talla óptima según medidas del usuario.
- **recomendarPrenda**: sugiere la prenda ideal según ocasión y estilo.
- **reaccionPau**: genera reacciones de Pau.
- **validarDonacion**: comprueba si una prenda puede donarse.
- **generarAvatar**: crea un avatar 3D personalizado.
- **brandGuardian**: valida que el contenido sea coherente con la marca.

## Agentes Virtuales

- **PMV – Project Manager Virtual**: coordina el sistema completo y activa otros agentes.
- **Content Pro – Redactor Web & Marca**: genera y traduce contenido web.
- **Ficha Técnica Master – Producción & CMS**: prepara fichas técnicas para fábrica y Shopify.
- **Proveedor Tracker – Control de Fábricas**: gestiona presupuestos y relaciones con proveedores.
- **RRSS Automator – Redes Sociales Inteligentes**: publica contenidos de forma automática.
- **Tester UX Web – Usuario Fantasma**: simula la navegación web y reporta mejoras.
- **Factory Master – Producción & Envío**: gestiona el material enviado a fábrica.
- **Mockup Artist – Visualizador de Producto**: crea mockups realistas con IA.
- **Checkout UX Master – Optimización del Checkout**: reduce la fricción en la compra.
- **Look Curator – Curador Estético + Comercial**: ordena productos y destaca los más atractivos.
- **Fit-AI Assistant – Asistente de Tallas Inteligente**: recomienda tallas ideales.
- **Brand Guardian – Guardián de la Identidad**: asegura la coherencia de la marca.
- **HR Supervisor – Recomendador de Agentes**: sugiere qué agentes activar y evalúa su rendimiento.
- **Control CEO – Resumen Diario**: entrega al CEO métricas diarias de pedidos, visitas y likes.

## Agentes de Infraestructura y Mantenimiento

- **InfraDeployer**: analiza el entorno, elige la plataforma adecuada (Wix, Vercel o Render) y despliega la web. También puede generar dominios temporales y verificar la configuración DNS.
- **ContentSyncBot**: sincroniza textos, imágenes y vídeos desde `README_TRYONME_FINAL.txt` hacia Wix, Shopify e Instagram, detectando conflictos y notificando actualizaciones.
- **ShopifyAutoUploader**: importa el CSV `Descargar TRYONYOU_60_PRODUCTS.csv` diariamente para subir productos, asignar categorías y verificar stock.
- **HealthMonitor**: ejecuta `site_health_check.py` cada 5 minutos y envía alertas por email usando SMTP cuando la aplicación no responde.
- **AI_Optimizer**: mejora UX, UI y conversión a partir de `estructura.html`, `style.css` y `textos_home.txt`, reescribiendo textos y refinando el layout.
- **SupportAutoResponder**: responde automáticamente a consultas frecuentes del formulario de contacto en español, inglés y francés con un fallback humano.
- **BackupMaster**: realiza un backup semanal de `01_Web_Produccion`, `02_Shopify_Productos` y `03_Agentes_y_Prompts` hacia Google Drive y Dropbox, notificando si falla.

## Motor Central - Sistema de Recomendaciones

El **Motor** es el corazón del sistema TryOnMe, implementado como prototipo en Google Sheets para validación rápida. Se encuentra en el directorio `google-apps-script/`.

### Componentes del Motor

- **Motor.gs**: Script principal de Google Apps Script que inicializa la estructura completa
- **GoogleSheetsMotor.js**: Cliente de Node.js para integración con la aplicación web
- **appsscript.json**: Configuración del proyecto de Google Apps Script

### Funcionalidades

El Motor gestiona:
- **Usuarios**: Perfiles con preferencias de estilo, tallas y datos personales
- **Medidas**: Datos corporales capturados con TryOn (manual o escáner 3D)
- **Tendencias**: Top 20 de moda extraído de Google Trends y Fashion Tech Trends
- **Reglas**: Algoritmo de ponderación para recomendaciones (preferencias, tendencias, fitting)
- **Recomendaciones**: Output final con 20 resultados personalizados por usuario
- **Lists**: Catálogos de valores (estilos, colores, tipos de prenda, ajustes, etc.)

### Integración

El Motor puede conectarse con la app web mediante:
1. Google Sheets API desde Node.js (ver `GoogleSheetsMotor.js`)
2. Apps Script Web App (endpoints HTTP)
3. Exportación CSV para procesamiento batch
4. Zapier/Make.com para automatizaciones

Ver documentación completa en `google-apps-script/README.md`.

