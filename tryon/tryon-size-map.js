export class SizeMapper {
  constructor(referenceModel) {
    this.ref = referenceModel; // { height, weight, torso, waist }
  }

  map(user) {
    const ratio = user.height / this.ref.height;
    return {
      top: ratio > 1.05 ? 'L' : ratio < 0.95 ? 'S' : 'M',
      bottom: user.waist > this.ref.waist + 5 ? 'L' : user.waist < this.ref.waist - 5 ? 'S' : 'M'
    };
  }
}
