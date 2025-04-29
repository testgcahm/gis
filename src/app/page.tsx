'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animation variants for parent and children
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};
const childVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

// Custom hook to detect if an element is in view
function useInView<T extends HTMLElement = HTMLElement>(threshold = 0.2): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (inView) return; // Lock once in view
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold, inView]);

  return [ref, inView];
}

export default function Home() {
  const [heroRef, heroInView] = useInView<HTMLElement>(0.3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: heroInView ? 1 : 0 }}
          transition={{ duration: 1 }}
          className={`inset-0 transition-opacity z-0 duration-1000 ${heroInView ? 'opacity-100' : 'opacity-0'} w-full h-full absolute top-[82px] left-0`}
        >
          <Image
            src="/background.jpg"
            alt="Hero Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
          <div className="inset-0 bg-black/50 w-full h-full absolute top-0 left-0 pointer-events-none" />
        </motion.div>
        <div className="text-center px-4 z-20 flex flex-col items-center justify-center h-full w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={heroInView ? 'show' : 'hidden'}
            className="flex flex-col items-center w-full"
          >
            <motion.div variants={childVariants}>
              <Image
                src="/logo.png"
                alt="GIS Logo"
                width={180}
                height={180}
                className="mx-auto mb-6"
              />
            </motion.div>
            <motion.h1
              variants={childVariants}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              GMC Islamic Society
            </motion.h1>
            <motion.p
              variants={childVariants}
              className="text-3xl xs:text-4xl sm:text-6xl font-bold text-secondary-400 mb-10"
            >
              Coming Soon
            </motion.p>
            <motion.div variants={childVariants}>
              <Link href="/contact" className="bg-secondary hover:bg-logo-tertiary text-primary-800  font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 transform">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
