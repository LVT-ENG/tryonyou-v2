# Monitorización de Errores y Estabilidad

Se añadió un registro global de errores en `server.js` para evitar parones inesperados.
Los fallos no capturados y las promesas rechazadas se guardan en `system_errors.log`.

## Cómo funciona
- El servidor escribe la fecha y el mensaje de error en `system_errors.log`.
- Los endpoints también utilizan `logError()` en sus bloques `catch`.
- El proceso continúa en lugar de detenerse por excepciones no controladas.

## Uso
1. Ejecuta `node server.js` como de costumbre.
2. Revisa `system_errors.log` si detectas comportamiento anómalo.
3. Reinicia manualmente solo si los errores se repiten.

Este mecanismo ayuda a estabilizar el sistema y reducir los parones ("D’espolla").
