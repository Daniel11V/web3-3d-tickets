#!/bin/sh

# Ejecuta el deploy y luego (&&) inicia el nodo en el foreground.
# El proceso de deploy implícitamente espera a que el nodo esté listo.
npm run start