import { Event } from "../db/models/Event";

export const seedDatabase = async () => {
	const count = await Event.countDocuments();
	if (count > 0) {
		// console.log("DB ya tiene datos, no se necesita seed.");
		return;
	}

	const events = [
		{
			code: "123A",
			name: "Expo Emprende Argentina",
			logoUrl: "/logos/event-expo-emprende-argentina.png",
			description: "A technology and innovation conference.",
		},
		{
			code: "456B",
			name: "ElectroFest Cordoba",
			logoUrl: "/logos/event-electrofest-cordoba.png",
			description: "Explore blockchain and decentralized technologies.",
		},
		{
			code: "789C",
			name: "Academia de Arte",
			logoUrl: "/logos/event-academia-de-arte.png",
			description: "Discussing the future of AI and automation.",
		},
	];

	try {
		await Event.create(events);
		console.log("🌱 Seeded default events.");
	} catch (err) {
		console.error("❌ Error en el seeder:", err);
	}
};
