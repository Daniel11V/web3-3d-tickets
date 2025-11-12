import { pool } from "../db";
import { ticketResolvers } from "./ticketResolvers";

export const resolvers = {
  Query: {
    events: async () => {
      const res = await pool.query("SELECT * FROM events ORDER BY id ASC");
      return res.rows;
    },
    eventByCode: async (_: any, { code }: { code: string }) => {
      const res = await pool.query("SELECT * FROM events WHERE code = $1", [
        code,
      ]);
      return res.rows[0];
    },
    ticketsByEvent: async (_: any, { eventId }: { eventId: string }) => {
      const res = await pool.query("SELECT * FROM tickets WHERE eventId = $1", [
        eventId,
      ]);
      return res.rows;
    },
  },

  Mutation: {
    ...ticketResolvers.Mutation,
  },
};
