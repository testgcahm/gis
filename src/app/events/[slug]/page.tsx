import EventClient from "./EventClient";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/api/events`);
  const eventsArray = await res.json();
  const event = eventsArray.find((e: any) => e.slug === slug);
  if (!event) return { title: 'Event Not Found | GMC Islamic Society' };
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
      ...(event.speakers ? event.speakers.map((s: any) => s.name) : [])
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

export async function generateStaticParams() {
  const res = await fetch(`${baseUrl}/api/events`);
  const eventsArray = await res.json();
  return eventsArray.map((event: any) => ({ slug: event.slug }));
}

// This page and all event slugs are statically generated at build time using event data.
// To update, trigger a new build after event data changes.
export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const res = await fetch(`${baseUrl}/api/events`);
  const eventsArray = await res.json();
  const event = eventsArray.find((e: any) => e.slug === slug);
  if (!event) return null;
  return <EventClient event={event} />;
}