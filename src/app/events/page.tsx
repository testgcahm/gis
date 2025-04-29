'use client';

import { motion } from 'framer-motion';
import useInView from '../../components/useInView';

export default function EventsPage() {
    // Add refs and inView states for each event
    const [ref1, inView1] = useInView<HTMLDivElement>(0.2);
    const [ref2, inView2] = useInView<HTMLDivElement>(0.2);
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
                          <button className="max-w-[120px] bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300">Details</button>
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
                            <button className="flex-1 sm:flex-none max-w-[120px] bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded-lg shadow-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-300">Details</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
            </div>
        </motion.div>
    );
}