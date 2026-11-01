import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
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
  title: "YOUR BRAND - 100% Certified Organic Food Products | Pure Food. Better Life.",
  description:
    "Shop certified organic Pulses, Millets, Spices, Honey, Dry Fruits, Seeds & Grains sourced directly from certified organic farms. 100% pure, unpolished, and lab-tested. Fast delivery across India.",
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
      <body className="min-h-full flex flex-col font-sans bg-white text-gray-900 selection:bg-[#01722C] selection:text-white">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}
