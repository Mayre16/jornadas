import type { Metadata } from "next";
import { Outfit, Source_Serif_4 } from "next/font/google";
import { ReservaProvider } from "@/components/ReservaCart";
import { SiteShell } from "@/components/SiteShell";
import "./globals.css";

const sans = Outfit({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: {
    default: "Jornadas Centroamérica y el Caribe 2026 · Nueva Acrópolis RD",
    template: "%s · Jornadas 2026",
  },
  description:
    "XXXI Reunión de Coordinación y XXXVI Jornadas del Área, Centroamérica y el Caribe. Santo Domingo, 14 al 17 de octubre de 2026. Hotel Crowne Plaza.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${sans.variable} ${serif.variable}`}>
      <body>
        <ReservaProvider>
          <SiteShell>{children}</SiteShell>
        </ReservaProvider>
      </body>
    </html>
  );
}
