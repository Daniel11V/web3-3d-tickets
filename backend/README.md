# Web3 3D Tickets – Backend

API de GraphQL del proyecto **Web3 3D Tickets**, construida con **Node.js**, **TypeScript**, **Apollo Server** y **MongoDB**.

Provee la API para la lógica de negocio (eventos y tickets), actuando como una capa de metadatos que se complementa con la lógica on-chain (manejada por el nodo de Hardhat y el frontend).

---

## 🚀 Tecnologías principales

- **Node.js** – entorno de ejecución.
- **TypeScript** – tipado estático.
- **Apollo Server v3** – implementación del servidor GraphQL.
- **Mongoose (MongoDB)** – base de datos NoSQL para los metadatos.
- **Docker** – contenedor de entorno.

---

## 📁 Estructura del proyecto

````

backend/
│
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env.example
│
├── src/
│   ├── index.ts                \# Punto de entrada principal
│   ├── schema.ts               \# Schema GraphQL
│   ├── resolvers/              \# Resolvers (lógica de queries/mutations)
│   └── db/
│       ├── index.ts            \# Conexión a MongoDB
│       └── models/             \# Modelos de Mongoose (Event, Ticket)

```

---

## ⚙️ Configuración y Ejecución

Este servicio está diseñado para ser levantado por el `docker-compose.yml` en la raíz del proyecto (usando `npm start`).

Las variables de entorno requeridas se configuran para conectar con los otros contenedores Docker:

```

# Conecta al servicio 'db' de Docker Compose

MONGODB\_URI=mongodb://db:27017/web3tickets
PORT=4000

```

---

## 🧠 Notas de Arquitectura

-   Este backend **no** interactúa directamente con la blockchain.
-   Su rol es **servir metadatos** (lista de eventos) al frontend.
-   Recibe la mutación `createTicket` *después* de que el frontend (Wagmi) ha confirmado una transacción on-chain en la red Hardhat.
-   Guarda el registro de propiedad (ej. `userId` (address) + `eventId` + `tokenId`) en la base de datos MongoDB.

---

## 📜 Licencia

MIT © 2025 – Desarrollado por Daniel Vinet
````
