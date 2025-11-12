# Web3 3D Tickets

Full-stack local environment for **Web3 3D Tickets**, a project showcasing:

- Next.js + TypeScript frontend
- TailwindCSS (Dark Mode)
- Zustand for state management
- GraphQL backend (Node + Apollo + MongoDB)
- Web3.js for MetaMask wallet connection
- Three.js for 3D event ticket visualization
- Docker for local orchestration

---

## 🚀 Run locally

```bash
npm run dev
```

That command builds and starts:

- MongoDB (port 27017)
- Backend GraphQL API (port 4000)
- Frontend Next.js app (port 3000)

Access the app at: [http://localhost:3000](http://localhost:3000)

---

## 🧰 Other commands

```bash
npm start      # Run using cached images
npm run stop   # Stop containers
npm run clean  # Stop + remove volumes + prune system
```

---

## 🧠 Stack

| Layer              | Tech                                             |
| ------------------ | ------------------------------------------------ |
| **Frontend**       | Next.js, React, TypeScript, TailwindCSS, Zustand |
| **Backend**        | Node.js, Apollo GraphQL, MongoDB                 |
| **Blockchain**     | Web3.js (MetaMask, Sepolia testnet)              |
| **3D**             | Three.js / React Three Fiber                     |
| **Infrastructure** | Docker + Docker Compose                          |

Everything runs **fully local** and **requires no paid services**.

---

## 🧩 Project structure

```
web3-3d-tickets/
├── backend/                  # GraphQL API (Node + Apollo)
│   ├── Dockerfile
│   ├── package.json
│   └── src/
│       ├── index.ts
│       ├── resolvers/
│       └── schema/
│
├── frontend/                 # Next.js frontend app
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   ├── tailwind.config.js
│   ├── next.config.js
│   └── postcss.config.js
│
├── docker-compose.yml        # Orchestrates MongoDB, backend & frontend
├── package.json              # Root scripts (docker-compose commands)
├── .gitignore
└── README.md
```

---

## ⚙️ Environment variables

You can create a `.env` file in the project root based on the following template:

```
MONGODB_URI=mongodb://mongodb:27017/web3tickets
PORT=4000
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql
```

---

## 🧱 Development flow

1. Clone the repo

   ```bash
   git clone https://github.com/yourusername/web3-3d-tickets.git
   cd web3-3d-tickets
   ```

2. Build and start all services

   ```bash
   npm run dev
   ```

3. Open your browser

   - Frontend → [http://localhost:3000](http://localhost:3000)
   - GraphQL Playground → [http://localhost:4000/graphql](http://localhost:4000/graphql)

4. Stop services

   ```bash
   npm run stop
   ```

5. Reset environment (remove containers & data)

   ```bash
   npm run clean
   ```

---

## 🧠 Overview

**Web3 3D Tickets** is a demo project designed to showcase proficiency with:

- **Modern frontend frameworks** (Next.js, React, Zustand, TailwindCSS)
- **GraphQL backend** (Apollo Server + MongoDB)
- **Blockchain integration** (MetaMask login with Web3.js)
- **3D visualization** (Three.js / React Three Fiber)
- **Containerized development** (Docker + Compose)

It demonstrates end-to-end integration of these technologies in a single local environment.

---

## 🪪 License

MIT © 2025 Daniel
