# 🎟️ Web3 3D Tickets – Frontend

Aplicación **Next.js 14 (App Router)** para una plataforma educativa de **entradas Web3**, que combina **Wagmi**, **Apollo Client** y **React Three Fiber**.

Este frontend se conecta a dos servicios locales:
1.  Un **Backend GraphQL** (Apollo) para obtener la lista de eventos.
2.  Un **Nodo Hardhat** (Blockchain) para conectar wallets y mintear tickets.

---

## 🧠 Tecnologías principales

| Tecnología | Propósito |
| :--- | :--- |
| **Next.js 14** | Framework React moderno (App Router). |
| **TypeScript** | Tipado estricto. |
| **TailwindCSS 4** | Estilos utilitarios. |
| **Apollo Client 4** | Cliente GraphQL para queries y mutations. |
| **Wagmi + Viem** | Conexión de wallet e interacción con Smart Contracts. |
| **Zustand** | Estado global (estado de conexión de wallet). |
| **R3F (Planeado)** | Renderizado 3D de tickets. |

---

## ⚙️ Configuración y Ejecución

Este servicio está diseñado para ser levantado por el `docker-compose.yml` en la raíz del proyecto (usando `npm start`).

Las variables de entorno conectan con los servicios locales:

```env
# URL del backend GraphQL (contenedor 'backend')
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql

# (Opcional) ID de la cadena local de Hardhat
NEXT_PUBLIC_LOCAL_CHAIN_ID=31337
````

-----

## 🏗️ Flujo de la Aplicación

1.  **`/` (Inicio):** Muestra los eventos desde GraphQL. El header tiene un botón "Connect Wallet". Las tarjetas de eventos *no* muestran códigos de ticket.
2.  **Login (Connect Wallet):** El usuario conecta su wallet MetaMask (configurada para la red Hardhat local).
3.  **Navegación (Logueado):** El header cambia. Muestra:
      * Centro: "Eventos" y "Mis Tickets".
      * Derecha: "Perfil".
4.  **`/events` (Logueado):** Similar al inicio, pero las tarjetas de eventos ahora tienen un botón "Adquirir Ticket".
5.  **Acción "Adquirir Ticket":** El usuario firma una transacción con Wagmi para *mintear* un NFT en la red Hardhat. Al éxito, se llama a una mutación de Apollo para registrarlo en el backend.
6.  **`/my-tickets` (Nueva Página):** Muestra solo los tickets que el usuario posee (obtenidos vía GraphQL). Aquí, las tarjetas de eventos *sí* muestran el código único del ticket (NFT `tokenId` o similar).
7.  **`/profile` (Nueva Página):** Muestra la dirección del usuario (`address`, `chainId`) y un botón para desconectar.

-----

## 🚀 Roadmap de Implementación

  - [x] Configurar Apollo Client.
  - [x] Configurar Wagmi Providers.
  - [x] Mostrar eventos dinámicos en `page.tsx`.
  - [ ] **Activar `WalletConnect.tsx`:** Importarlo y usarlo en `layout.tsx`.
  - [ ] **Actualizar Zustand Store:** Guardar `address` e `isConnected` globalmente.
  - [ ] **Crear UI Condicional:** Modificar `layout.tsx` y `page.tsx` para el flujo Logueado/Deslogueado.
  - [ ] **Crear página `/profile`:** Añadir `src/app/profile/page.tsx`.
  - [ ] **Crear página `/my-tickets`:** Añadir `src/app/my-tickets/page.tsx` y su query de GraphQL.
  - [ ] **Implementar Minting:** Crear el Smart Contract (en `/blockchain`), desplegarlo y llamar a `useWriteContract` (Wagmi) en el botón "Adquirir Ticket".
  - [ ] **(Opcional/Final):** Reemplazar el ticket 3D CSS (`EventTicket.tsx`) por el componente 3D real de R3F (`ThreeScene.tsx`).

-----

## 🧾 Licencia

MIT © 2025 – Desarrollado por Daniel Vinet
