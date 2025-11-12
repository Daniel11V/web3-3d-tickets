import { gql } from "apollo-server";

export const typeDefs = gql`
  type Event {
    id: ID!
    code: String!
    name: String!
    logoUrl: String
    description: String
  }

  type Ticket {
    id: ID!
    eventId: ID!
    user: String!
    createdAt: String!
  }

  type Query {
    events: [Event!]!
    eventByCode(code: String!): Event
    ticketsByEvent(eventId: ID!): [Ticket!]!
  }

  type Mutation {
    createTicket(eventId: ID!, user: String!): Ticket!
  }
`;
