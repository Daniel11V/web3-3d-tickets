FROM node:20.18.0-alpine

WORKDIR /app

# 1. Copia solo los archivos de dependencias
COPY package.json package-lock.json* ./

# 2. Instala las dependencias
# Esto SÍ se cachea y solo se re-ejecuta si package.json cambia
RUN npm install

# 3. Define el comando (el COPY . . se elimina)
CMD ["npm", "run", "dev"]