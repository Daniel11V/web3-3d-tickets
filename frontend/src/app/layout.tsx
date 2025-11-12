import "./globals.css";
import { ReactNode } from "react";

export const metadata = {
  title: "Web3 3D Tickets",
  description: "Sistema de tickets 3D con blockchain y React Three Fiber",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" className="dark">
      <body className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center">
        <header className="w-full py-4 px-6 bg-gray-900 border-b border-gray-800 shadow-md">
          <h1 className="text-xl font-semibold text-teal-400 tracking-wide">
            🎟️ Web3 3D Tickets
          </h1>
        </header>
        <main className="flex-1 w-full max-w-5xl p-6">{children}</main>
        <footer className="py-4 text-sm text-gray-500">
          © {new Date().getFullYear()} Web3 3D Tickets. Todos los derechos
          reservados.
        </footer>
      </body>
    </html>
  );
}
