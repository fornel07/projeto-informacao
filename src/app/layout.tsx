import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Projeto InformAção — Cursinho Popular Gratuito em Amparo (SP)",
  description:
    "Cursinho popular e comunitário 100% gratuito fundado em 2014 em Amparo (SP). Colaborando na formação pessoal e no desenvolvimento de projetos de vida para promover a transformação social.",
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
    title: "Projeto InformAção — Cursinho Popular em Amparo (SP)",
    description:
      "Educação solidária, comunitária e 100% gratuita preparando estudantes da rede pública para os vestibulares.",
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
      <body className="antialiased selection:bg-[#074BED] selection:text-white bg-white text-black">
        {children}
      </body>
    </html>
  );
}
