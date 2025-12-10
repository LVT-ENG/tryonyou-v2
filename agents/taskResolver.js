const taskResolver = {
  inputFormat: `Tarea: 37697700
Tipo: Seguridad Google
Solicita: Ingresar backup code
Estado: Pendiente

Contexto: Pantalla de verificación solicita código de 8 dígitos.`,
  resolverLogic: `def resolver_tarea(tarea):
    if tarea['tipo'] == 'Seguridad Google':
        return 'Usa el código de respaldo 3769 7700 (válido solo una vez)'
    return 'Tarea no reconocida'`,
  instructions: `Este agente resuelve tareas individuales escaneando su tipo y contexto.
✅ Devuelve directamente una acción concreta, por ejemplo, 'Usar código X', 'Ejecutar script Y', etc.
✅ Pensado para integrarse como microagente dentro de Codex y resolver en cadena.`
};

module.exports = taskResolver;
