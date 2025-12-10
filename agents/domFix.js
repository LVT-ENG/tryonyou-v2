const domFix = {
  descripcion: `Escanea el entorno de ejecución y protege llamadas peligrosas al DOM`,
  codigo: `function safeDomExecution(callback) {\n  if (typeof window !== 'undefined' && typeof document !== 'undefined') {\n    callback();\n  }\n}`,
  ejemplo: `safeDomExecution(() => {\n  const element = document.getElementById('miElemento');\n  if (element) {\n    element.style.backgroundColor = 'red';\n    console.log('Estilo aplicado correctamente.');\n  } else {\n    console.warn('Elemento no encontrado.');\n  }\n});`
};

module.exports = domFix;
