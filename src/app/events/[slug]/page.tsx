import type { Metadata } from "next";
import { eventDetails } from '@/components/events/eventData';
import EventClient from "./EventClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const event = eventDetails.find(e => e.slug === params.slug);
  if (!event) return { title: 'Event Not Found | GMC Islamic Society' };
  const baseUrl = 'https://gmc-islamic-society.vercel.app';
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
      ...(event.speakers ? event.speakers.map(s => s.name) : [])
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

export default function EventPage({ params }: { params: { slug: string } }) {
  return <EventClient slug={params.slug} />;
}