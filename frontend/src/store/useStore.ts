import { create } from "zustand";

interface Event {
  id: string;
  code: string;
  name: string;
  imageUrl: string;
}

interface EventStore {
  events: Event[];
  selectedEvent: Event | null;
  setEvents: (events: Event[]) => void;
  selectEvent: (event: Event) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: [],
  selectedEvent: null,
  setEvents: (events) => set({ events }),
  selectEvent: (event) => set({ selectedEvent: event }),
}));
