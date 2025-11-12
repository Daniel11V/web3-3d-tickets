"use client";

interface EventCardProps {
  event: {
    id: string;
    name: string;
    code: string;
    imageUrl: string;
  };
  onSelect: () => void;
}

export default function EventCard({ event, onSelect }: EventCardProps) {
  return (
    <div
      onClick={onSelect}
      className="cursor-pointer bg-gray-800 hover:bg-gray-700 rounded-2xl p-4 flex flex-col items-center text-center transition"
    >
      <img
        src={event.imageUrl}
        alt={event.name}
        className="w-32 h-32 object-cover rounded-xl mb-2"
      />
      <h2 className="text-lg font-semibold">{event.name}</h2>
      <p className="text-sm text-gray-400">Code: {event.code}</p>
    </div>
  );
}
