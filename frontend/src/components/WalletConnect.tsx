// frontend/src/components/WalletConnect.tsx
"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors"; // Para MetaMask y otros injected wallets

export default function WalletConnect() {
	const { address, isConnected } = useAccount();
	const { connect } = useConnect();
	const { disconnect } = useDisconnect();

	const handleConnect = async () => {
		try {
			// Conecta usando el conector "injected"
			connect({ connector: injected() });
		} catch (err) {
			console.error("Wallet connection failed:", err);
			alert(
				"Fallo al conectar la wallet. Asegúrate de tener MetaMask instalado."
			);
		}
	};

	if (isConnected && address) {
		return (
			<div className="flex items-center gap-2">
				<div className="text-green-400 font-medium">
					✅ Conectado: {address.slice(0, 6)}...{address.slice(-4)}
				</div>
				<button
					onClick={() => disconnect()}
					className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm"
				>
					Desconectar
				</button>
			</div>
		);
	}

	return (
		<button
			onClick={handleConnect}
			className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
		>
			Connect Wallet
		</button>
	);
}
