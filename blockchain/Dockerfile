FROM node:20-alpine
WORKDIR /app

# Copiar solo 'package.json' para optimizar la caché de Docker
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# --- NUEVOS PASOS ---
# 1. Dar permisos de ejecución al script
RUN chmod +x /app/entrypoint.sh

# 2. Exponer el puerto del nodo Ethereum
EXPOSE 8545

# 3. Usar el script como punto de entrada
ENTRYPOINT ["/app/entrypoint.sh"]

# (El 'CMD' anterior se elimina, ya que 'ENTRYPOINT' lo reemplaza)