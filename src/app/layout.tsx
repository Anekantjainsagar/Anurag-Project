import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Your Brand - Pure Quality. Premium Taste. | Pure Food. Better Life.",
  description:
    "We bring you premium quality Rice, Pulses, Dry Fruits, Millets, Spices and more, sourced from trusted farms and delivered with purity and care to your table.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${jakarta.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-[#074326] selection:text-white">
        {children}
      </body>
    </html>
  );
}
