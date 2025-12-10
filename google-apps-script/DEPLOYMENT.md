# Guía de Despliegue - Motor TryOnMe

Esta guía explica cómo desplegar el Motor TryOnMe en Google Sheets usando Google Apps Script.

## Requisitos previos

- Cuenta de Google
- Acceso a Google Sheets
- Acceso a Google Apps Script

## Método 1: Despliegue manual (Recomendado para principiantes)

### Paso 1: Crear el Spreadsheet
1. Ve a [Google Sheets](https://sheets.google.com)
2. Crea un nuevo spreadsheet
3. Nómbralo "Motor TryOnMe"

### Paso 2: Abrir el editor de Apps Script
1. En el spreadsheet, ve a **Extensiones** > **Apps Script**
2. Se abrirá una nueva pestaña con el editor de código

### Paso 3: Configurar el proyecto
1. Elimina el código por defecto en `Code.gs`
2. Copia todo el contenido del archivo `motor.gs` de este repositorio
3. Pégalo en el editor
4. Guarda el proyecto (Ctrl+S o Cmd+S)
5. Nombra el proyecto como "Motor TryOnMe"

### Paso 4: Configurar el manifiesto (Opcional)
1. En el editor, haz clic en el icono de configuración (⚙️) en la barra lateral
2. Selecciona **Configuración del proyecto**
3. En la pestaña "Configuración", verifica que:
   - Versión de ejecución: V8
   - Zona horaria: Tu zona horaria local

### Paso 5: Ejecutar la inicialización
1. En el editor, selecciona la función `initTryOnMe` en el menú desplegable
2. Haz clic en el botón "Ejecutar" (▶)
3. La primera vez, Google te pedirá autorización:
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado"
   - Haz clic en "Ir a Motor TryOnMe (no seguro)"
   - Haz clic en "Permitir"
4. Espera a que termine la ejecución (verás un mensaje de éxito)

### Paso 6: Verificar la instalación
1. Vuelve a tu spreadsheet
2. Deberías ver las siguientes hojas:
   - README
   - Lists
   - Usuarios
   - Medidas
   - Tendencias
   - Reglas
   - Recomendaciones
3. Recarga la página del spreadsheet
4. Deberías ver un nuevo menú "Motor TryOnMe" en la barra superior

## Método 2: Despliegue con clasp (Para desarrolladores)

[clasp](https://github.com/google/clasp) es la herramienta de línea de comandos de Google para Apps Script.

### Instalación de clasp
```bash
npm install -g @google/clasp
```

### Login
```bash
clasp login
```

### Crear proyecto
```bash
cd google-apps-script
clasp create --type sheets --title "Motor TryOnMe"
```

### Push del código
```bash
clasp push
```

### Abrir en el navegador
```bash
clasp open
```

### Ejecutar la función
Desde el editor web o usando:
```bash
clasp run initTryOnMe
```

## Método 3: Clonar spreadsheet existente

Si alguien ya ha creado un Motor TryOnMe:

1. Solicita acceso al spreadsheet
2. Haz una copia: **Archivo** > **Crear una copia**
3. El script se copiará automáticamente
4. Puedes usar tu copia de forma independiente

## Uso diario

### Inicializar desde el menú
1. Abre tu spreadsheet
2. Ve a **Motor TryOnMe** > **Inicializar Motor**
3. Confirma que deseas reiniciar (esto borrará datos existentes)

### Agregar usuarios
1. Ve a la hoja "Usuarios"
2. Agrega una nueva fila con los datos del usuario
3. Las columnas con listas desplegables se validarán automáticamente

### Agregar medidas
1. Ve a la hoja "Medidas"
2. Ingresa las medidas del usuario
3. Asocia con el `user_id` correspondiente

### Registrar tendencias
1. Ve a la hoja "Tendencias"
2. Agrega keywords de búsqueda y su información
3. Normaliza las etiquetas según sea necesario

### Ajustar reglas
1. Ve a la hoja "Reglas"
2. Modifica los pesos y cuotas según tus necesidades
3. Asegúrate de que los pesos sumen 1.0

### Ver recomendaciones
1. Ve a la hoja "Recomendaciones"
2. Aquí aparecerán las recomendaciones generadas
3. Puedes filtrar por usuario o por bucket

## Conectar con Google Forms

Para automatizar la captura de datos:

1. Crea un Google Form vinculado
2. Ve a **Respuestas** > **Ver respuestas en Sheets**
3. En el script, configura un trigger:
   - Ve a **Extensiones** > **Apps Script**
   - Haz clic en el icono de reloj (⏰) en la barra lateral
   - Haz clic en **+ Agregar trigger**
   - Configura:
     - Función: `procesarNuevaRespuesta`
     - Origen del evento: Desde spreadsheet
     - Tipo de evento: Al enviar formulario

## Solución de problemas

### Error: "No se puede ejecutar el script"
- Verifica que hayas autorizado los permisos
- Intenta cerrar sesión y volver a autorizar

### Error: "Límite de ejecución excedido"
- El script tarda más de 6 minutos (límite de Google)
- Divide la operación en partes más pequeñas

### Las listas desplegables no funcionan
- Verifica que la hoja "Lists" existe
- Comprueba que los rangos de validación sean correctos

### El menú personalizado no aparece
- Recarga el spreadsheet (F5 o Cmd+R)
- Verifica que la función `onOpen()` existe en el script

## Seguridad y permisos

- El script solo accede al spreadsheet actual
- No envía datos a servicios externos
- Los datos permanecen en tu Google Drive
- Puedes revocar permisos en cualquier momento desde tu [cuenta de Google](https://myaccount.google.com/permissions)

## Migración a producción

Una vez validado el prototipo:

1. Exporta los datos a CSV
2. Importa a una base de datos (PostgreSQL, MySQL, MongoDB)
3. Crea una API REST (Node.js, Python, etc.)
4. Desarrolla un dashboard web
5. Mantén este spreadsheet como backup o para pruebas

## Recursos adicionales

- [Documentación de Google Apps Script](https://developers.google.com/apps-script)
- [Referencia de Spreadsheet Service](https://developers.google.com/apps-script/reference/spreadsheet)
- [Guía de clasp](https://github.com/google/clasp)
- [Comunidad de Apps Script](https://support.google.com/docs/community)

## Contribuir

Para reportar bugs o sugerir mejoras:
1. Abre un issue en el repositorio principal
2. Describe el problema o la mejora
3. Incluye capturas de pantalla si es posible

## Changelog

### v1.0.0 (2025-01-27)
- Implementación inicial del Motor TryOnMe
- 7 hojas configuradas (README, Lists, Usuarios, Medidas, Tendencias, Reglas, Recomendaciones)
- Validaciones automáticas de datos
- Menú personalizado
- Datos de ejemplo
