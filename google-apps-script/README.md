# Motor TryOnMe - Google Apps Script

Este directorio contiene el **Motor central** de TryOnMe/TryOnYou implementado como un script de Google Apps Script que funciona sobre Google Sheets.

## 📋 Descripción

El Motor es un prototipo funcional que gestiona:
- **Usuarios**: Datos del formulario inicial y preferencias de estilo
- **Medidas**: Medidas corporales capturadas en TryOn (manual o escáner)
- **Tendencias**: Top 20 de tendencias de Google/Fashion Tech Trends
- **Reglas**: Pesos y cuotas para el algoritmo de recomendación
- **Recomendaciones**: 20 resultados finales personalizados por usuario
- **Lists**: Catálogos de valores (estilos, colores, tipos de prenda, etc.)

## 🚀 Instalación

### Opción 1: Desde Google Sheets

1. Crea una nueva hoja de cálculo en Google Sheets
2. Ve a **Extensiones > Apps Script**
3. Copia el contenido de `Motor.gs` en el editor
4. Copia el contenido de `appsscript.json` (reemplaza el archivo existente)
5. Guarda el proyecto (Ctrl+S o Cmd+S)
6. Recarga la hoja de Google Sheets
7. Verás un nuevo menú "TryOnMe Motor" en la barra superior
8. Haz clic en **TryOnMe Motor > Inicializar Motor**

### Opción 2: Usando clasp (Google Apps Script CLI)

```bash
# Instalar clasp globalmente
npm install -g @google/clasp

# Autenticarse con Google
clasp login

# Crear un nuevo proyecto
clasp create --type sheets --title "TryOnMe Motor"

# Empujar los archivos al proyecto
clasp push

# Abrir el proyecto en el navegador
clasp open
```

## 📊 Estructura de Datos

### Hoja: Usuarios
Almacena la información personal y preferencias de cada usuario:
- `user_id`: Identificador único del usuario
- `nombre`, `email`: Datos personales
- `sexo`, `edad`, `altura_cm`, `peso_kg`: Datos demográficos
- `ciudad`, `pais`, `clima`: Ubicación y contexto climático
- `estilo_1`, `estilo_2`, `estilo_3`: Top 3 estilos preferidos
- `color_1`, `color_2`: Colores favoritos
- `prenda_1`, `prenda_2`: Tipos de prenda favoritos
- `ajuste_preferido`: Preferencia de ajuste (Slim, Oversize, etc.)
- `consentimiento_datos`: Aceptación de términos
- `fecha_alta`: Fecha de registro

### Hoja: Medidas
Medidas corporales capturadas con el sistema TryOn:
- `user_id`: Referencia al usuario
- `fecha_medida`: Cuándo se tomaron las medidas
- `pecho_cm`, `cintura_cm`, `cadera_cm`: Medidas principales
- `largo_pierna_cm`, `largo_brazo_cm`, `hombros_cm`: Medidas secundarias
- `talla_habitual`: Talla que el usuario normalmente usa
- `notas`: Observaciones adicionales

### Hoja: Tendencias
Top tendencias de moda extraídas de Google Trends y Fashion Tech Trends:
- `fecha`: Fecha de captura de la tendencia
- `keyword`: Palabra clave original
- `etiqueta_normalizada`: Etiqueta procesada por el sistema
- `fuente_url`: URL de origen
- `dominio`: Dominio de la fuente
- `posicion_rank`: Posición en el ranking
- `repeticiones`: Número de menciones
- `volumen_busqueda`: Volumen de búsquedas estimado
- `nota`: Comentarios adicionales

### Hoja: Reglas
Parámetros de configuración del motor de recomendación:
- `peso_preferencias`: Peso del match con gustos personales (0-1)
- `peso_tendencias`: Peso del match con tendencias (0-1)
- `peso_fitting`: Peso del match por medidas (0-1)
- `quota_*`: Número de resultados por categoría (Personalizada, Live 'it, Vvl, TryOn, Externa)

### Hoja: Recomendaciones
Resultados finales del motor de recomendación:
- `user_id`: Usuario al que se recomienda
- `prenda_id`: ID de la prenda
- `tipo_prenda`, `color`, `estilo`: Características de la prenda
- `talla_recomendada`: Talla calculada según medidas
- `bucket`: Categoría (Personalizada, Live 'it, Vvl, etc.)
- `precio_eur`: Precio en euros
- `imagen_url`: URL de la imagen del producto
- `match_score`: Puntuación total de coincidencia
- `match_preferencias`, `match_tendencias`, `match_fitting`: Desglose del score
- `temporada`, `clima`: Contexto de uso
- `fecha_generada`: Cuándo se generó la recomendación
- `notas`: Observaciones adicionales

### Hoja: Lists
Catálogos de valores para validación de datos:
- **Styles**: 12 estilos de moda (Clásico, Casual, Deportivo, etc.)
- **Colors**: 12 colores principales
- **GarmentTypes**: 14 tipos de prenda
- **FitPreferences**: 7 opciones de ajuste
- **Sex**: 5 opciones de identidad de género
- **OutputBuckets**: 5 categorías de output
- **Climate**: 3 tipos de clima
- **Seasons**: 4 estaciones del año

## 🔧 Funciones Principales

### `initTryOnMe()`
Inicializa todas las hojas del motor con estructura y datos de ejemplo.

### `onOpen()`
Crea el menú personalizado "TryOnMe Motor" cuando se abre la hoja.

### `exportUsuariosJSON()`
Exporta la tabla de Usuarios a formato JSON (visible en registros).

### `exportRecomendacionesJSON()`
Exporta la tabla de Recomendaciones a formato JSON (visible en registros).

### `addListValidation(sheet, range, sourceRange)`
Función auxiliar para agregar validación de lista a un rango de celdas.

## 🔗 Integración con la App

Este prototipo puede conectarse con la aplicación web TryOnMe mediante:

1. **Google Sheets API**: Leer/escribir datos desde Node.js
2. **Apps Script Web App**: Exponer endpoints HTTP
3. **Zapier/Make.com**: Automatizaciones sin código
4. **CSV Export**: Exportación manual para procesamiento

### Ejemplo de integración con Node.js

```javascript
const { google } = require('googleapis');

async function leerUsuarios() {
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: 'TU_SPREADSHEET_ID',
    range: 'Usuarios!A2:T',
  });

  return response.data.values;
}
```

## 📝 Notas Importantes

- Este es un **prototipo funcional** pensado para validación rápida
- Una vez validado el modelo de datos, se recomienda migrar a:
  - Base de datos relacional (PostgreSQL, MySQL)
  - Base de datos NoSQL (MongoDB, Firebase)
  - Dashboard web con backend dedicado
- Los datos de ejemplo están en español y euros (EUR)
- Las validaciones de lista previenen errores de entrada de datos
- El motor está configurado para el mercado europeo (zona horaria París)

## 🔐 Seguridad y Privacidad

- Los datos de usuarios incluyen información personal sensible
- Asegúrate de cumplir con GDPR/RGPD antes de usar datos reales
- No compartas el enlace de la hoja sin protección adecuada
- Considera usar Google Workspace con autenticación SSO
- Implementa auditoría de accesos si se usa en producción

## 🚀 Roadmap

- [ ] Función para calcular `match_score` automáticamente
- [ ] Integración con API de tendencias (Google Trends API)
- [ ] Webhook para sincronizar con base de datos externa
- [ ] Dashboard visual con Google Data Studio
- [ ] Algoritmo de recomendación ML integrado
- [ ] Export automático a Shopify/WooCommerce
- [ ] Sincronización bidireccional con app web

## 📞 Soporte

Para preguntas sobre el Motor TryOnMe, contacta con el equipo de desarrollo o consulta la documentación principal del proyecto en el repositorio.

---

**Versión**: 1.0.0  
**Última actualización**: Octubre 2025  
**Autor**: TryOnMe Team
