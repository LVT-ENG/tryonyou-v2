export class AvatarRenderer {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, this.canvas.width / this.canvas.height, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas });
    this.renderer.setSize(this.canvas.width, this.canvas.height);
    this.model = null;
  }

  loadModel(url) {
    const loader = new THREE.GLTFLoader();
    loader.load(url, gltf => {
      this.model = gltf.scene;
      this.scene.add(this.model);
      this.camera.position.z = 5;
      this.animate();
    });
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.model) this.model.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
