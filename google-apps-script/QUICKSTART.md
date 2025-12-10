# Motor TryOnMe - Quick Start

## Uso rápido (Copy & Paste)

1. **Crea un nuevo Google Spreadsheet**
   - Ve a [sheets.google.com](https://sheets.google.com)
   - Haz clic en "+ Nuevo" o "Blank"

2. **Abre el editor de Apps Script**
   - Menú: **Extensiones** → **Apps Script**

3. **Copia el código**
   - Selecciona todo el contenido de `motor.gs` (Ctrl+A)
   - Cópialo (Ctrl+C)

4. **Pega en Apps Script**
   - Borra el código por defecto
   - Pega el código copiado (Ctrl+V)
   - Guarda (Ctrl+S)

5. **Ejecuta la inicialización**
   - Selecciona `initTryOnMe` en el menú desplegable de funciones
   - Haz clic en el botón ▶ (Ejecutar)
   - Autoriza los permisos cuando se solicite

6. **¡Listo!**
   - Vuelve a tu spreadsheet
   - Verás las 7 hojas creadas
   - Recarga la página para ver el menú "Motor TryOnMe"

## Estructura de datos

### Hoja: Usuarios
```
user_id | nombre | email | sexo | edad | altura_cm | peso_kg | ciudad | pais | clima | estilo_1 | estilo_2 | estilo_3 | color_1 | color_2 | prenda_1 | prenda_2 | ajuste_preferido | consentimiento_datos | fecha_alta
```

### Hoja: Medidas
```
user_id | fecha_medida | pecho_cm | cintura_cm | cadera_cm | largo_pierna_cm | largo_brazo_cm | hombros_cm | talla_habitual | notas
```

### Hoja: Tendencias
```
fecha | keyword | etiqueta_normalizada | fuente_url | dominio | posicion_rank | repeticiones | volumen_busqueda | nota
```

### Hoja: Reglas
```
parametro | valor | descripcion
peso_preferencias | 0.5 | Peso del match con gustos personales (0–1)
peso_tendencias | 0.3 | Peso del match con tendencias externas (0–1)
peso_fitting | 0.2 | Peso del match por medidas y talla (0–1)
quota_personalizada | 5 | Número de resultados personalizados
quota_liveit | 5 | Número de resultados Live 'it
quota_vvl | 2 | Número de resultados Vvl
quota_tryon | 3 | Número de resultados TryOn (Dropset)
quota_externa | 5 | Número de resultados Externa (E-commerce)
```

### Hoja: Recomendaciones
```
user_id | rank | prenda_id | marca | nombre_prenda | tipo_prenda | color_principal | talla_sugerida | precio | url_producto | url_imagen | bucket | score_total | score_preferencias | score_tendencias | score_fitting | fecha_generada | notas
```

## Casos de uso

### 1. Capturar nuevo usuario
1. Ve a la hoja "Usuarios"
2. Añade una nueva fila con sus datos
3. Las listas desplegables te ayudarán con los valores válidos

### 2. Registrar medidas
1. Ve a la hoja "Medidas"
2. Añade el `user_id` correspondiente
3. Ingresa las medidas corporales

### 3. Actualizar tendencias
1. Ve a la hoja "Tendencias"
2. Añade nuevas keywords de moda
3. Normaliza las etiquetas para facilitar el matching

### 4. Ajustar reglas
1. Ve a la hoja "Reglas"
2. Modifica los pesos (deben sumar 1.0)
3. Ajusta las cuotas según tus necesidades

### 5. Ver recomendaciones
1. Ve a la hoja "Recomendaciones"
2. Filtra por `user_id` para ver las recomendaciones de un usuario
3. Ordena por `score_total` para ver las mejores matches

## Automatizaciones recomendadas

### Conectar con Google Forms
Para captura automática de usuarios:

```javascript
function onFormSubmit(e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName('Usuarios');
  
  // Mapear respuestas del formulario a columnas
  const values = e.namedValues;
  usuarios.appendRow([
    generateUserId(),
    values['Nombre'][0],
    values['Email'][0],
    values['Sexo'][0],
    values['Edad'][0],
    values['Altura'][0],
    values['Peso'][0],
    values['Ciudad'][0],
    values['País'][0],
    values['Clima'][0],
    values['Estilo 1'][0],
    values['Estilo 2'][0],
    values['Estilo 3'][0],
    values['Color 1'][0],
    values['Color 2'][0],
    values['Prenda 1'][0],
    values['Prenda 2'][0],
    values['Ajuste'][0],
    'Sí',
    new Date()
  ]);
}

function generateUserId() {
  return 'u_' + Date.now().toString(36);
}
```

### Trigger diario para análisis
```javascript
function setupDailyTrigger() {
  ScriptApp.newTrigger('generarRecomendaciones')
    .timeBased()
    .everyDays(1)
    .atHour(2) // 2 AM
    .create();
}
```

## Validaciones de datos

El script crea automáticamente listas desplegables para:
- Sexo (Usuarios.sexo)
- Clima (Usuarios.clima)
- Estilos (Usuarios.estilo_1/2/3)
- Colores (Usuarios.color_1/2)
- Tipos de prenda (Usuarios.prenda_1/2)
- Ajuste (Usuarios.ajuste_preferido)
- Bucket (Recomendaciones.bucket)

Esto previene errores de entrada de datos y facilita el análisis.

## Exportar datos

### A CSV
1. Selecciona la hoja que quieres exportar
2. Menú: **Archivo** → **Descargar** → **Valores separados por comas (.csv)**

### A JSON (via Apps Script)
```javascript
function exportToJSON() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const usuarios = ss.getSheetByName('Usuarios');
  const data = usuarios.getDataRange().getValues();
  const headers = data[0];
  const rows = data.slice(1);
  
  const json = rows.map(row => {
    const obj = {};
    headers.forEach((header, i) => {
      obj[header] = row[i];
    });
    return obj;
  });
  
  Logger.log(JSON.stringify(json, null, 2));
}
```

## Solución rápida de problemas

| Problema | Solución |
|----------|----------|
| "No se puede ejecutar el script" | Autoriza los permisos en la primera ejecución |
| "Límite de ejecución excedido" | El script tarda más de 6 min - divide en partes |
| Las listas desplegables no funcionan | Verifica que la hoja "Lists" existe |
| El menú no aparece | Recarga el spreadsheet (F5) |
| Error al borrar hojas | Asegúrate de tener al menos una hoja antes de ejecutar |

## Próximos pasos

1. ✅ Inicializar el motor con `initTryOnMe()`
2. ✅ Añadir usuarios de prueba
3. ✅ Registrar algunas medidas
4. ✅ Actualizar tendencias
5. ⬜ Implementar lógica de `generarRecomendaciones()`
6. ⬜ Conectar con APIs de productos
7. ⬜ Crear dashboard de visualización
8. ⬜ Migrar a base de datos cuando escale

## Recursos

- [Documentación completa](README.md)
- [Guía de despliegue](DEPLOYMENT.md)
- [Apps Script Reference](https://developers.google.com/apps-script/reference/spreadsheet)
- [Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet/spreadsheet-app)

## Soporte

¿Preguntas? Abre un issue en el repositorio principal de TryOnMe.
