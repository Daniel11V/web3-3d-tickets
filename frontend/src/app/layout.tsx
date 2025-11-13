import "./globals.css";
import { ReactNode } from "react";
import { ApolloWrapper } from "@/lib/apolloClient";
import { Providers } from "@/lib/web3";
import { Header } from "@/components/Header"; // 1. Importar el nuevo Header

export const metadata = {
	title: "Web3 3D Tickets",
	description: "3D ticketing system with blockchain and React Three Fiber",
};

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className="dark">
			<body className="font-sans min-h-screen bg-slate-950 text-gray-200 flex flex-col items-center">
				{/*
				 * 2. CORRECCIÓN DE ARQUITECTURA:
				 * Los Providers deben envolver TODO el contenido que necesite
				 * acceso al estado (incluyendo el Header).
				 */}
				<Providers>
					<ApolloWrapper>
						{/* 3. Renderizar el Header dinámico (ahora es un Client Component) */}
						<Header />

						{/* 4. El contenido de la página se renderiza aquí */}
						<main className="flex-1 w-full max-w-6xl flex flex-col items-center">
							{children}
						</main>

						<footer className="py-4 text-sm text-gray-600">
							© {new Date().getFullYear()} Daniel Vinet.
						</footer>
					</ApolloWrapper>
				</Providers>
			</body>
		</html>
	);
}
