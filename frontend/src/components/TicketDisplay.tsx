"use client";

import { TEvent } from "@/models/event";
import Image from "next/image";

// La interfaz que define qué datos espera el ticket
interface TicketDisplayProps {
	event: TEvent;
}

export default function TicketDisplay({ event }: TicketDisplayProps) {
	return (
		// La Tarjeta 3D CSS
		<div
			className="
        w-72 h-[448px]  /* Taller que ancho (aprox 1:1.5) */
        rounded-2xl 
        bg-gray-800/60 backdrop-blur-md
        p-6 
        flex flex-col items-center 
        ring-2 ring-blue-600/70 /* Borde de color primario */
        shadow-2xl drop-shadow-primary /* Sombra azul fuerte */
        transition-all duration-500 ease-out
        
        /* Efecto 3D: rotado levemente a la esquina superior derecha */
        transform-style: preserve-3d;
        transform: rotateX(-8deg) rotateY(15deg);

        /* Efecto de hover que la endereza */
        hover:transform: rotateX(0deg) rotateY(0deg);
        hover:scale-105;
      "
		>
			{/* Contenedor del Logo */}
			<div className="w-32 h-32 rounded-full overflow-hidden ring-2 ring-gray-600 mb-6">
				<Image
					src={event.logoUrl}
					alt={event.name}
					width={128}
					height={128}
					className="object-cover w-full h-full"
				/>
			</div>
			{/* Nombre del Evento */}
			<h3 className="text-2xl font-bold text-white text-center mb-4">
				{event.name}
			</h3>
			<div className="flex-1"></div> {/* Espaciador */}
			{/* Código (estilo profesional que resalta) */}
			<div
				className="
          w-full 
          border-t-2 border-dashed border-gray-600/50 
          pt-4 
          mt-4 
          text-center
        "
			>
				<span className="text-sm text-gray-400 tracking-wider">
					CÓDIGO DE ACCESO
				</span>
				<p className="text-3xl font-mono font-bold text-blue-400 tracking-widest mt-1">
					{event.code}
				</p>
			</div>
		</div>
	);
}
