"use client";

import { useAccount, useConnect, useDisconnect } from "wagmi";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";
import Link from "next/link";

export const WalletConnect = () => {
	const account = useAccount();
	const { connect, connectors } = useConnect();
	const { disconnect } = useDisconnect();

	const { setUserState, isConnected, userAddress } = useStore();

	// Sincroniza el estado de Wagmi con nuestro store global (Zustand)
	useEffect(() => {
		if (account.status === "connected") {
			setUserState({
				isConnected: true,
				userAddress: account.address,
			});
		} else if (account.status === "disconnected") {
			setUserState({
				isConnected: false,
				userAddress: null,
			});
		}
	}, [account.status, account.address, setUserState]);

	// Estado Conectado: Muestra botón de Perfil
	if (isConnected && userAddress) {
		return (
			<div className="flex items-center gap-4">
				<span className="hidden sm:block text-sm text-gray-400 font-mono">
					{/* Muestra la dirección acortada */}
					{`${userAddress.substring(0, 6)}...${userAddress.substring(
						userAddress.length - 4
					)}`}
				</span>
				<Link
					href={{ pathname: "/profile" }}
					className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
				>
					Profile
				</Link>
			</div>
		);
	}

	// Estado Desconectado: Muestra botón de Conectar
	return (
		<button
			onClick={() => connect({ connector: connectors[0] })}
			className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
		>
			Connect Wallet
		</button>
	);
};
