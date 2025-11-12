import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",
        secondary: "#0f766e",
      },
    },
  },
  plugins: [],
};

export default config;
