import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/footer/Footer";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Gujranwala Medical College Islamic Society",
  description: "Connecting students and faculty through faith, service, and community at Gujranwala Medical College.",
  keywords: ["GMC", "Islamic Society", "Medical College", "Gujranwala", "Society"],
  icons: {
    icon: '/logo.ico',
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://gmc-islamic-society.vercel.app/", // Update to your actual site URL if different
    title: "Gujranwala Medical College Islamic Society",
    description: "Connecting students and faculty through faith, service, and community at Gujranwala Medical College.",
    siteName: "GMC Islamic Society",
    images: [
      {
        url: "/logo.png", // Ensure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "GMCIS - Gujranwala Medical College Islamic Society",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased min-h-screen flex flex-col`}>
        <Analytics />
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
