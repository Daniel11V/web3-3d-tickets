import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/eventResolvers";
import { initDB } from "./db";

dotenv.config();

const PORT = process.env.PORT || 4000;

(async () => {
  await initDB();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
})();
