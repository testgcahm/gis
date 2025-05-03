'use client';

import { motion } from 'framer-motion';
import EventCard from '../../components/events/EventCard';
import { EventData } from '@/components/events/types';

interface EventsClientProps {
  events: EventData[];
}

export default function EventsClient({ events }: EventsClientProps) {
  // Ensure events is always an array
  const safeEvents = Array.isArray(events) ? events : [];

  if (safeEvents.length === 0) {
    return <div className="text-center text-red-600 text-3xl font-bold my-20">No events found.</div>;
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
        {safeEvents.map((event) => (
          <div key={event.slug}>
            <EventCard event={event} />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
