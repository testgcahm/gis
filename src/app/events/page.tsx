'use client';

import { motion } from 'framer-motion';
import useInView from '../../components/useInView';
import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function EventsPage() {
    const [ref1, inView1] = useInView<HTMLDivElement>(0.2);
    const [ref2, inView2] = useInView<HTMLDivElement>(0.2);
    const [detailsView, setDetailsView] = useState<null | number>(null);
    const searchParams = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const router = useRouter();

    // Details content for each event
    const eventDetails = [
        {
            slug: 'islamic-fiesta',
            title: "GMC Islamic Fiesta'2025",
            date: 'May 7, 2025',
            time: '10:00 AM - 2:00 PM',
            venue: 'Gujranwala Medical College Teaching Hospital, Auditorium, 3rd Floor',
            activities: 'Guest Speakers, Naat and Qiran Competitions, Refreshments',
            audience: 'Registered Members or Gemcians only',
            description: 'Join us for a day of inspiration, learning, and fun! For more info, contact the GMC Team.',
            image: '/gmc_fiesta.jpeg',
        },
        {
            slug: 'friday-sessions',
            title: 'Friday Sessions',
            date: 'Every Friday',
            time: '12:00 PM - 12:30 PM',
            venue: 'Gujranwala Medical College, Lecture Hall',
            activities: 'Lectures, Guest Speakers, Dawah',
            audience: 'Open to all',
            description: 'No registration required. Just walk in and join the conversation!',
            image: '/Firday_sessions.png',
        },
    ];

    // Open details if ?event=slug is in URL
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const params = new URLSearchParams(window.location.search);
        const eventParam = params.get('event');
        if (eventParam) {
            const idx = eventDetails.findIndex(e => e.slug === eventParam);
            if (idx !== -1) setDetailsView(idx);
        }
    }, []);

    // When detailsView changes, update URL
    useEffect(() => {
        if (typeof window === 'undefined') return;
        if (detailsView !== null) {
            const params = new URLSearchParams(window.location.search);
            params.set('event', eventDetails[detailsView].slug);
            router.replace(`?${params.toString()}`);
        } else {
            const params = new URLSearchParams(window.location.search);
            params.delete('event');
            router.replace(`?${params.toString()}`);
        }
    }, [detailsView, router]);

    if (detailsView !== null) {
        const event = eventDetails[detailsView];
        return (
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="min-h-[85vh] text-primary p-0 flex flex-col mx-3 md:mx-8 mb-8"
            >
                <button
                    onClick={() => setDetailsView(null)}
                    className="m-4 sm:m-6 md:m-8 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg text-sm md:text-base font-semibold shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-400 self-start transition-all duration-300 flex items-center gap-2 border border-primary-400 hover:translate-x-[-5px]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Events
                </button>
                {/* Event Title Heading OUTSIDE the box */}
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary-900 mb-4 mt-2 text-center w-full flex items-center justify-center gap-2">
                    {event.title}
                </h2>
                <div className="flex flex-col min-[975px]:space-x-8 min-[975px]:flex-row min-[975px]:items-start items-center justify-center">
                    {/* Image centered for all screens */}
                    <div className="mb-8 min-[975px]:mb-0 flex-col max-w-[500px] space-y-6 w-full flex items-center justify-center">
                        <img 
                            src={event.image} 
                            alt={event.title} 
                            className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-contain h-auto rounded-xl shadow border border-primary-100 bg-white" 
                        />
                    </div>
                    {/* Details box with reduced coloring and spacing like register page */}
                    <div className="w-full min-[975px]:min-w-[520px] min-[975px]:max-w-[750px] max-[975px]:max-w-[750px] border border-primary-300 p-8 rounded-2xl shadow-[2px_2px_8px_2px_rgba(102,102,153,0.3)] flex flex-col gap-6 md:gap-8 bg-white/70">
                        <section>
                            <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 text-primary-800 border-b border-primary-100 pb-2">Event Information</h3>
                            <ul className="list-none pl-0 space-y-2 md:space-y-3 text-primary-800 text-sm sm:text-base md:text-lg mb-3">
                                <li className="flex flex-col sm:flex-row"><strong className="w-24 sm:w-28 flex-shrink-0">Date:</strong> <span>{event.date}</span></li>
                                <li className="flex flex-col sm:flex-row"><strong className="w-24 sm:w-28 flex-shrink-0">Time:</strong> <span>{event.time}</span></li>
                                <li className="flex flex-col sm:flex-row"><strong className="w-24 sm:w-28 flex-shrink-0">Venue:</strong> <span>{event.venue}</span></li>
                                <li className="flex flex-col sm:flex-row"><strong className="w-24 sm:w-28 flex-shrink-0">Activities:</strong> <span>{event.activities}</span></li>
                                <li className="flex flex-col sm:flex-row"><strong className="w-24 sm:w-28 flex-shrink-0">Audience:</strong> <span>{event.audience}</span></li>
                            </ul>
                            <p className="text-primary-700 text-sm sm:text-base md:text-lg mt-3 md:mt-4">{event.description}</p>
                        </section>
                        {detailsView === 0 && (
                            <section>
                                <h3 className="font-semibold text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 text-primary-800 border-b border-primary-100 pb-2">Speakers</h3>
                                <div className="space-y-4 md:space-y-5 mt-4">
                                    <div>
                                        <span className="font-bold text-base sm:text-lg text-primary-900">Saqib Raza Mustafai</span>
                                        <p className="text-primary-700 text-sm sm:text-base mt-1">A renowned Islamic scholar and speaker, Saqib Raza Mustafai is known for his engaging lectures and deep knowledge of Islamic teachings. He has inspired audiences worldwide with his wisdom and eloquence.</p>
                                    </div>
                                    <div>
                                        <span className="font-bold text-base sm:text-lg text-primary-900">Raja Zia ul Haqq</span>
                                        <p className="text-primary-700 text-sm sm:text-base mt-1">Raja Zia ul Haqq is a prominent motivational speaker and Islamic educator. He is recognized for his dynamic presentations and commitment to youth empowerment and community development.</p>
                                    </div>
                                </div>
                            </section>
                        )}
                        {detailsView === 0 && (
                            <div className="flex justify-center mt-4 md:mt-6">
                                <a href="/register">
                                    <button className="bg-secondary hover:bg-secondary/90 text-white font-bold px-5 py-2 sm:px-6 sm:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary/50 text-sm sm:text-base md:text-lg">Register for Fiesta</button>
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center pb-[200px] min-h-[85vh] text-primary p-8"
        >
            <h1 className="text-4xl font-extrabold text-primary-700 mb-8 text-center">Events</h1>
            <div className="grid gap-10 w-full max-w-4xl">
                {/* Event 1 */}
                <motion.div
                    ref={ref1}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={inView1 ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
                    className="w-full border border-primary-200/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div
                      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center text-center overflow-hidden"
                      style={{ backgroundImage: "url('/gmc_fiesta.jpeg')" }}
                      title="GMC Islamic Fiesta 2025"
                    ></div>
                    <div className="bg-white/80 p-4 flex flex-col justify-between leading-normal flex-grow">
                      <div className="mb-4 lg:mb-8">
                        <p className="text-sm text-gray-600 flex items-center mb-1">
                          <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                          </svg>
                          Members only
                        </p>
                        <div className="text-primary-900 font-bold text-xl mb-2">GMC Islamic Fiesta'2025</div>
                        <p className="text-primary-700 text-base">Experience a vibrant celebration of culture, learning, and community at the GMC Islamic Fiesta. Enjoy talks, activities, and more!</p>
                      </div>
                      <div className="flex max-[460px]:flex-col flex-row items-start justify-between gap-4">
                        <div className="flex items-center">
                          <img className="w-12 h-12 rounded-full mr-1" src="/logo.png" alt="GMC Logo" />
                          <div className="text-sm">
                            <p className="text-primary-900 leading-none">GMC Team</p>
                            <p className="text-gray-600">May 7, 2025</p>
                          </div>
                        </div>
                        <div className="flex gap-2 max-[460px]:items-center max-[460px]:justify-center flex-shrink-0 max-[460px]:w-full w-auto">
                          <button onClick={() => setDetailsView(0)} className="max-w-[120px] bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300">Details</button>
                          <button
                            className="max-w-[120px] bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 border border-primary-200"
                            onClick={() => {
                              navigator.clipboard.writeText(`${window.location.origin}/events?event=${eventDetails[0].slug}`);
                            }}
                            title="Copy shareable link"
                          >
                            Share
                          </button>
                          <a href="/register">
                            <button className="max-w-[120px] bg-secondary hover:bg-secondary/80 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-secondary/50">Register</button>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Event 2 */}
                <motion.div
                    ref={ref2}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={inView2 ? { scale: 1, opacity: 1 } : {}}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.4 }}
                    className="w-full border border-primary-200/40 rounded-2xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="flex flex-col lg:flex-row">
                    <div
                      className="h-48 lg:h-auto lg:w-48 flex-none bg-cover bg-center text-center overflow-hidden"
                      style={{ backgroundImage: "url('/Firday_sessions.png')" }}
                      title="Friday Sessions"
                    ></div>
                    <div className="bg-white/80 p-4 flex flex-col justify-between leading-normal flex-grow">
                      <div className="mb-4 lg:mb-8">
                        <p className="text-sm text-gray-600 flex items-center mb-1">
                          <svg className="fill-current text-gray-500 w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M4 8V6a6 6 0 1 1 12 0v2h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-8c0-1.1.9-2 2-2h1zm5 6.73V17h2v-2.27a2 2 0 1 0-2 0zM7 6v2h6V6a3 3 0 0 0-6 0z" />
                          </svg>
                          Open to all
                        </p>
                        <div className="text-primary-900 font-bold text-xl mb-2">Friday Sessions</div>
                        <p className="text-primary-700 text-base">Weekly Friday sessions featuring engaging discussions, learning, and networking opportunities for all attendees.</p>
                      </div>
                      <div className="flex max-[400px]:flex-col flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center">
                          <img className="w-12 h-12 rounded-full mr-1" src="/logo.png" alt="GMC Logo" />
                          <div className="text-sm">
                            <p className="text-primary-900 leading-none">GMC Team</p>
                            <p className="text-gray-600">Every Friday</p>
                          </div>
                        </div>
                        <div className="flex gap-2 max-[400px]:justify-center flex-shrink-0 max-[400px]:w-full w-auto">
                            <button onClick={() => setDetailsView(1)} className="flex-1 sm:flex-none max-w-[120px] bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300">Details</button>
                            <button
                              className="max-w-[120px] bg-primary-100 hover:bg-primary-200 text-primary-700 font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-200 border border-primary-200"
                              onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/events?event=${eventDetails[1].slug}`);
                              }}
                              title="Copy shareable link"
                            >
                              Share
                            </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            </div>
        </motion.div>
    );
}