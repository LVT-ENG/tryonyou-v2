from scripts.snake_control import SnakeControl


def test_move_updates_position():
    snake = SnakeControl()
    assert snake.move(5) == 5


def test_apply_brake_stops_motor():
    snake = SnakeControl()
    snake.move(3)
    assert snake.apply_brake() == 0


def test_check_adherence():
    snake = SnakeControl()
    assert snake.check_adherence("rough") is True
    assert snake.check_adherence("slick") is False
