import { Pool } from "pg";
import dotenv from "dotenv";
import { seedDatabase } from "../utils/seed";

dotenv.config();

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const initDB = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS events (
        id SERIAL PRIMARY KEY,
        code VARCHAR(10) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        logoUrl TEXT,
        description TEXT
      );
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tickets (
        id SERIAL PRIMARY KEY,
        eventId INTEGER REFERENCES events(id) ON DELETE CASCADE,
        user VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT NOW()
      );
    `);

    await seedDatabase(pool);
    console.log("✅ Database initialized and seeded.");
  } catch (err) {
    console.error("❌ Error initializing DB:", err);
  }
};
