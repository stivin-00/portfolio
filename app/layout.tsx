import type { Metadata, Viewport } from "next";
import { Archivo, Special_Elite, Playfair_Display } from "next/font/google";
import "./globals.css";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import GrainOverlay from "@/components/GrainOverlay";
import Cursor from "@/components/Cursor";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { BOOT_SCRIPT } from "@/lib/intro";
import { profile } from "@/lib/data";

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

const SITE_TITLE = "Ekele Stephen Agbakwuru — Frontend & Full-Stack Engineer";
const SITE_DESCRIPTION =
  "Frontend and full-stack engineer in Lagos with 4+ years building fintech, logistics, healthcare and enterprise products. Open to hybrid or remote roles.";
const OG_IMAGE = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Ekele Stephen Agbakwuru: I build fintech and enterprise products people trust with their money and their work.",
};

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: {
    default: SITE_TITLE,
    template: `%s | ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: `${profile.handle} — ${profile.name}`,
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: `${profile.handle} — ${profile.name}`,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE.url],
  },
  robots: {
    index: true,
    follow: true,
  },
  formatDetection: { telephone: false },
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
