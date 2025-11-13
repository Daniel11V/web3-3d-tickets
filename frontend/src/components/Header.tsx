"use client";

import Link from "next/link";
import { useStore } from "@/store/useStore";
import { WalletConnect } from "./WalletConnect";

export const Header = () => {
	const { isConnected } = useStore();

	return (
		<header className="w-full max-w-6xl py-4 px-6 flex justify-between items-center">
			{/* Título */}
			<Link
				href={{ pathname: "/" }}
				className="text-xl font-bold text-white tracking-wide"
			>
				<span className="text-blue-500">Web3</span>
				<span className="font-light text-gray-300">Ticket</span>
				<span className="text-blue-500">Platform</span>
			</Link>

			{/* Navegación central (condicional) */}
			<nav className="hidden md:flex">
				{isConnected && (
					<div className="flex items-center gap-6">
						<Link
							href={{ pathname: "/" }}
							className="text-gray-300 hover:text-blue-400 transition-colors"
						>
							Events
						</Link>
						<Link
							href={{ pathname: "/my-tickets" }}
							className="text-gray-300 hover:text-blue-400 transition-colors"
						>
							My Tickets
						</Link>
					</div>
				)}
			</nav>

			{/* Botón de Conexión / Perfil (derecha) */}
			<div>
				<WalletConnect />
			</div>
		</header>
	);
};
