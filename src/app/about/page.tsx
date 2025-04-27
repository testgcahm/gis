'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center pb-[200px] min-h-[85vh] text-secondary p-8"
        >
            <h1 className="text-2xl xs:text-3xl sm:text-6xl md:text-7xl font-extrabold mb-6 text-center">About Us</h1>
            <div>
                <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
                    className="text-3xl xs:text-4xl sm:text-7xl md:text-8xl font-extrabold text-primary-400 text-center"
                >
                    Coming Soon
                </motion.p>
            </div>
        </motion.div>
    );
}