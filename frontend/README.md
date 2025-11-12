# 🎟️ Web3 3D Tickets – Frontend

Aplicación **Next.js 14 (App Router)** para una plataforma de venta de **entradas Web3**, que combina **blockchain**, **gráficos 3D interactivos** y **GraphQL**.

Este frontend se conecta a un backend GraphQL (por ejemplo, un servidor Apollo en Node.js o NestJS), consume datos de eventos y renderiza tickets en 3D usando **React Three Fiber**.

---

## 🧠 Tecnologías principales

| Tecnología                              | Propósito                                            |
| --------------------------------------- | ---------------------------------------------------- |
| **Next.js 14**                          | Framework React moderno con soporte App Router.      |
| **TypeScript**                          | Tipado estricto para mejor mantenimiento.            |
| **TailwindCSS 4**                       | Estilos utilitarios modernos.                        |
| **Apollo Client 4**                     | Cliente GraphQL para consultas y mutaciones.         |
| **React Three Fiber / Drei / Three.js** | Renderizado 3D con WebGL.                            |
| **Zustand**                             | Estado global simple y escalable.                    |
| **Wagmi + Viem**                        | Interacción con blockchain y contratos inteligentes. |

---

## ⚙️ Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/Daniel11V/web3-3d-tickets-frontend.git
cd web3-3d-tickets-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Variables de entorno

Crea un archivo `.env.local` en la raíz:

```env
NEXT_PUBLIC_GRAPHQL_ENDPOINT=http://localhost:4000/graphql
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

El proyecto estará disponible en:  
👉 [http://localhost:3000](http://localhost:3000)

---

## 🏗️ Estructura de carpetas

```
web3-3d-tickets-frontend/
│
├── src/
│   ├── app/                      # App Router de Next.js
│   │   ├── layout.tsx            # Layout global (providers, estilos, etc.)
│   │   └── page.tsx              # Página principal de inicio
│   │
│   ├── components/               # Componentes reutilizables
│   │   ├── EventCard.tsx         # Muestra datos de un evento
│   │   └── ThreeScene.tsx        # Escena 3D con React Three Fiber
│   │
│   ├── lib/                      # Lógica auxiliar y servicios
│   │   └── apolloClient.ts       # Configuración del cliente Apollo
│   │
│   ├── store/                    # Estado global con Zustand
│   │   └── useEventStore.ts      # Manejo de estado de eventos
│   │
│   └── styles/                   # Estilos globales
│       └── globals.css           # Tailwind + estilos base
│
├── tailwind.config.ts            # Configuración de TailwindCSS
├── postcss.config.js             # Configuración de PostCSS
├── tsconfig.json                 # Configuración de TypeScript
└── next.config.js                # Configuración de Next.js
```

---

## 🧩 Descripción de los módulos principales

### 🔹 `src/lib/apolloClient.ts`

Configura el cliente Apollo para conectarse al endpoint GraphQL especificado en `.env.local`.  
Incluye la creación del `ApolloClient`, `InMemoryCache` y un `ApolloWrapper` para envolver la aplicación.

### 🔹 `src/components/ThreeScene.tsx`

Define una escena 3D usando **React Three Fiber** y **Drei**.

### 🔹 `src/components/EventCard.tsx`

Renderiza los datos de un evento con diseño responsivo usando TailwindCSS.  
Puede incluir el nombre del evento, fecha, imagen y precio del ticket.

### 🔹 `src/store/useEventStore.ts`

Implementa un store global con Zustand para manejar datos compartidos entre componentes (eventos, usuario, conexión web3, etc.).

### 🔹 `src/app/layout.tsx`

Layout global que aplica estilos, fuentes, y wrappers de contexto como ApolloProvider y WagmiConfig.

### 🔹 `src/app/page.tsx`

Página principal que lista eventos obtenidos desde el backend mediante GraphQL.

---

## 🚀 Scripts disponibles

| Comando         | Descripción                                           |
| --------------- | ----------------------------------------------------- |
| `npm run dev`   | Inicia el servidor de desarrollo en `localhost:3000`. |
| `npm run build` | Compila el proyecto para producción.                  |
| `npm run start` | Sirve la aplicación ya compilada.                     |
| `npm run lint`  | Analiza el código con ESLint.                         |

---

## 🧱 Buenas prácticas de desarrollo

1. Mantener componentes **puros y reutilizables**.
2. Centralizar la lógica de datos en **Apollo** y **Zustand**.
3. Evitar lógica de negocio dentro de componentes visuales.
4. Usar **TypeScript** en todo el proyecto para mayor robustez.
5. Mantener un estilo coherente con **TailwindCSS**.

---

## 🌐 Integración con Backend

El cliente Apollo se comunica con el servidor GraphQL definido por la variable `NEXT_PUBLIC_GRAPHQL_ENDPOINT`.  
Los esquemas y tipos pueden ser generados automáticamente con herramientas como `graphql-codegen` para mantener sincronía.

---

## 🧩 Integración con Web3

La conexión a la blockchain se gestiona mediante **Wagmi** y **Viem**, permitiendo al usuario conectar su wallet y verificar ownership de tickets NFT.

---

## 🧪 Próximos pasos

- [ ] Añadir rutas dinámicas para `/event/[id]`
- [ ] Integrar autenticación Web3 (firma de mensajes)
- [ ] Añadir animaciones y shaders personalizados en `ThreeScene`
- [ ] Implementar tickets NFT interactivos

---

## 🧾 Licencia

MIT © 2025 – Desarrollado por Daniel Vinet
