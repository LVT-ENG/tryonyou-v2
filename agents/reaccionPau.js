const reaccionPau = {
  description: 'Genera una reacción de Pau basada en las elecciones del usuario.',
  react: decision => {
    const mensajes = {
      bien: '¡Genial elección!',
      mal: 'Quizás prefieras otra prenda.'
    };
    return mensajes[decision] || '¡Vamos a probar!';
  },
  instructions: 'Puede enlazarse con Automa para enviar feedback emocional inmediato.'
};

module.exports = reaccionPau;
