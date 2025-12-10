export class PhysioFitter {
  constructor() {
    this.adjustments = {};
  }

  adapt(userMeasures, garmentShape) {
    return {
      shoulderFit: userMeasures.shoulders > garmentShape.shoulders ? 'tight' : 'loose',
      torsoFit: userMeasures.torso === garmentShape.torso ? 'perfect' : 'adjusted'
    };
  }
}
