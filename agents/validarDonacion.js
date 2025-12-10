const validarDonacion = {
  description: 'Evalúa si una prenda debe donarse según su uso y estado.',
  validate: prenda => prenda.usada && prenda.estado === 'bueno',
  instructions: 'Automatiza la lógica de donación de ropa conectando con bases de datos mediante Make.com.'
};

module.exports = validarDonacion;
