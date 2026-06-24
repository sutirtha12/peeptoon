import type { Metadata } from "next";
import { Archivo, Hanken_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Background from "@/components/Background";
import ScrollFX from "@/components/ScrollFX";
import LoadingIntro from "@/components/LoadingIntro";

const display = Archivo({ subsets: ["latin"], display: "swap", variable: "--font-display-var", weight: ["600", "700", "800", "900"] });
const sans = Hanken_Grotesk({ subsets: ["latin"], display: "swap", variable: "--font-sans-var" });
const mono = JetBrains_Mono({ subsets: ["latin"], display: "swap", variable: "--font-mono-var" });

export const metadata: Metadata = {
  title: "Peeptoon — Ship Smarter, Faster, Cheaper | Pan-India & International Courier",
  description:
    "Peeptoon ships across India and to 200+ countries — B2B & B2C parcels, documents, international courier, warehousing & dropshipping. One click, one quote, big savings.",
  metadataBase: new URL("https://peeptoon.com"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <LoadingIntro />
        <Background />
        <SmoothScroll>{children}</SmoothScroll>
        <ScrollFX />
      </body>
    </html>
  );
}
