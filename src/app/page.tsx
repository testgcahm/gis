import type { Metadata } from "next";
import HomeClient from "./HomeClient";

export const metadata: Metadata = {
  title: 'GMC Islamic Society | Home',
  description: 'Official site of the Gujranwala Medical College Islamic Society. Discover our mission, events, and how to get involved.',
  keywords: [
    "GMC Islamic Society",
    "Gujranwala Medical College",
    "Islamic Society",
    "GMC",
    "Medical College",
    "Gujranwala",
    "Society",
    "Events",
    "Register",
    "Contact",
    "About"
  ],
  icons: {
    icon: '/logo.ico',
  },
  alternates: {
    canonical: 'https://gmc-islamic-society.vercel.app/',
  },
  openGraph: {
    title: 'GMC Islamic Society | Home',
    description: 'Official site of the Gujranwala Medical College Islamic Society. Discover our mission, events, and how to get involved.',
    url: 'https://gmc-islamic-society.vercel.app/',
    siteName: 'GMC Islamic Society',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'GMC Islamic Society',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default function Home() {
  return <HomeClient />;
}
