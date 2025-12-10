# Motor TryOnMe - Google Apps Script

Este directorio contiene scripts de Google Apps Script para gestionar el "Motor" central de TryOnMe, un sistema de recomendación de prendas basado en Google Sheets.

## Archivos

- **motor.gs**: Script principal que inicializa y configura el sistema completo

## Funcionalidades

El Motor TryOnMe crea un prototipo funcional en Google Sheets con las siguientes hojas:

### 1. README
Hoja informativa con descripción del sistema y sus componentes.

### 2. Lists (Catálogos)
Contiene listas maestras para validaciones:
- **Styles**: 12 estilos de ropa (Clásico, Casual, Deportivo, etc.)
- **Colors**: 12 colores principales
- **GarmentTypes**: 14 tipos de prendas
- **FitPreferences**: 7 tipos de ajuste
- **Sex**: 5 opciones de género
- **OutputBuckets**: 5 categorías de salida
- **Climate**: 3 tipos de clima
- **Seasons**: 4 estaciones del año

### 3. Usuarios
Gestiona información de usuarios:
- Datos personales (nombre, email, edad)
- Datos físicos (altura, peso)
- Ubicación (ciudad, país, clima)
- Preferencias de estilo (3 estilos favoritos)
- Preferencias de color (2 colores favoritos)
- Tipos de prenda preferidos
- Ajuste preferido
- Consentimiento de datos
- Fecha de alta

### 4. Medidas
Almacena medidas corporales capturadas:
- ID de usuario
- Fecha de medición
- Medidas detalladas (pecho, cintura, cadera, piernas, brazos, hombros)
- Talla habitual
- Notas adicionales

### 5. Tendencias
Registra tendencias de moda:
- Keywords de búsqueda
- Etiquetas normalizadas
- Fuente y URL
- Ranking y repeticiones
- Volumen de búsqueda
- Notas

### 6. Reglas
Configuración del motor de recomendación:
- **Pesos** (suman 1.0):
  - peso_preferencias: 0.5 (preferencias personales)
  - peso_tendencias: 0.3 (tendencias externas)
  - peso_fitting: 0.2 (medidas y talla)
- **Cuotas** (total 20 resultados):
  - quota_personalizada: 5
  - quota_liveit: 5
  - quota_vvl: 2
  - quota_tryon: 3
  - quota_externa: 5

### 7. Recomendaciones
Resultados finales del motor (20 por usuario):
- Ranking de recomendaciones
- Información del producto (marca, nombre, tipo, color)
- Talla sugerida y precio
- URLs (producto e imagen)
- Categoría (bucket)
- Scores detallados
- Fecha de generación
- Notas

## Cómo usar

### Instalación

1. Abre o crea un nuevo Google Spreadsheet
2. Ve a **Extensiones** > **Apps Script**
3. Copia el contenido de `motor.gs` en el editor
4. Guarda el proyecto (Ctrl+S o Cmd+S)

### Uso

#### Método 1: Menú personalizado
1. Cierra y vuelve a abrir el Google Spreadsheet
2. Aparecerá un nuevo menú "Motor TryOnMe" en la barra superior
3. Haz clic en **Motor TryOnMe** > **Inicializar Motor**
4. Acepta los permisos que solicite Google (primera vez)

#### Método 2: Desde el editor de Apps Script
1. Ve a **Extensiones** > **Apps Script**
2. Selecciona la función `initTryOnMe` en el selector de funciones
3. Haz clic en el botón "Ejecutar" (▶)

### Funciones disponibles

#### `initTryOnMe()`
Función principal que:
- Elimina todas las hojas excepto la primera
- Crea las 7 hojas del sistema
- Configura encabezados y formatos
- Añade datos de ejemplo
- Aplica validaciones de datos

#### `addListValidation(sheet, range, sourceRange)`
Función auxiliar para crear listas desplegables con validación.

#### `generarRecomendaciones()`
Función placeholder para generar recomendaciones automáticas.
_(En desarrollo - actualmente muestra un mensaje informativo)_

#### `onOpen()`
Se ejecuta automáticamente al abrir el spreadsheet para crear el menú personalizado.

## Validaciones automáticas

El script configura validaciones de datos para asegurar consistencia:

- **Usuarios.sexo** → validado contra Lists.Sex
- **Usuarios.clima** → validado contra Lists.Climate
- **Usuarios.estilo_1/2/3** → validado contra Lists.Styles
- **Usuarios.color_1/2** → validado contra Lists.Colors
- **Usuarios.prenda_1/2** → validado contra Lists.GarmentTypes
- **Usuarios.ajuste_preferido** → validado contra Lists.FitPreferences
- **Recomendaciones.bucket** → validado contra Lists.OutputBuckets

## Próximos pasos

1. **Conectar formularios**: Vincular Google Forms para captura automática de datos
2. **Implementar generarRecomendaciones()**: Lógica de matching y scoring
3. **Integrar con API**: Conectar con catálogos de productos externos
4. **Dashboards**: Crear visualizaciones con Google Data Studio
5. **Migración**: Una vez validado, migrar a base de datos web

## Notas técnicas

- El script usa la API de Google Apps Script
- Las validaciones usan rangos nombrados para flexibilidad
- Los datos de ejemplo sirven como plantilla
- Es un prototipo funcional antes de migrar a producción

## Soporte

Para dudas o problemas:
1. Verifica los permisos de la cuenta de Google
2. Revisa la consola de Apps Script para errores
3. Consulta la documentación de Google Apps Script: https://developers.google.com/apps-script

## Licencia

Parte del proyecto TryOnMe - Ver LICENSE en el repositorio principal
