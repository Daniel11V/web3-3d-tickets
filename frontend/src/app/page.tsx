"use client";

import { useState } from "react";
// Renombramos ThreeScene a TicketDisplay para claridad
import { EventSelectorButton } from "@/components/EventSelectorButton";
import { TEvent } from "@/models/event";
import TicketDisplay from "@/components/TicketDisplay";

const MOCK_EVENTS: TEvent[] = [
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
	const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0]);

	return (
		// Contenedor centrado verticalmente
		<div className="flex flex-col items-center justify-center w-full gap-12">
			{/* 1. Selectores de Eventos */}
			<div className="flex flex-wrap justify-center gap-4">
				{MOCK_EVENTS.map((event) => (
					<EventSelectorButton
						key={event.id}
						event={event}
						isSelected={selectedEvent.id === event.id}
						onClick={() => setSelectedEvent(event)}
					/>
				))}
			</div>

			{/* 2. Contenedor de Perspectiva 3D */}
			<div style={{ perspective: "1000px" }}>
				<TicketDisplay event={selectedEvent} />
			</div>
		</div>
	);
}
