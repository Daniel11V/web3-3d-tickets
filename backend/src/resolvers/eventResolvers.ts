import { Event } from "../db/models/Event";
import { Ticket } from "../db/models/Ticket";
import { ticketResolvers } from "./ticketResolvers";
import { ApolloError } from "apollo-server";

export const resolvers = {
	Query: {
		events: async () => {
			try {
				return await Event.find().sort({ name: 1 });
			} catch (err) {
				throw new ApolloError("Error al obtener eventos");
			}
		},
		eventByCode: async (_: any, { code }: { code: string }) => {
			try {
				const event = await Event.findOne({ code });
				if (!event) {
					throw new ApolloError("Evento no encontrado", "NOT_FOUND");
				}
				return event;
			} catch (err) {
				throw new ApolloError("Error al obtener evento");
			}
		},
		ticketsByEvent: async (_: any, { eventId }: { eventId: string }) => {
			try {
				return await Ticket.find({ eventId });
			} catch (err) {
				throw new ApolloError("Error al obtener tickets");
			}
		},
	},

	Mutation: {
		...ticketResolvers.Mutation,
	},
};
