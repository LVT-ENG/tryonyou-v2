export class ARMode {
  static async initAR() {
    if (!navigator.xr) throw new Error('AR not supported');
    const session = await navigator.xr.requestSession('immersive-ar', { requiredFeatures: ['hit-test'] });
    console.log('[AR] Session started:', session);
    return session;
  }
}
