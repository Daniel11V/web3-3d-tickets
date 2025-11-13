FROM node:20.18.0-alpine

WORKDIR /app

# 1. Copia solo los archivos de dependencias
COPY package.json package-lock.json* ./

# 2. Instala las dependencias
RUN npm install

# 3. Copia el código fuente
COPY . .

# 4. Define el comando
CMD ["npm", "run", "dev"]