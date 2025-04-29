'use client';

import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import useInView from '../../components/useInView';

function useTypewriter(text: string, speed = 80) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!text || text.length === 0) {
      setDisplayed('');
      setDone(true);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return [displayed, done] as const;
}

export default function AboutPage() {
    const typewriterText = "Our goal is Allah's will & we strive hard only for rise of Islam, Islamic teachings & Islamic activities.";
    const [animatedText, done] = useTypewriter(typewriterText, 20);

    // In-view hooks for each section
    const [heroRef, heroInView] = useInView<HTMLDivElement>(0.2);
    const [valuesRef, valuesInView] = useInView<HTMLDivElement>(0.2);
    const [founderRef, founderInView] = useInView<HTMLDivElement>(0.2);
    const [ctaRef, ctaInView] = useInView<HTMLDivElement>(0.2);

    return (
        // Simplified container structure with explicit padding
        <div className="bg-gray-50 min-h-screen py-16 px-4">
            <div className="max-w-7xl mx-auto space-y-16 md:space-y-20">
                {/* Hero Section */}
                <motion.section
                    ref={heroRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={heroInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="bg-white rounded-xl shadow-lg border-l-3 border-l-primary border-b-3 border-b-secondary p-4 sm:p-8 md:p-12 flex flex-col items-center text-center first-block-text w-full max-w-[925px] mx-auto"
                >
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-4 drop-shadow-sm">GMC Islamic Society</h1>
                    <span className="inline-block bg-secondary text-primary-900 font-semibold px-4 py-1 rounded-full text-base mb-5">Who We Are</span>
                    <p className="text-lg sm:text-xl font-mono text-primary-700 max-w-3xl mx-auto mb-6 min-h-[2.5em] border-l-3 border-l-primary border-b-3 border-b-secondary pl-4 pr-2 py-2 bg-primary-50/60 shadow-inner rounded typewriter">
                      {animatedText}
                      <span className={`animate-pulse ${done ? 'invisible' : 'visible'}`}>|</span>
                    </p>
                    <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto mt-4">
                        GMC Islamic Society is dedicated to fostering Islamic values, education, and community activities. We aim to create a vibrant environment where everyone can learn, grow, and contribute to the betterment of society through Islamic teachings and service.
                    </p>
                </motion.section>

                {/* Founder Info Section */}
                <motion.section
                    ref={founderRef}
                    initial={{ opacity: 0, y: 30 }}
                    animate={founderInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
                    className="bg-white rounded-xl shadow-md border-l-3 border-l-secondary border-b-3 border-b-primary p-4 sm:p-6 md:p-8 flex flex-col items-center text-center w-full max-w-[925px] mx-auto"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary mb-4">Our Origins</h2>
                    <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                        The GMC Islamic Society was founded in <span className="font-semibold text-secondary">2015</span> by <span className="font-bold text-primary-700">Noor ul Hassan of G6</span>, with the vision to promote Islamic values and activities within the community.
                    </p>
                </motion.section>

                {/* Our Values */}
                <motion.section
                    ref={valuesRef}
                    initial={{ opacity: 0, x: -50 }}
                    animate={valuesInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className="flex flex-col items-center w-full max-w-[925px] mx-auto"
                >
                    <h2 className="text-2xl sm:text-3xl font-semibold text-secondary mb-12 tracking-tight">Our Core Values</h2>
                    <div className="grid max-sm:grid-cols-1 max-[960px]:grid-cols-2 min-[960px]:grid-cols-3 gap-8 md:gap-10 w-full">
                        {[ 
                            { title: "Faith", text: "We uphold and promote the core tenets of Islam in all our activities." },
                            { title: "Education", text: "We believe in empowering our community through Islamic and academic education." },
                            { title: "Unity", text: "We strive to bring people together for the common good and the rise of Islam." },
                            { title: "Service", text: "We serve our community with sincerity and dedication." },
                            { title: "Integrity", text: "We act with honesty and transparency in all our endeavors." }
                        ].map((value, index) => {
                            const [cardRef, cardInView] = useInView<HTMLDivElement>(0.2);
                            const directions = [
                                { x: -50, y: 0 }, // Left
                                { x: 50, y: 0 },  // Right
                                { x: 0, y: -50 }, // Top
                                { x: 0, y: 50 }   // Bottom
                            ];
                            const direction = directions[index % directions.length];

                            return (
                                <motion.div
                                    key={index}
                                    ref={cardRef}
                                    initial={{ opacity: 0, ...direction }}
                                    animate={cardInView && valuesInView ? { opacity: 1, x: 0, y: 0 } : {}}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.1 }}
                                    className="bg-white border-l-3 border-l-primary border-b-3 border-b-secondary rounded-xl p-6 shadow-md shadow-primary/50 max-w-[300px] flex flex-col items-center text-center hover:scale-105 transition-transform duration-300 mx-auto"
                                >
                                    <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 tracking-wide">{value.title}</h3>
                                    <p className="text-gray-700 text-base">{value.text}</p>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.section>

                {/* Call to Action */}
                <motion.section
                    ref={ctaRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={ctaInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex flex-col items-center text-center mt-16 w-full max-w-[925px] mx-auto"
                >
                    <span className="inline-block bg-secondary text-primary-900 font-semibold px-4 py-1 rounded-full text-base mb-4">Join Us</span>
                    <h2 className="text-2xl sm:text-3xl font-semibold text-primary-700 mb-5">Make a Difference</h2>
                    <p className="text-gray-700 mb-6 max-w-xl mx-auto text-lg">Support our mission by participating, volunteering, or spreading the word.</p>
                </motion.section>
            </div>
        </div>
    );
}