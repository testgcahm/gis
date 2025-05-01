import type { Metadata } from "next";
import EventsClientWrapper from "./EventsClient";

export const metadata: Metadata = {
  title: 'Events | GMC Islamic Society',
  description: 'See upcoming and past events organized by the Gujranwala Medical College Islamic Society.',
  keywords: [
    "GMC Islamic Society",
    "Gujranwala Medical College",
    "Islamic Society",
    "GMC",
    "Medical College",
    "Gujranwala",
    "Society",
    "Events",
    "Competitions",
    "Speakers"
  ],
  icons: {
    icon: '/logo.ico',
  },
  alternates: {
    canonical: 'https://gmc-islamic-society.vercel.app/events',
  },
  openGraph: {
    title: 'Events | GMC Islamic Society',
    description: 'See upcoming and past events organized by the Gujranwala Medical College Islamic Society.',
    url: 'https://gmc-islamic-society.vercel.app/events',
    siteName: 'GMC Islamic Society',
    images: [
      {
        url: '/og.png',
        width: 1200,
        height: 630,
        alt: 'GMC Islamic Society Events',
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default function EventsPage() {
  return <EventsClientWrapper />;
}
