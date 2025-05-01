import type { Metadata } from "next";
import EventsClient from "./EventsClient";
import { EventData } from "@/components/events/types";
import { baseUrl } from "@/components/utils";

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

// Page component
export default async function EventsPage() {
  try {
    const apiUrl = `${baseUrl}/api/events`

    // Use fetch with force-cache to enable static generation at build time
    const res = await fetch(apiUrl);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    const data = await res.json();
    const events: EventData[] = data.eventsArray;
    return <EventsClient events={events} />;
  } catch (error) {
    console.error("Error fetching events:", error);
    return <EventsClient events={[]} />;
  }
}
