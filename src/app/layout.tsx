import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projeto InformAção — Educação Solidária e Popular em Amparo (SP)",
  description:
    "Movimento educacional comunitário fundado em 2014 em Amparo (SP). Cursinho pré-vestibular popular 100% gratuito transformando vidas e abrindo portas nas universidades públicas.",
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" }
    ],
    apple: [
      { url: "/favicon-192.png", sizes: "192x192", type: "image/png" }
    ]
  },
  openGraph: {
    title: "Projeto InformAção — Educação Solidária e Popular",
    description:
      "Cursinho pré-vestibular popular 100% gratuito fundado em 2014 na histórica Praça Pádua Salles em Amparo (SP).",
    images: [{ url: "/founders/comunidade_aula.webp" }]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased selection:bg-[#FFB30F] selection:text-[#1C1F26]">
        {children}
      </body>
    </html>
  );
}
