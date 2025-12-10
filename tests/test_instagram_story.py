import importlib.util
import sys
import types
from pathlib import Path


def test_generar_texto_story():
    requests_stub = types.ModuleType("requests")
    requests_stub.post = lambda *a, **k: types.SimpleNamespace(status_code=200, json=lambda: {})
    sys.modules['requests'] = requests_stub

    spec = importlib.util.spec_from_file_location('instagram_story', Path('scripts/instagram_story.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)

    caption = mod.generar_texto_story('Chaqueta Cubista', 219)
    assert 'Chaqueta Cubista' in caption
    assert '219' in caption
    assert caption.startswith('🔥 Disponible ya:')
