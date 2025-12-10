# Instrucciones para generar el archivo ZIP de entrega

Sigue estos pasos para comprimir todo el directorio `LiveIT_Tryon_Export` y obtener un paquete listo para enviar.

1. Abre una terminal y navega hasta la carpeta donde se encuentra `LiveIT_Tryon_Export`.
2. Ejecuta el comando:

   ```bash
   zip -r LiveIT_Tryon_Export.zip LiveIT_Tryon_Export
   ```

   Este comando crea el archivo `LiveIT_Tryon_Export.zip` con todo el contenido interno.
3. Comprueba que el ZIP contenga los directorios `01_Web/`, `02_App_Tryon/`, `03_Productos/`, `04_Documentación/`, `05_Material_Publicitario/` y `06_ZIPs_para_entrega/`.

El archivo resultante puede compartirse por correo, subirlo a un servicio de almacenamiento o utilizarse como respaldo de todo el proyecto.
