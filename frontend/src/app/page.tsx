"use client";

import { useState } from "react";
import { EventSelectorButton } from "@/components/EventSelectorButton";
import { TEvent } from "@/models/event";
import { EventTicket } from "@/components/EventTicket";

const eventsData: TEvent[] = [
	{
		id: "1",
		name: "Expo Emprende Argentina",
		code: "202B",
		logoUrl: "/logos/event-expo-emprende-argentina.png",
	},
	{
		id: "2",
		name: "ElectroFest Cordoba",
		code: "325W",
		logoUrl: "/logos/event-electrofest-cordoba.png",
	},
	{
		id: "3",
		name: "Academia de Arte",
		code: "806H",
		logoUrl: "/logos/event-academia-de-arte.png",
	},
];

export default function HomePage() {
	// Estado para rastrear el evento seleccionado. Por defecto, el primero.
	const [selectedEventId, setSelectedEventId] = useState(eventsData[0].id);
	// Estado para controlar la animación de salida
	const [isExiting, setIsExiting] = useState(false);
	// Estado para prevenir clics duplicados durante la animación
	const [isAnimating, setIsAnimating] = useState(false);

	// Encontrar el objeto del evento completo basado en la ID seleccionada
	const selectedEvent = eventsData.find((e) => e.id === selectedEventId);

	// Manejador para la selección de eventos con animación
	const handleEventSelect = (newEventId: TEvent["id"]) => {
		// No hacer nada si ya estamos en animación o es el mismo botón
		if (isAnimating || newEventId === selectedEventId) return;

		setIsAnimating(true);
		setIsExiting(true); // 1. Inicia la animación de "salida"

		// 2. Espera a que termine la animación de salida (500ms)
		setTimeout(() => {
			setSelectedEventId(newEventId); // 3. Cambia el contenido del ticket
			setIsExiting(false); // 4. Inicia la animación de "entrada"

			// 5. Espera a que termine la animación de entrada para permitir nuevos clics
			setTimeout(() => {
				setIsAnimating(false);
			}, 500); // Duración de la animación de entrada
		}, 500); // Duración de la animación de salida
	};

	return (
		// Contenedor principal: Ocupa toda la pantalla, fondo oscuro, texto claro.
		<div className="w-full bg-slate-950 text-gray-200 font-sans p-6 flex justify-center overflow-hidden">
			{/* Contenedor del contenido: centrado y con ancho máximo */}
			<main className="flex flex-col items-center w-full max-w-4xl mx-auto pt-2 md:pt-2">
				{/* 1. Título Impactante */}
				<h1 className="text-4xl md:text-6xl font-extrabold text-center mb-12 tracking-tight">
					<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-500 to-cyan-400">
						Diseño y Desarrollo
					</span>
					<br />
					<span className="text-3xl md:text-5xl text-slate-300">
						Experiencias Digitales Únicas
					</span>
				</h1>

				{/* 2. Selectores de Eventos */}
				<div className="flex flex-col sm:flex-row justify-center gap-2 md:gap-4 mb-4">
					{eventsData.map((event) => (
						<EventSelectorButton
							key={event.id}
							event={event}
							isSelected={selectedEventId === event.id}
							onClick={() => handleEventSelect(event.id)}
						/>
					))}
				</div>

				{/* 3. Área de Visualización del Ticket */}
				{/* Usamos 'perspective' para habilitar el espacio 3D para el ticket */}
				<div className="w-full h-[550px] flex items-center justify-center [perspective:1000px]">
					{/* El ticket ahora recibe el estado 'isExiting' */}
					{selectedEvent && (
						<EventTicket event={selectedEvent} isExiting={isExiting} />
					)}
				</div>
			</main>
		</div>
	);
}
