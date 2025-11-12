import { TEvent } from "@/models/event";

// --- Props para EventSelectorButton ---
type EventSelectorButtonProps = {
	event: TEvent;
	isSelected: boolean;
	onClick: () => void;
};

// --- Componente: Botón Selector de Evento ---
// Un botón personalizado que se ilumina cuando está seleccionado.
export const EventSelectorButton = ({
	event,
	isSelected,
	onClick,
}: EventSelectorButtonProps) => {
	// Clases base para el botón
	const baseClasses =
		"px-6 py-3 rounded-lg font-semibold uppercase tracking-wider transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-opacity-50";

	// Clases para el estado seleccionado
	const selectedClasses =
		"bg-blue-700 text-white shadow-lg shadow-blue-700/30 ring-blue-500";

	// Clases para el estado no seleccionado
	const unselectedClasses =
		"bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 hover:text-white focus:ring-blue-600";

	return (
		<button
			className={`${baseClasses} ${
				isSelected ? selectedClasses : unselectedClasses
			}`}
			onClick={onClick}
		>
			{event.name}
		</button>
	);
};
