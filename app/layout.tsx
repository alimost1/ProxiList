import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { DarkModeProvider } from "@/components/DarkModeProvider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ProxiList — Find trusted local professionals fast",
    template: "%s | ProxiList",
  },
  description:
    "Search and discover trusted local professionals near you. Compare ratings, read reviews, and connect with businesses in your area.",
  keywords: [
    "local businesses",
    "professionals",
    "directory",
    "reviews",
    "services",
  ],
  openGraph: {
    title: "ProxiList — Find trusted local professionals fast",
    description:
      "Search and discover trusted local professionals near you. Compare ratings, read reviews, and connect with businesses in your area.",
    type: "website",
    locale: "en_US",
    siteName: "ProxiList",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col font-sans">
        <DarkModeProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </DarkModeProvider>
      </body>
    </html>
  );
}
