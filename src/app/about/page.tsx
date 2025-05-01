import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: 'About | GMC Islamic Society',
  description: 'Learn about the mission, values, and origins of the Gujranwala Medical College Islamic Society.',
  keywords: [
    "GMC Islamic Society",
    "Gujranwala Medical College",
    "Islamic Society",
    "GMC",
    "Medical College",
    "Gujranwala",
    "Society",
    "About GMC",
    "Mission",
    "Values"
  ],
  icons: {
    icon: '/logo.ico',
  },
  alternates: {
    canonical: 'https://gmc-islamic-society.vercel.app/about',
  },
  openGraph: {
    title: 'About | GMC Islamic Society',
    description: 'Learn about the mission, values, and origins of the Gujranwala Medical College Islamic Society.',
    url: 'https://gmc-islamic-society.vercel.app/about',
    siteName: 'GMC Islamic Society',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'About GMC Islamic Society',
      },
    ],
    type: 'article',
    locale: 'en_US',
  },
};

export default function AboutPage() {
  return <AboutClient />;
}