"use client";

interface EventSelectorProps {
	event: { name: string };
	isSelected: boolean;
	onClick: () => void;
}

export function EventSelectorButton({
	event,
	isSelected,
	onClick,
}: EventSelectorProps) {
	return (
		<button
			onClick={onClick}
			className={`
        px-6 py-3 rounded-lg 
        font-semibold text-base
        transition-all duration-300 ease-in-out
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950
        ${
					isSelected
						? "bg-blue-600 text-white shadow-lg shadow-blue-600/30 ring-2 ring-blue-500"
						: "bg-gray-800 text-gray-400 ring-1 ring-gray-700 hover:bg-gray-700 hover:text-gray-200"
				}
      `}
		>
			{event.name}
		</button>
	);
}
