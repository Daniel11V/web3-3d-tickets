"use client";

import { WagmiProvider, createConfig } from "wagmi";
import { http } from "viem";
// 1. Importar la chain 'hardhat'
import { mainnet, polygon, sepolia, hardhat } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

// 2. Definir nuestra chain local
// (Hardhat por defecto usa el chainId 31337)
const hardhatLocal = {
	...hardhat,
	id: 31337,
	name: "Local Hardhat",
	rpcUrls: {
		default: {
			http: ["http://localhost:8545"], // 3. Apuntar al puerto 8545
		},
	},
};

const config = createConfig({
	// 4. Poner hardhatLocal PRIMERO para que sea la de por defecto
	chains: [hardhatLocal, sepolia, polygon, mainnet],
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[sepolia.id]: http(),
		[hardhatLocal.id]: http(), // 5. Configurar su transporte
	},
});

export function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
