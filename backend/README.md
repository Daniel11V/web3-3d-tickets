# Web3 3D Tickets – Backend

Backend del proyecto **Web3 3D Tickets**, construido con **Node.js**, **TypeScript**, **Apollo Server (GraphQL)** y **PostgreSQL**.  
Provee la API GraphQL para gestionar eventos y tickets 3D conectados a la capa Web3 del frontend.

---

## 🚀 Tecnologías principales

- **Node.js** – entorno de ejecución.
- **TypeScript** – tipado estático y soporte moderno de ES.
- **Apollo Server v3** – implementación del servidor GraphQL.
- **PostgreSQL (pg)** – base de datos relacional.
- **Docker** – contenedor de entorno para desarrollo y despliegue.
- **dotenv** – manejo de variables de entorno.

---

## 📁 Estructura del proyecto

```
backend/
│
├── Dockerfile
├── package.json
├── tsconfig.json
├── .env
│
├── src/
│   ├── index.ts                # Punto de entrada principal del servidor
│   ├── schema.ts               # Definición del schema GraphQL
│
│   ├── resolvers/              # Resolvers GraphQL
│   │   ├── eventResolvers.ts   # Lógica de eventos
│   │   └── ticketResolvers.ts  # Lógica de tickets
│
│   ├── db/                     # Conexión y modelos de base de datos
│   │   ├── index.ts            # Configuración de conexión a PostgreSQL
│   │   └── models.ts           # Definición de tablas y relaciones
│
│   └── utils/
│       └── seed.ts             # Script para popular datos iniciales
```

---

## ⚙️ Configuración inicial

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/tuusuario/web3-3d-tickets.git
cd web3-3d-tickets/backend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar variables de entorno

Crear un archivo `.env` en la raíz del backend con el siguiente formato:

```
DATABASE_URL=postgresql://usuario:contraseña@localhost:5432/web3tickets
PORT=4000
```

---

## 🧱 Scripts disponibles

| Comando         | Descripción                                                        |
| --------------- | ------------------------------------------------------------------ |
| `npm run dev`   | Ejecuta el servidor en modo desarrollo con `ts-node-dev`.          |
| `npm run build` | Compila TypeScript a JavaScript en la carpeta `dist/`.             |
| `npm start`     | Ejecuta el servidor compilado (usado en producción).               |
| `npm run seed`  | Ejecuta el script de carga inicial de datos (`src/utils/seed.ts`). |

---

## 🐳 Uso con Docker

### Construir imagen

```bash
docker build -t web3-3d-tickets-backend .
```

### Ejecutar contenedor

```bash
docker run -p 4000:4000 --env-file .env web3-3d-tickets-backend
```

---

## 🔗 Endpoints GraphQL

Una vez ejecutado el servidor:

```
http://localhost:4000/graphql
```

Podés abrir el **Apollo Sandbox** o **GraphQL Playground** para probar queries como:

```graphql
query {
  events {
    id
    name
    date
  }
}
```

---

## 🧠 Notas para IA colaboradora o futuros desarrolladores

- Todo el código debe mantener **consistencia con el tipado TypeScript**.
- Las entidades principales son `Event` y `Ticket`, con relación uno-a-muchos.
- El objetivo es permitir la interacción con el frontend 3D mediante GraphQL.
- Mantener la estructura modular: cada resolver y modelo debe estar en su propio archivo.
- El código está diseñado para ser fácilmente ampliable (por ejemplo, para incluir autenticación JWT o integración Web3).

---

## 📜 Licencia

MIT © 2025 – Desarrollado por Daniel Vinet
