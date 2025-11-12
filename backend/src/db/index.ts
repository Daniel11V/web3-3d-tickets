import mongoose from "mongoose";
import dotenv from "dotenv";
import { seedDatabase } from "../utils/seed";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

export const connectDB = async () => {
	if (!MONGODB_URI) {
		console.error("❌ MONGODB_URI no definida. Revisa tu .env");
		process.exit(1);
	}

	try {
		await mongoose.connect(MONGODB_URI);
		console.log("✅ MongoDB Conectado.");

		// Ejecuta el seeder después de conectar
		await seedDatabase();
	} catch (err: any) {
		console.error("❌ Error conectando a MongoDB:", err.message);
		process.exit(1);
	}
};
