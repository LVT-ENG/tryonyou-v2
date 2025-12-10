#!/bin/bash
export $(grep -v '^#' .env | xargs)
node index.js
