// frontend/components/EventList.tsx
import { GET_EVENTS } from "@/graphql/queries";
import { useQuery } from "@apollo/client/react";
import { TEvent } from "@/models/event";

export default function EventList() {
	const { data, loading, error } = useQuery<{
		events: TEvent[];
	}>(GET_EVENTS);

	if (loading) return <p className="text-gray-400">Loading events...</p>;
	if (error) return <p className="text-red-500">Error loading events</p>;
	if (!data?.events?.length) return <p className="text-red-500">No events</p>;

	return (
		<div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4">
			{data.events.map((event: any) => (
				<div
					key={event.id}
					className="bg-gray-800 rounded-xl p-4 flex flex-col items-center text-center"
				>
					<img
						src={event.logoUrl}
						alt={event.name}
						className="w-20 h-20 object-cover rounded-lg mb-2"
					/>
					<h3 className="text-white font-semibold">{event.name}</h3>
					<p className="text-sm text-gray-400">{event.code}</p>
				</div>
			))}
		</div>
	);
}
