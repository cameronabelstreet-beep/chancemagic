import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Nav } from "@/components/layout/Nav";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ray Chance — Illusionist. Mentalist. Unforgettable.",
  description:
    "Illusionist street magician Ray Chance. Member of the Academy of Magical Arts at the Magic Castle. Performances for Coca-Cola, Walt Disney, Thomson Reuters, the Toronto Raptors and more.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="font-sans bg-background text-on-background">
        <SmoothScroll />
        <Nav />
        {children}
      </body>
    </html>
  );
}
