"use client";

import ThreeScene from "@/components/ThreeScene";
import { useState } from "react";

const MOCK_EVENTS = [
  { id: "1", name: "Concierto Blockchain", code: "202B" },
  { id: "2", name: "Expo Web3 Rosario", code: "325W" },
];

export default function HomePage() {
  const [selectedEvent, setSelectedEvent] = useState(MOCK_EVENTS[0]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-primary">
        Seleccioná un evento
      </h2>
      <div className="flex gap-4">
        {MOCK_EVENTS.map((event) => (
          <button
            key={event.id}
            className={`px-4 py-2 border border-gray-700 rounded-lg hover:bg-gray-800 ${
              selectedEvent.id === event.id ? "bg-primary text-black" : ""
            }`}
            onClick={() => setSelectedEvent(event)}
          >
            {event.name}
          </button>
        ))}
      </div>

      <ThreeScene event={selectedEvent} />
    </div>
  );
}
