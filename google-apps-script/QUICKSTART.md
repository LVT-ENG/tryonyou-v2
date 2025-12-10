# Guía Rápida - Motor TryOnMe

Esta guía te ayudará a poner en marcha el Motor TryOnMe en pocos minutos.

## 🚀 Inicio Rápido (Google Sheets)

### Paso 1: Crear el Motor en Google Sheets

1. Abre [Google Sheets](https://sheets.google.com)
2. Crea una nueva hoja de cálculo vacía
3. Dale un nombre, por ejemplo: "Motor TryOnMe - Producción"
4. Ve a **Extensiones > Apps Script**
5. Borra el código que aparece por defecto
6. Copia y pega el contenido completo de `Motor.gs`
7. En el panel izquierdo, haz clic en el ícono de configuración (⚙️)
8. Busca "appsscript.json" en la lista de archivos
9. Reemplaza su contenido con el de nuestro `appsscript.json`
10. Guarda todo (Ctrl+S o Cmd+S)
11. Cierra el editor de Apps Script

### Paso 2: Ejecutar la Inicialización

1. Vuelve a tu hoja de Google Sheets
2. Recarga la página (F5 o Cmd+R)
3. Espera unos segundos - verás aparecer un nuevo menú: "TryOnMe Motor"
4. Haz clic en **TryOnMe Motor > Inicializar Motor**
5. Google te pedirá permisos la primera vez:
   - Haz clic en "Revisar permisos"
   - Selecciona tu cuenta de Google
   - Haz clic en "Avanzado" si aparece una advertencia
   - Haz clic en "Ir a Motor TryOnMe (no seguro)"
   - Haz clic en "Permitir"
6. Vuelve a hacer clic en **TryOnMe Motor > Inicializar Motor**
7. ¡Listo! Verás un mensaje de confirmación

### Paso 3: Explorar las Hojas Creadas

Ahora tendrás 7 pestañas:

1. **README** - Documentación e instrucciones
2. **Lists** - Catálogos de valores (estilos, colores, etc.)
3. **Usuarios** - Perfil de usuarios con datos de ejemplo
4. **Medidas** - Medidas corporales de ejemplo
5. **Tendencias** - Tendencias de moda de ejemplo
6. **Reglas** - Parámetros del algoritmo de recomendación
7. **Recomendaciones** - Resultados finales de ejemplo

## 📝 Agregar Datos

### Agregar un Usuario

1. Ve a la pestaña **Usuarios**
2. Agrega una nueva fila con los datos:
   - `user_id`: un ID único (ej: "u_0002")
   - `nombre`: nombre completo
   - `email`: correo electrónico
   - `sexo`: elige de la lista desplegable
   - `edad`, `altura_cm`, `peso_kg`: datos demográficos
   - `ciudad`, `pais`, `clima`: ubicación
   - `estilo_1`, `estilo_2`, `estilo_3`: elige de la lista
   - `color_1`, `color_2`: colores favoritos (lista)
   - `prenda_1`, `prenda_2`: tipos de prenda (lista)
   - `ajuste_preferido`: elige de la lista
   - `consentimiento_datos`: "Sí" o "No"
   - `fecha_alta`: se auto-completa

### Agregar Medidas

1. Ve a la pestaña **Medidas**
2. Agrega una fila con:
   - `user_id`: mismo ID del usuario
   - Las medidas corporales en centímetros
   - `talla_habitual`: talla que normalmente usa
   - `notas`: observaciones opcionales

### Modificar Reglas del Motor

1. Ve a la pestaña **Reglas**
2. Modifica los valores según necesites:
   - `peso_preferencias`: 0-1 (importancia de gustos personales)
   - `peso_tendencias`: 0-1 (importancia de tendencias)
   - `peso_fitting`: 0-1 (importancia de medidas)
   - `quota_*`: número de resultados por categoría

**Importante:** La suma de los tres pesos debe ser 1.0

## 🔌 Integración con Node.js

### Paso 1: Configurar Credenciales de Google

1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o selecciona uno existente
3. Habilita la API de Google Sheets:
   - Busca "Google Sheets API"
   - Haz clic en "Habilitar"
4. Crea una cuenta de servicio:
   - Ve a "Credenciales"
   - Haz clic en "Crear credenciales"
   - Selecciona "Cuenta de servicio"
   - Dale un nombre (ej: "motor-tryonme")
   - Haz clic en "Crear y continuar"
   - Rol: "Editor" (para poder leer y escribir)
   - Haz clic en "Continuar" y luego en "Listo"
5. Descarga la clave JSON:
   - Haz clic en la cuenta de servicio que acabas de crear
   - Ve a la pestaña "Claves"
   - Haz clic en "Agregar clave" > "Crear nueva clave"
   - Selecciona "JSON" y haz clic en "Crear"
   - Se descargará un archivo JSON

### Paso 2: Compartir la Hoja con la Cuenta de Servicio

1. Abre el archivo JSON descargado
2. Copia el valor de `client_email` (termina en @...gserviceaccount.com)
3. En tu hoja de Google Sheets, haz clic en "Compartir"
4. Pega el email de la cuenta de servicio
5. Dale permisos de "Editor"
6. Desmarca "Notificar a las personas"
7. Haz clic en "Compartir"

### Paso 3: Configurar el Proyecto Node.js

```bash
# En el directorio del proyecto
cd google-apps-script

# Instalar dependencias
npm install googleapis dotenv

# Crear directorio para credenciales
mkdir -p credentials

# Copiar el archivo JSON descargado
cp ~/Downloads/tu-archivo-de-credenciales.json credentials/google-service-account.json

# Crear archivo .env
cp .env.example .env
```

Edita el archivo `.env`:
```env
MOTOR_SPREADSHEET_ID=tu_id_de_hoja_aqui
GOOGLE_CREDENTIALS_PATH=./credentials/google-service-account.json
```

Para obtener el `MOTOR_SPREADSHEET_ID`:
- Abre tu hoja de Google Sheets
- Mira la URL: `https://docs.google.com/spreadsheets/d/ESTE_ES_EL_ID/edit`
- Copia ese ID

### Paso 4: Probar la Conexión

```bash
node GoogleSheetsMotor.js
```

Deberías ver:
```
✓ Google Sheets Motor conectado correctamente

--- Usuarios ---
Total: 1
{ user_id: 'u_0001', nombre: 'Ejemplo Nombre', ... }

--- Reglas ---
{ peso_preferencias: 0.5, peso_tendencias: 0.3, ... }

...
```

## 📊 Ejemplos de Uso en Node.js

### Leer Recomendaciones de un Usuario

```javascript
const GoogleSheetsMotor = require('./GoogleSheetsMotor');

async function obtenerRecomendaciones(userId) {
  const motor = new GoogleSheetsMotor();
  await motor.initialize();
  
  const recomendaciones = await motor.leerRecomendaciones(userId);
  console.log(`Recomendaciones para ${userId}:`, recomendaciones);
  return recomendaciones;
}

obtenerRecomendaciones('u_0001');
```

### Agregar un Nuevo Usuario desde la App

```javascript
const GoogleSheetsMotor = require('./GoogleSheetsMotor');

async function registrarUsuario(datos) {
  const motor = new GoogleSheetsMotor();
  await motor.initialize();
  
  // Generar ID único
  const userId = `u_${Date.now()}`;
  
  const usuario = {
    user_id: userId,
    nombre: datos.nombre,
    email: datos.email,
    sexo: datos.sexo,
    edad: datos.edad,
    altura_cm: datos.altura,
    peso_kg: datos.peso,
    ciudad: datos.ciudad,
    pais: datos.pais,
    clima: datos.clima,
    estilo_1: datos.estilos[0],
    estilo_2: datos.estilos[1],
    estilo_3: datos.estilos[2],
    color_1: datos.colores[0],
    color_2: datos.colores[1],
    prenda_1: datos.prendas[0],
    prenda_2: datos.prendas[1],
    ajuste_preferido: datos.ajuste,
    consentimiento_datos: 'Sí'
  };
  
  await motor.agregarUsuario(usuario);
  return userId;
}

// Ejemplo de uso
registrarUsuario({
  nombre: 'María García',
  email: 'maria@example.com',
  sexo: 'Mujer',
  edad: 25,
  altura: 165,
  peso: 58,
  ciudad: 'Madrid',
  pais: 'España',
  clima: 'Templado',
  estilos: ['Minimalista', 'Casual / Informal', 'Elegante / Chic'],
  colores: ['Negro', 'Beige'],
  prendas: ['Pantalón', 'Camisa'],
  ajuste: 'Regular'
});
```

### Guardar Medidas del Scanner TryOn

```javascript
const GoogleSheetsMotor = require('./GoogleSheetsMotor');

async function guardarMedidas(userId, medidas) {
  const motor = new GoogleSheetsMotor();
  await motor.initialize();
  
  const datos = {
    user_id: userId,
    pecho_cm: medidas.pecho,
    cintura_cm: medidas.cintura,
    cadera_cm: medidas.cadera,
    largo_pierna_cm: medidas.largoPierna,
    largo_brazo_cm: medidas.largoBrazo,
    hombros_cm: medidas.hombros,
    talla_habitual: medidas.tallaHabitual,
    notas: 'Capturado con scanner móvil'
  };
  
  await motor.agregarMedidas(datos);
  console.log(`Medidas guardadas para ${userId}`);
}

// Ejemplo
guardarMedidas('u_0001', {
  pecho: 92,
  cintura: 70,
  cadera: 98,
  largoPierna: 102,
  largoBrazo: 60,
  hombros: 42,
  tallaHabitual: 'M'
});
```

## 🔄 Siguientes Pasos

1. **Poblar con datos reales**: Agrega usuarios y medidas reales desde tu app
2. **Conectar con Shopify**: Importa productos para generar recomendaciones
3. **Implementar algoritmo**: Crea un script que calcule `match_score` automáticamente
4. **Migrar a base de datos**: Cuando escales, migra a PostgreSQL o MongoDB
5. **Dashboard visual**: Conecta con Google Data Studio para visualizaciones

## 🆘 Solución de Problemas

### Error: "No se puede encontrar el archivo de credenciales"
- Verifica que la ruta en `.env` sea correcta
- Asegúrate de que el archivo JSON existe en esa ubicación

### Error: "The caller does not have permission"
- Verifica que compartiste la hoja con el email de la cuenta de servicio
- Dale permisos de "Editor", no solo "Viewer"

### Error: "Cannot find module 'googleapis'"
- Ejecuta: `npm install googleapis dotenv`

### Las listas desplegables no funcionan
- Verifica que la hoja "Lists" existe y tiene datos
- Ejecuta nuevamente "Inicializar Motor" desde el menú

## 📞 Soporte

Para más ayuda, consulta:
- [README principal](./README.md)
- [Documentación del proyecto](../README.md)
- Abre un issue en GitHub

---

¡Feliz prototipado! 🚀
