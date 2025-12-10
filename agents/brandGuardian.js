const brandGuardian = {
  bannedWords: ['gratis', '100%'],
  descripcion: `Valida que el contenido mantenga la identidad de marca y evita terminos no permitidos`,
  validate(text) {
    return !this.bannedWords.some(w => text.toLowerCase().includes(w));
  },
  ejemplo: `brandGuardian.validate('Descuento 100%') // -> false`
};

module.exports = brandGuardian;
