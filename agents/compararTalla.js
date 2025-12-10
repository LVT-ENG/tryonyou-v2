const compararTalla = {
  description: 'Compara medidas del usuario con la base de datos de tallas y devuelve la más cercana.',
  compare: (medidas, base) => {
    // Lógica simplificada de comparación de tallas
    if (!medidas || !base) return null;
    return base.find(t => t.id === medidas.id) || base[0];
  },
  instructions: 'Integrado con Automa (Make.com) para automatizar la comparación de medidas y sugerir tallas.'
};

module.exports = compararTalla;
