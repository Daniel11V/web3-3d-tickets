import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors"; // Importamos los colores

const config: Config = {
	darkMode: "class",
	content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
	theme: {
		extend: {
			colors: {
				// Definimos tu nuevo color primario (un azul profesional)
				primary: colors.blue,
				// Mantenemos el fondo oscuro
				gray: colors.gray,
			},
			// Añadimos un 'drop-shadow' con color para el ticket
			dropShadow: {
				primary: "0 10px 20px rgba(37, 99, 235, 0.25)", // Sombra azul
			},
		},
	},
	plugins: [],
};

export default config;
