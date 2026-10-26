import type { Metadata } from "next";
import { Hanken_Grotesk, IBM_Plex_Mono } from "next/font/google";
import { CustomCursor } from "@/components/custom-cursor";
import "./globals.css";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://northstar.tech"),
  title: {
    default: "Northstar Technology",
    template: "%s — Northstar Technology",
  },
  description:
    "An independent product studio. We build software for problems worth solving carefully — then get out of the way.",
  openGraph: {
    title: "Northstar Technology",
    description: "Technology that gives people better direction.",
    siteName: "Northstar Technology",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${hanken.variable} ${ibmPlexMono.variable} antialiased`}>
        <noscript>
          {/* Reveals wait for scripts; without them, show everything. */}
          <style>{`
            [data-reveal][data-in="false"] { opacity: 1 !important; transform: none !important; }
            [data-reveal="wipe"][data-in="false"] > * { clip-path: none !important; }
            .glyph-line { stroke-dashoffset: 0 !important; }
            .glyph-star { opacity: 1 !important; }
            .count { animation: none !important; }
          `}</style>
        </noscript>
        {children}
        <CustomCursor />
      </body>
    </html>
  );
}
