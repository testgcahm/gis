'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FaRegLightbulb, FaCalendarAlt, FaUserPlus, FaEnvelope } from 'react-icons/fa';
import useInView from '../components/useInView';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.25,
    },
  },
};
const childVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease: 'easeInOut' } },
};

const isRegistrationOpen = new Date() <= new Date('2025-05-06T23:59:59');

const journeySteps = [
  {
    icon: <FaRegLightbulb className="text-4xl text-secondary mb-4" />,
    title: 'Our Mission',
    description: "We strive for the rise of Islam, fostering unity, education, and service in the GMC community.",
    link: '/about',
    button: 'Discover More',
    bg: 'bg-gradient-to-br from-[#f3eaff] via-[#e9ddff] to-[#f8fafc]'
  },
  {
    icon: <FaCalendarAlt className="text-4xl text-primary mb-4" />,
    title: 'Events & Activities',
    description: "Experience inspiring sessions, competitions, and gatherings. See what's coming up!",
    link: '/events',
    button: 'View Events',
    bg: 'bg-white'
  },
  isRegistrationOpen ? {
    icon: <FaUserPlus className="text-4xl text-logo-tertiary mb-4" />,
    title: 'Join the Movement',
    description: "Ready to be part of something meaningful? Register for our next event and make a difference.",
    link: '/register',
    button: 'Register Now',
    bg: 'bg-gradient-to-br from-[#e9ddff] via-[#f3eaff] to-[#f8fafc]'
  } : {
    icon: <FaUserPlus className="text-4xl text-logo-tertiary mb-4 opacity-50" />,
    title: 'Registration Closed',
    description: "Event registration is now closed. Stay tuned for future opportunities!",
    link: '/events',
    button: 'See Events',
    bg: 'bg-gradient-to-br from-[#e9ddff] via-[#f3eaff] to-[#f8fafc]'
  },
  {
    icon: <FaEnvelope className="text-4xl text-secondary mb-4" />,
    title: 'Connect With Us',
    description: "Questions, ideas, or feedback? Reach out and let’s grow together.",
    link: '/contact',
    button: 'Contact Us',
    bg: 'bg-white'
  }
];

export default function Home() {
  const [heroRef, heroInView] = useInView<HTMLElement>(0.3);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: heroInView ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
          className={`inset-0 transition-opacity z-0 duration-1000 ${heroInView ? 'opacity-100' : 'opacity-0'} w-full h-full absolute top-[82px] left-0`}
        >
          <Image
            src="/background.jpg"
            alt="Hero Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
            placeholder="blur"
            quality={60}
            blurDataURL="/background.jpg"
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
            <motion.div variants={childVariants} transition={{ duration: 1, ease: 'easeInOut' }}>
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
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="text-4xl md:text-6xl font-bold text-white mb-4"
            >
              GMC Islamic Society
            </motion.h1>
            <motion.p
              variants={childVariants}
              transition={{ duration: 1, ease: 'easeInOut' }}
              className="max-[450px]:text-2xl min-[450px]:text-3xl sm:text-4xl font-bold text-secondary-400 mb-10"
            >
              Striving for the rise of Islam and Islamic values
            </motion.p>
            <motion.div variants={childVariants} transition={{ duration: 1, ease: 'easeInOut' }}>
              <Link href="/contact" className="bg-secondary hover:bg-logo-tertiary text-primary-800  font-bold py-3 px-8 rounded-lg transition-all duration-300 hover:scale-105 transform">
                Get in Touch
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Unique Journey Timeline */}
      <section className="relative py-24 px-4">
        <div className="max-w-3xl mx-auto flex flex-col items-center">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary/30 to-primary/10 -translate-x-1/2 z-0 rounded-full" />
          {journeySteps.map((step, idx) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, delay: idx * 0.25, ease: 'easeInOut' }}
              className={`relative z-10 w-full my-12 rounded-2xl shadow-xl ${step.bg} p-8 flex flex-col items-center text-center border-l-8 border-secondary`}
            >
              <div className="absolute left-1/2 -translate-x-1/2 -top-8 bg-white rounded-full shadow px-1 pt-3 border-4 border-secondary z-20">
                {step.icon}
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3 mt-6">{step.title}</h2>
              <p className="text-gray-700 mb-6 text-lg max-w-xl mx-auto">{step.description}</p>
              <Link href={step.link} className="inline-block bg-secondary hover:bg-logo-tertiary text-primary-900 font-bold py-2 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                {step.button}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
