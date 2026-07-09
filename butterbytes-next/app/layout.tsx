import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ButterBytes – Every Bite Feels Like Home",
  description:
    "Handcrafted bakery treats and savory snacks made with love in Chennai. Muffins, cookies, cupcakes, brownies, and more.",
  openGraph: {
    title: "ButterBytes – Every Bite Feels Like Home",
    description:
      "Handcrafted bakery treats and savory snacks made with love in Chennai.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakarta.variable} ${cormorant.variable} scroll-smooth`} style={{ overscrollBehavior: "none", scrollbarWidth: "none" }}>
      <body className="bg-cream text-brown antialiased font-sans" style={{ overscrollBehavior: "none" }}>
        {children}
      </body>
    </html>
  );
}
