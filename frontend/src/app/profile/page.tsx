"use client";

import { useStore } from "@/store/useStore";
import { useDisconnect, useAccount } from "wagmi";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
	const { isConnected, userAddress } = useStore();
	const { chain } = useAccount(); // Hook de Wagmi para obtener info de la red
	const { disconnect } = useDisconnect();
	const router = useRouter();

	// Proteger la ruta: si no está conectado, redirigir al inicio
	useEffect(() => {
		// Usamos un pequeño delay para asegurar que el store de Zustand esté hidratado
		const timer = setTimeout(() => {
			if (!isConnected) {
				router.push("/");
			}
		}, 100); // 100ms es suficiente

		return () => clearTimeout(timer);
	}, [isConnected, router]);

	if (!isConnected || !userAddress) {
		// Muestra un loader o null mientras el useEffect redirige
		return (
			<div className="text-center p-10 text-blue-300">Loading profile...</div>
		);
	}

	const handleDisconnect = () => {
		disconnect();
		// El useEffect de WalletConnect.tsx se encargará de actualizar el store.
		// El useEffect de esta página se encargará de redirigir al home.
	};

	return (
		<div className="w-full max-w-2xl p-8 mx-auto mt-10 bg-slate-900 rounded-lg shadow-xl border border-slate-700">
			<h1 className="text-3xl font-bold text-white mb-6 pb-4 border-b border-slate-600">
				My Profile
			</h1>

			<div className="space-y-4">
				<InfoRow label="Status" value="Connected" valueColor="text-green-400" />
				<InfoRow label="Address" value={userAddress} isMono={true} />
				<InfoRow label="Network" value={chain?.name ?? "Unknown"} />
				<InfoRow label="Chain ID" value={chain?.id.toString() ?? "N/A"} />
			</div>

			<button
				onClick={handleDisconnect}
				className="w-full px-6 py-3 mt-8 text-lg font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
			>
				Disconnect
			</button>
		</div>
	);
}

// Componente helper para mostrar la info de forma ordenada
const InfoRow = ({
	label,
	value,
	valueColor = "text-blue-300",
	isMono = false,
}: {
	label: string;
	value: string;
	valueColor?: string;
	isMono?: boolean;
}) => (
	<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-slate-800 rounded-lg">
		<span className="text-sm font-medium text-gray-400 uppercase tracking-wider">
			{label}
		</span>
		<span
			className={`text-lg ${valueColor} ${
				isMono ? "font-mono" : "font-semibold"
			} break-all text-left sm:text-right mt-1 sm:mt-0`}
		>
			{value}
		</span>
	</div>
);
