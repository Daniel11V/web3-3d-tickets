import { TEvent } from "@/models/event";
import { useState, useEffect } from "react";

// --- Props para EventTicket ---
type EventTicketProps = {
	event: TEvent | undefined; // Puede ser undefined si .find() no encuentra nada
	isExiting: boolean;
};

// --- Componente: Ticket del Evento ---
// La tarjeta 3D que muestra los detalles del ticket.
export const EventTicket = ({ event, isExiting }: EventTicketProps) => {
	if (!event) return null;

	// Estado para la animación de entrada inicial (solo la primera vez)
	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		// Usamos un pequeño retraso para asegurar que el estado inicial (opacity-0) se renderice antes de la transición
		const timer = setTimeout(() => {
			setHasMounted(true);
		}, 10);
		return () => clearTimeout(timer);
	}, []);

	// El ticket es visible si ha montado Y no está en proceso de "salida"
	const isVisible = hasMounted && !isExiting;

	return (
		// Contenedor de la tarjeta con la transformación 3D y transiciones
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
			{/* Sección Superior: Logo - Aumentamos su altura a h-2/5 */}
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
						// Fallback en caso de que la imagen falle
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

			{/* Sección Media: Nombre del Evento */}
			<div className="flex-grow flex flex-col justify-center items-center text-center">
				<h2 className="text-2xl font-bold text-white tracking-wide">
					{event.name}
				</h2>
				<div className="w-1/3 h-px bg-blue-500 my-4"></div>
			</div>

			{/* Sección Inferior: Código */}
			<div className="flex-shrink-0 w-full">
				<p className="text-xs text-center text-slate-400 mb-2 uppercase">
					Código de Acceso
				</p>
				<div
					className="bg-slate-900 border border-slate-700 rounded-md p-3 text-center
                       font-mono text-lg text-blue-300 tracking-wider shadow-inner"
				>
					{event.code}
				</div>
			</div>
		</div>
	);
};
