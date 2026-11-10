import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { ConfirmProvider } from "@/context/ConfirmContext";
import StoreLayout from "@/components/StoreLayout";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#014d1e",
};

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
  title: "ONAAR - 100% Certified Organic Food Products | Pure Food. Better Life.",
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
      data-scroll-behavior="smooth"
      className={`${jakarta.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col font-sans bg-white text-gray-900 selection:bg-[#01722C] selection:text-white overflow-x-hidden">
        <AuthProvider>
          <CartProvider>
            <ConfirmProvider>
              <StoreLayout>{children}</StoreLayout>
            </ConfirmProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
