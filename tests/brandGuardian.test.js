const brandGuardian = require('../agents/brandGuardian');

describe('brandGuardian validate', () => {
  test('rejects banned words', () => {
    expect(brandGuardian.validate('Oferta 100% gratis')).toBe(false);
  });

  test('allows acceptable text', () => {
    expect(brandGuardian.validate('Nuevo lanzamiento premium')).toBe(true);
  });
});
