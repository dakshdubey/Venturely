import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import Aurora from "@/components/Aurora";
import CustomCursor from "@/components/CustomCursor";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap"
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap"
});

export const metadata: Metadata = {
  title: "Venturely | Architectural Digital Lab",
  description: "A premium design laboratory engineering high-end software solutions with architectural precision.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body className="antialiased bg-dark-charcoal">
        <div className="fixed inset-0 z-0 pointer-events-none opacity-60">
          <Aurora
            colorStops={["#A855F7", "#1B1819", "#7C3AED"]}
            blend={0.5}
            amplitude={1.2}
            speed={0.3}
          />
        </div>
        <div className="fixed inset-0 z-[1] pointer-events-none glossy-overlay" />
        <div className="relative z-10">
          <CustomCursor />
          {children}
        </div>
      </body>
    </html>
  );
}
