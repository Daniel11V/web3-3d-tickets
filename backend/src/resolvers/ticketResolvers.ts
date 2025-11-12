import { Ticket } from "../db/models/Ticket";
import { Event } from "../db/models/Event";
import { ApolloError } from "apollo-server";

export const ticketResolvers = {
	Mutation: {
		createTicket: async (
			_: any,
			{ eventId, user }: { eventId: string; user: string }
		) => {
			try {
				// Verificamos que el evento exista
				const event = await Event.findById(eventId);
				if (!event) {
					throw new ApolloError("Evento no encontrado", "NOT_FOUND");
				}

				const newTicket = new Ticket({
					eventId: event._id, // Usamos el _id real de Mongo
					user,
				});
				await newTicket.save();
				return newTicket;
			} catch (err: any) {
				throw new ApolloError(
					"Error al crear el ticket",
					"TICKET_CREATION_FAILED",
					{ originalError: err.message }
				);
			}
		},
	},
};
