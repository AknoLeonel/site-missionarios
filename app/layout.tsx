import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

// Fonte Serifada para Títulos (Elegância/Tradição)
const playfair = Playfair_Display({ 
  subsets: ["latin"], 
  variable: "--font-playfair" 
});

// Fonte Sans para Texto (Modernidade/Leitura)
const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter" 
});

export const metadata: Metadata = {
  title: "AHMDF - Missionários",
  description: "Unindo comunidades através do esporte e da cultura.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br" className="scroll-smooth">
      <body className={`${playfair.variable} ${inter.variable} font-sans bg-slate-50 text-slate-900 antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}