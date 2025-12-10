#!/bin/bash
# Carga variables de entorno solo si existe el archivo .env
if [ -f .env ]; then
  export $(grep -v '^#' .env | xargs)
fi
node index.js
