export class BodyScanner {
  static startScan(videoEl, onData) {
    navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
      videoEl.srcObject = stream;
      videoEl.play();
      const interval = setInterval(() => {
        const width = videoEl.videoWidth;
        const height = videoEl.videoHeight;
        onData({ width, height, timestamp: Date.now() });
      }, 1000);
      return () => clearInterval(interval);
    });
  }
}
