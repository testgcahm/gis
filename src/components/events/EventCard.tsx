'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { EventData } from './types';
import Link from 'next/link';

interface EventCardProps {
  event: EventData;
}

const EventCard = ({ event }: EventCardProps) => {

  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const url = `${window.location.origin}/events/${event.slug}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className=" border border-primary-200/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex flex-col lg:flex-row">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center text-center overflow-hidden"
          style={{ backgroundImage: `url('${event.image}')` }}
          title={event.title}
        ></div>
        <div className="bg-white/80 p-4 flex flex-col justify-between leading-normal flex-grow">
          <div className="mb-4 lg:mb-8">
            <p className="text-sm text-gray-600 flex items-center mb-1">
              <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
              </svg>
              {event.audience}
            </p>
            <div className="text-primary-900 font-bold text-xl mb-2">{event.title}</div>
            <p className="text-primary-700 text-base">{event.description.split('\n')[0]}</p>
          </div>
          <div className={`flex flex-row ${event.register ? 'max-[540px]:flex-col' : 'max-[430px]:flex-col'} items-start justify-between gap-4`}>
            <div className="flex items-center">
              <Image className="rounded-full mr-1" src="/logo.png" alt="GMC Logo" width={48} height={48} />
              <div className="text-sm">
                <p className="text-primary-900 leading-none">GMC Team</p>
                <p className="text-gray-600">{event.date}</p>
              </div>
            </div>
            <div className={`flex gap-2 flex-shrink-0 w-auto ${event.register ? 'max-[540px]:w-full max-[540px]:justify-center' : 'max-[430px]:w-full max-[430px]:justify-center'} max-[350px]:flex-col max-[350px]:w-full`}>
              <Link href={`/event/${event.slug}`}><button className="max-w-[120px] max-[350px]:max-w-full w-full bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none">Details</button></Link>
              {event.register && (
                <Link href='/register'><button className="max-w-[120px] max-[350px]:max-w-full w-full bg-secondary hover:bg-secondary/80 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none">Register</button></Link>
              )}
              <button
                className="relative max-w-[120px] max-[350px]:max-w-full w-full bg-primary text-white font-bold px-4 py-2 rounded-lg shadow-sm border border-primary-400 hover:bg-primary-500 transition-all duration-200 focus:outline-none"
                onClick={onShare}
                title="Copy event link"
              >
                Share
                {copied && (
                  <span className="absolute -top-4 -left-[14px] ml-2 -translate-y-1/2 text-xs text-primary bg-white px-2 py-1 rounded shadow animate-bounce whitespace-nowrap z-10">Link Copied!</span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
};

export default EventCard;
