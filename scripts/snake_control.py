"""Control básico para el sistema CRAWLER SNAKE."""

from dataclasses import dataclass

@dataclass
class SnakeState:
    position: float = 0.0
    speed: float = 0.0
    adhered: bool = True

class SnakeControl:
    def __init__(self):
        self.state = SnakeState()

    def move(self, distance: float):
        """Simula el desplazamiento horizontal o vertical."""
        self.state.position += distance
        self.state.speed = distance
        return self.state.position

    def apply_brake(self):
        """Detiene el motor."""
        self.state.speed = 0.0
        return self.state.speed

    def check_adherence(self, surface: str) -> bool:
        """Verifica la adherencia en la superficie indicada."""
        self.state.adhered = surface.lower() != "slick"
        return self.state.adhered
