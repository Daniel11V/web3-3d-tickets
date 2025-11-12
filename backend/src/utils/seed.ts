import { Pool } from "pg";

export const seedDatabase = async (pool: Pool) => {
  const { rows } = await pool.query("SELECT COUNT(*) FROM events");
  if (parseInt(rows[0].count) > 0) return;

  const events = [
    {
      code: "123A",
      name: "Tech Summit 2025",
      logoUrl: "/logos/event1.png",
      description: "A technology and innovation conference.",
    },
    {
      code: "456B",
      name: "Web3 Global Expo",
      logoUrl: "/logos/event2.png",
      description: "Explore blockchain and decentralized technologies.",
    },
    {
      code: "789C",
      name: "AI & Robotics Forum",
      logoUrl: "/logos/event3.png",
      description: "Discussing the future of AI and automation.",
    },
  ];

  for (const e of events) {
    await pool.query(
      "INSERT INTO events (code, name, logoUrl, description) VALUES ($1, $2, $3, $4)",
      [e.code, e.name, e.logoUrl, e.description]
    );
  }

  console.log("🌱 Seeded default events.");
};
