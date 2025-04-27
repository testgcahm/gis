'use client';

import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center min-h-[60vh] text-secondary p-8"
        >
            <h1 className="text-2xl sm:text-4xl font-bold mb-4">About Us</h1>
            <div>
                <motion.p
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.5 }}
                    className="text-3xl xs:text-4xl sm:text-6xl font-bold text-primary-400"
                >
                    Coming Soon
                </motion.p>
            </div>
        </motion.div>
    );
}