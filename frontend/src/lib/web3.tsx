"use client";

import { WagmiProvider, createConfig } from "wagmi";
import { http } from "viem";
import { mainnet, polygon, sepolia } from "viem/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const config = createConfig({
	chains: [sepolia, polygon, mainnet],
	transports: {
		[mainnet.id]: http(),
		[polygon.id]: http(),
		[sepolia.id]: http(),
	},
});

export function Providers({ children }: { children: ReactNode }) {
	return (
		<WagmiProvider config={config}>
			<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
		</WagmiProvider>
	);
}
