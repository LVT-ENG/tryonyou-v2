// Agente de simulación física para CRAWLER SNAKE
// Calcula trayectoria y responde a errores básicos

export class SnakeSimulationAgent {
  constructor() {
    this.position = 0;
  }

  move(distance) {
    this.position += distance;
    return this.position;
  }

  recoverFromError() {
    this.position = 0;
    return 'reset';
  }
}
