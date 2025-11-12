import { pool } from "../db";

export const ticketResolvers = {
  Mutation: {
    createTicket: async (
      _: any,
      { eventId, user }: { eventId: string; user: string }
    ) => {
      const res = await pool.query(
        "INSERT INTO tickets (eventId, user, createdAt) VALUES ($1, $2, NOW()) RETURNING *",
        [eventId, user]
      );
      return res.rows[0];
    },
  },
};
