import { EventData } from "@/components/events/types";
import EventClient from "./EventClient";
import { baseUrl } from "@/components/utils";
import { notFound } from "next/navigation";

// Helper to fetch events list
async function fetchEvents(): Promise<EventData[]> {
  try {
    const apiUrl = 'https://gis-pixs-projects-8c330907.vercel.app/api/events';
    // const apiUrl = 'http://localhost:3000/api/events';

      // Use fetch with force-cache for static generation
    const res = await fetch(apiUrl, { cache: 'force-cache' });

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }
    const data = await res.json();
    return data.eventsArray ?? [];
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
}

// Metadata generation for each event
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  // Await params as per Next.js 15's async params
  const { slug } = await params;
  const events = await fetchEvents();
  const event = events.find((e: EventData) => e.slug === slug);

  if (!event) {
    return { title: "Event Not Found | GMC Islamic Society" };
  }

  const url = `${baseUrl}/events/${event.slug}`;
  return {
    title: `${event.title} | GMC Islamic Society`,
    description: event.description.replace(/\n/g, ' '),
    keywords: [
      'GMC Islamic Society',
      'Gujranwala Medical College',
      'Islamic Society',
      'GMC',
      'Medical College',
      'Gujranwala',
      'Society',
      'Events',
      event.title,
      event.venue,
      ...(event.speakers?.map((s) => s.name) ?? [])
    ],
    icons: { icon: '/logo.ico' },
    alternates: { canonical: url },
    openGraph: {
      title: `${event.title} | GMC Islamic Society`,
      description: event.description.replace(/\n/g, ' '),
      url,
      siteName: 'GMC Islamic Society',
      images: [
        {
          url: event.image,
          width: 1200,
          height: 630,
          alt: event.title,
        },
      ],
      type: 'article',
      locale: 'en_US',
    },
  };
}

// Static paths generation
export async function generateStaticParams() {
  const events = await fetchEvents();
  return events.map((e: EventData) => ({ slug: e.slug }));
}

// Page component
export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  // Await params for dynamic routing
  const { slug } = await params;
  const events = await fetchEvents();
  const event = events.find((e: EventData) => e.slug === slug);

  if (!event) {
    notFound();
  }

  return <EventClient event={event} />;
}
