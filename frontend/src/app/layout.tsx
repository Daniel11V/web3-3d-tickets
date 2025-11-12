import "@/styles/globals.css";
import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apolloClient";
import { Providers } from "@/lib/web3";
// import { ConnectButton } from "@/components/ConnectButton"; // Asumiendo que creaste esto

export const metadata = {
	title: "Web3 3D Tickets",
	description: "Sistema de tickets 3D con blockchain y React Three Fiber",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="es" className="dark">
			<body className="min-h-screen bg-gray-950 text-gray-200 flex flex-col items-center">
				{/* Header pulido */}
				<header className="w-full max-w-6xl py-4 px-6 flex justify-between items-center">
					{/* Título nuevo */}
					<h1 className="text-xl font-bold text-white tracking-wide">
						<span className="text-blue-500">Web3</span>
						<span className="font-light text-gray-300">Ticket</span>
						<span className="text-blue-500">Platform</span>
					</h1>
					<div>
						{/* <ConnectButton />  Aquí va tu botón de conectar wallet */}
					</div>
				</header>

				{/* Contenido principal centrado */}
				<main className="flex-1 w-full max-w-6xl p-6 flex flex-col items-center">
					<Providers>
						<ApolloWrapper>{children}</ApolloWrapper>
					</Providers>
				</main>

				<footer className="py-4 text-sm text-gray-600">
					© {new Date().getFullYear()} Web3 3D Tickets.
				</footer>
			</body>
		</html>
	);
}
