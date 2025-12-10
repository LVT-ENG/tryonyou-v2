import subprocess
from pathlib import Path


def test_export_exists():
    script_path = Path('scripts/tryonme_sistema_completo.js').resolve()
    cmd = [
        'node',
        '-e',
        f"import('{script_path.as_uri()}').then(m => console.log(typeof m.tryonmeSistemaCompleto))"
    ]
    output = subprocess.check_output(cmd, text=True).strip()
    last_line = output.splitlines()[-1]
    assert last_line == 'function'
