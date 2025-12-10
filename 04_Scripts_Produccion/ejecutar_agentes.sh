#!/bin/bash
# Ejecuta todos los agentes inteligentes en produccion
export $(grep -v '^#' .env | xargs 2>/dev/null)
node index.js
