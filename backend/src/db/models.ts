export interface Event {
  id: number;
  code: string;
  name: string;
  logoUrl?: string;
  description?: string;
}

export interface Ticket {
  id: number;
  eventId: number;
  user: string;
  createdAt: string;
}
