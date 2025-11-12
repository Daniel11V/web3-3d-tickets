FROM node:20-alpine

WORKDIR /app

# Install dependencies (cache)
COPY package.json package-lock.json* ./
RUN npm install

# Copy source
COPY . .

# Dev command (ts-node-dev) - container will run dev server
CMD ["npm", "run", "dev"]
DOCKER

# 6. Volver a la raíz
cd ..
