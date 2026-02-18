import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI ROI Calculator",
  description: "Calcule o retorno real do investimento em ferramentas de IA",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        {children}
        <footer className="py-4 text-center text-slate-400 text-sm border-t border-slate-700 mt-auto">
          Criado por <a href="https://flaviomartil.com" className="text-cyan-400 hover:underline">Flavio Martil Dev</a>
        </footer>
      </body>
    </html>
  );
}
