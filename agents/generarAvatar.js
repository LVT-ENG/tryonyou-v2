const generarAvatar = {
  description: 'Crea un avatar 3D básico a partir de medidas de usuario.',
  generate: medidas => {
    if (!medidas) return null;
    return { ...medidas, avatar: true };
  },
  instructions: 'Ideal para integrarlo en flujos automáticos desde Make.com y publicar en Vercel.'
};

module.exports = generarAvatar;
