"use client";

import { useState, useEffect } from "react";
import { TEvent } from "@/models/event";
import { EventTicket } from "@/components/EventTicket";
import { useQuery } from "@apollo/client/react";
import { GET_TICKETS_BY_USER } from "@/graphql/queries"; // 1. Importar la nueva query
import { useStore } from "@/store/useStore";
import { useRouter } from "next/navigation";

// Tipo para un ticket (basado en la query)
type TTicket = {
	id: string;
	tokenId: string;
	user: string;
	event: TEvent; // Evento anidado
};

export default function MyTicketsPage() {
	const router = useRouter();
	const { isConnected, userAddress } = useStore();

	// 2. Obtener los tickets del backend
	const { data, loading, error } = useQuery<{ ticketsByUser: TTicket[] }>(
		GET_TICKETS_BY_USER,
		{
			variables: { userAddress: userAddress },
			skip: !isConnected, // No ejecutar la query si no está conectado
			fetchPolicy: "network-only", // Siempre buscar tickets nuevos
		}
	);

	const ticketsData = data?.ticketsByUser;

	// 3. Estado para la animación (igual que en page.tsx)
	// Seleccionamos el *ticket* id, no el evento id.
	const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
	const [isExiting, setIsExiting] = useState(false);
	const [isAnimating, setIsAnimating] = useState(false);

	// 4. Proteger la ruta y establecer el ticket inicial
	useEffect(() => {
		if (!isConnected) {
			router.push("/");
		}

		if (ticketsData && ticketsData.length > 0 && selectedTicketId === null) {
			setSelectedTicketId(ticketsData[0].id);
		}
	}, [isConnected, router, ticketsData, selectedTicketId]);

	// 5. Encontrar el ticket seleccionado
	const selectedTicket = ticketsData?.find((t) => t.id === selectedTicketId);

	// 6. Manejador de selección
	const handleTicketSelect = (newTicketId: TTicket["id"]) => {
		if (isAnimating || newTicketId === selectedTicketId) return;
		setIsAnimating(true);
		setIsExiting(true);
		setTimeout(() => {
			setSelectedTicketId(newTicketId);
			setIsExiting(false);
			setTimeout(() => {
				setIsAnimating(false);
			}, 500);
		}, 500);
	};

	// --- 7. Manejo de estados ---

	if (!isConnected) {
		return (
			<div className="w-full h-screen flex justify-center items-center text-xl text-yellow-400">
				Please connect your wallet to see your tickets.
			</div>
		);
	}

	if (loading) {
		return (
			<div className="w-full h-screen flex justify-center items-center text-xl text-blue-300">
				Loading your tickets...
			</div>
		);
	}

	if (error) {
		return (
			<div className="w-full h-screen flex justify-center items-center text-xl text-red-400">
				<p>Error loading tickets: {error.message}</p>
			</div>
		);
	}

	if (!ticketsData || ticketsData.length === 0) {
		return (
			<div className="w-full h-screen flex flex-col justify-center items-center text-xl text-gray-400">
				<p className="text-3xl mb-4">🎟️</p>
				You don't have any tickets yet.
				<a href="/" className="text-blue-400 hover:text-blue-300 mt-2">
					Go to Events to get one!
				</a>
			</div>
		);
	}

	// --- 8. Render principal ---
	// La lógica aquí es diferente: iteramos sobre *tickets*, no sobre *eventos*.
	return (
		<div className="w-full bg-slate-950 text-gray-200 font-sans p-6 flex justify-center overflow-hidden">
			<main className="flex flex-col items-center w-full max-w-4xl mx-auto pt-2 md:pt-2">
				<h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-tight">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
						My Tickets
					</span>
				</h1>

				{/* Selectores de Tickets */}
				<div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-4">
					{ticketsData.map((ticket) => (
						<button
							key={ticket.id}
							onClick={() => handleTicketSelect(ticket.id)}
							className={`px-4 py-2 rounded-lg border-2 transition-all duration-300
										${
											selectedTicketId === ticket.id
												? "bg-blue-600 border-blue-500 text-white"
												: "bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
										}`}
						>
							{/* Usamos el nombre del evento + el tokenId */}
							{ticket.event.name} (Ticket #{ticket.tokenId})
						</button>
					))}
				</div>

				{/* Área de Visualización del Ticket */}
				<div className="w-full h-[550px] flex items-center justify-center [perspective:1000px]">
					{selectedTicket && (
						<EventTicket
							// Le pasamos el *evento* del ticket
							event={selectedTicket.event}
							isExiting={isExiting}
							// ¡Importante! Le decimos que muestre el código
							showAccessCode={true}
							// Le pasamos el código real del ticket (tokenId)
							accessCode={selectedTicket.tokenId}
						/>
					)}
				</div>
			</main>
		</div>
	);
}
