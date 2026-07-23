import type { Metadata } from "next";
import "./globals.css";
import { GameProvider } from "@/lib/game";
import Hud from "@/components/Hud";
import Backdrop from "@/components/Backdrop";
import SectionImage from "@/components/SectionImage";
import Loader from "@/components/Loader";
import Nav from "@/components/Nav";

export const metadata: Metadata = {
  title: "Sahil Bhat — Senior Software Engineer",
  description:
    "Portfolio of Sahil Bhat: Senior Software Engineer specializing in React, Next.js, and TypeScript.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Shrikhand&family=Pirata+One&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="trails">
        <Backdrop />
        <SectionImage />
        <Nav />
        <GameProvider>
          {children}
          <Hud />
        </GameProvider>
        <div
          className="pointer-events-none fixed inset-0 z-[59]"
          style={{
            background:
              "radial-gradient(120% 100% at 50% 45%, transparent 55%, rgba(0,0,0,0.6) 100%)",
          }}
        />
        <div className="grain-layer grain-tex pointer-events-none fixed inset-0 z-[60] animate-grain opacity-[0.12] mix-blend-overlay" />

        {/* subtle corner hint, styled but plain-language */}
        <div className="pointer-events-none fixed bottom-3 left-4 z-40 hidden select-none text-[0.62rem] uppercase leading-relaxed tracking-[0.18em] text-sand-dim/80 sm:block">
          Scroll to explore<br />Esc — back to top
        </div>

        <Loader />
      </body>
    </html>
  );
}
