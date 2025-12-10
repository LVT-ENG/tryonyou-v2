const testRunnerGPT = {
  requirements: `requests
python-dotenv
pytest`,
  testSample: `def test_example():
    assert 1 + 1 == 2`,
  runScript: `#!/bin/bash

echo "🧪 Instalando dependencias..."
pip install -r requirements.txt

echo "🔍 Ejecutando tests..."
if [ -d "tests" ]; then
    pytest tests/
else
    echo "❌ Directorio 'tests/' no encontrado. Creando uno de ejemplo..."
    mkdir tests
    echo "def test_example():\n    assert 1 + 1 == 2" > tests/test_sample.py
    pytest tests/
fi`,
  instructions: `Este agente configura el entorno de pruebas para TRYONME.
✅ Crea un test mínimo en caso de que no existan.
✅ Compatible con ejecución en CI/CD o Codex.
✅ Ejecuta con: sh run_tests.sh`
};

module.exports = testRunnerGPT;
