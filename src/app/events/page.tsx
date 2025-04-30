'use client';

import { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import EventCard from '../../components/events/EventCard';
import EventDetails from '../../components/events/EventDetails';
import { eventDetails } from '../../components/events/eventData';

export default function EventsPageWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EventsPage />
    </Suspense>
  );
}

function EventsPage() {
  const [detailsView, setDetailsView] = useState<null | number>(null);
  const [copiedIndex, setCopiedIndex] = useState<null | number>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventParam = searchParams.get('event');

  useEffect(() => {
    if (eventParam) {
      const idx = eventDetails.findIndex(e => e.slug === eventParam);
      setDetailsView(idx !== -1 ? idx : null);
    } else {
      setDetailsView(null);
    }
  }, [eventParam]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (detailsView !== null) {
      params.set('event', eventDetails[detailsView].slug);
      router.replace(`${window.location.pathname}?${params.toString()}`);
    } else {
      router.replace(window.location.pathname);
    }
  }, [detailsView, router]);

  if (detailsView !== null) {
    const event = eventDetails[detailsView];
    return (
      <EventDetails
        event={event}
        onBack={() => setDetailsView(null)}
        onShare={() => {
          navigator.clipboard.writeText(`${window.location.origin}/events?event=${event.slug}`);
          setCopiedIndex(detailsView);
          setTimeout(() => setCopiedIndex(null), 2000);
        }}
        copied={copiedIndex === detailsView}
      />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="flex flex-col items-center justify-center pb-[200px] mb-4 min-h-[85vh] text-primary p-8 max-[400px]:p-4 max-[352px]:p-2"
    >
      <h1 className="text-4xl font-extrabold text-primary-700 mb-8 text-center">Events</h1>
      <div className="grid gap-10 w-full max-w-4xl">
        {eventDetails.map((event, idx) => (
          <div key={event.slug}>
            <EventCard
              event={event}
              onDetails={() => setDetailsView(idx)}
              onShare={() => {
                navigator.clipboard.writeText(`${window.location.origin}/events?event=${event.slug}`);
                setCopiedIndex(idx);
                setTimeout(() => setCopiedIndex(null), 2000);
              }}
              copied={copiedIndex === idx}
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
