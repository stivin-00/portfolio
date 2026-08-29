import type { Metadata } from "next";
import { Fraunces, Archivo, Special_Elite, Playfair_Display } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-elite",
  weight: ["400"],
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekele Stephen Agbakwuru — Frontend / Full-Stack Engineer",
  description:
    "A dossier of work by Ekele Stephen \"Stivin\" Agbakwuru — a frontend and full-stack engineer in Lagos, Nigeria, building fintech, logistics, healthcare and enterprise products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${specialElite.variable} ${playfair.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
