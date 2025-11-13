"use client"; // Necesario para el hook de Zustand

import { TEvent } from "@/models/event";
import { useState, useEffect } from "react";
import { useStore } from "@/store/useStore"; // 1. Importar Zustand

// --- Props actualizadas ---
type EventTicketProps = {
	event: TEvent | undefined;
	isExiting: boolean;
	// Prop para decidir si mostrar el código o el botón de "Adquirir"
	showAccessCode?: boolean;
	// El código real a mostrar (ej. tokenId)
	accessCode?: string;
	// Callback para el botón de adquirir
	onAcquireClick?: (eventId: string) => void;
};

// --- Componente: Ticket del Evento ---
export const EventTicket = ({
	event,
	isExiting,
	showAccessCode = false, // Por defecto, no mostrar el código
	accessCode,
	onAcquireClick,
}: EventTicketProps) => {
	// 2. Leer estado de conexión
	const { isConnected } = useStore();

	if (!event) return null;

	// ... (lógica de estado 'hasMounted' sin cambios) ...
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		const timer = setTimeout(() => {
			setHasMounted(true);
		}, 10);
		return () => clearTimeout(timer);
	}, []);

	const isVisible = hasMounted && !isExiting;

	const handleAcquire = () => {
		if (onAcquireClick && event) {
			onAcquireClick(event.id);
		}
	};

	// --- Lógica de renderizado inferior ---
	const renderTicketBottom = () => {
		// 3. VISTA: "Mis Tickets"
		// Si estamos en "Mis Tickets" (showAccessCode=true), mostramos el código
		if (showAccessCode) {
			return (
				<div>
					<p className="text-xs text-center text-slate-400 mb-2 uppercase">
						Access Code (Ticket ID)
					</p>
					<div
						className="bg-slate-900 border border-slate-700 rounded-md p-3 text-center
                       font-mono text-lg text-blue-300 tracking-wider shadow-inner"
					>
						{/* Usamos el accessCode (tokenId) pasado como prop */}#{accessCode}
					</div>
				</div>
			);
		}

		// 4. VISTA: "Eventos" (Logueado)
		// Si estamos en "Eventos" (showAccessCode=false) Y conectados, mostramos el botón
		if (isConnected) {
			return (
				<button
					onClick={handleAcquire}
					className="w-full px-6 py-3 text-lg font-medium text-black bg-gradient-to-r from-blue-400 to-cyan-400 rounded-lg 
								hover:from-blue-500 hover:to-cyan-500 transition-all shadow-lg hover:shadow-cyan-500/30
								focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
				>
					Acquire Ticket
				</button>
			);
		}

		// 5. VISTA: "Eventos" (Deslogueado)
		// Si no estamos en "Mis Tickets" Y no estamos conectados,
		// mostramos el 'code' genérico del evento (como antes).
		return (
			<div>
				<p className="text-xs text-center text-slate-400 mb-2 uppercase">
					Event Code
				</p>
				<div
					className="bg-slate-900 border border-slate-700 rounded-md p-3 text-center
                       font-mono text-lg text-blue-300 tracking-wider shadow-inner"
				>
					{event.code}
				</div>
			</div>
		);
	};

	return (
		<div
			className={`w-72 h-[425px] bg-slate-800 rounded-2xl border-2 border-blue-600 shadow-2xl shadow-blue-800/40
                 flex flex-col items-center justify-between p-6
                 transition-all duration-500 ease-out
                 ${
										isVisible
											? "opacity-100 [transform:rotateY(-10deg)_rotateX(5deg)_scale(1)]"
											: "opacity-0 [transform:rotateY(-20deg)_rotateX(10deg)_scale(0.9)]"
									}
                 hover:opacity-100 hover:[transform:rotateY(-5deg)_rotateX(2deg)_scale(1.02)]`}
			style={{ transformStyle: "preserve-3d" }}
		>
			{/* Sección Superior: Logo (sin cambios) */}
			<div className="flex-shrink-0 w-full min-h-40 flex justify-center items-center h-2/5 overflow-hidden">
				<img
					src={event.logoUrl}
					alt={`Logo de ${event.name}`}
					className={`w-40 h-40 min-h-40 rounded-lg object-cover shadow-lg bg-slate-700 border-2 border-slate-600
                      transition-all duration-500 ease-out
                      ${
												isVisible
													? "opacity-100 translate-y-0"
													: "opacity-0 translate-y-4"
											}`}
					onError={(e) => {
						if ("onerror" in e.target) {
							e.target.onerror = null;
						}
						if ("src" in e.target) {
							e.target.src =
								"https://placehold.co/200x200/334155/ffffff?text=Error&font=inter";
						}
					}}
				/>
			</div>

			{/* Sección Media: Nombre del Evento (sin cambios) */}
			<div className="flex-grow flex flex-col justify-center items-center text-center">
				<h2 className="text-2xl font-bold text-white tracking-wide">
					{event.name}
				</h2>
				<div className="w-1/3 h-px bg-blue-500 my-4"></div>
			</div>

			{/* Sección Inferior: CONTENIDO DINÁMICO */}
			<div className="flex-shrink-0 w-full">{renderTicketBottom()}</div>
		</div>
	);
};
