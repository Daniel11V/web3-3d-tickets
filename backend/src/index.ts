import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers/eventResolvers";
import { connectDB } from "./db"; // <-- Importa la nueva conexión

dotenv.config();

const PORT = process.env.PORT || 4000;

(async () => {
	// 1. Conecta a la base de datos (y corre el seed)
	await connectDB();

	// 2. Inicia Apollo Server
	const server = new ApolloServer({
		typeDefs,
		resolvers,
		cors: {
			origin: "http://localhost:3000", // CORS que agregamos antes
			credentials: true,
		},
	});

	server.listen({ port: PORT }).then(({ url }) => {
		console.log(`🚀 Server listo en ${url}`);
	});
})();
