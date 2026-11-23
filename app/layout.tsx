import type { Metadata, Viewport } from "next";
import { Archivo, Special_Elite, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BOOT_SCRIPT } from "@/lib/intro";

// Variable fonts: one file per style instead of one per weight.
const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
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
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ekele Stephen Agbakwuru — Frontend / Full-Stack Engineer",
  description:
    "A dossier of work by Ekele Stephen \"Stivin\" Agbakwuru — a frontend and full-stack engineer in Lagos, Nigeria, building fintech, logistics, healthcare and enterprise products.",
  openGraph: {
    title: "Ekele Stephen Agbakwuru — Frontend / Full-Stack Engineer",
    description: "A dossier of work by Ekele Stephen Agbakwuru",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${specialElite.variable} ${playfair.variable}`}
      // The boot script adds data-js / data-intro before hydration.
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT_SCRIPT }} />
      </head>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <GrainOverlay />
        <div className="plate-vignette" aria-hidden="true" />
        <Cursor />
        <AnalyticsProvider>
          <Nav />
          {children}
          <Footer />
        </AnalyticsProvider>
      </body>
    </html>
  );
}
