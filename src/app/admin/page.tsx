'use client'

import { useState, useEffect, useRef } from 'react'
import EventsManager from './EventsManager'
import { auth, googleProvider } from '@/lib/firebase'
import { signInWithPopup } from 'firebase/auth'
import Spinner, { SimpleSpinner } from '@/components/Spinner'
import { motion } from 'framer-motion'
import { User } from 'lucide-react'

const EventsPage = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userEmail, setUserEmail] = useState<string | null>(null);
    const profileRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user);
            setUserEmail(user?.email || null);
            setChecking(false);
        });
        return () => unsubscribe();
    }, []);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setShowDropdown(false);
            }
        }
        if (showDropdown) {
            document.addEventListener('mousedown', handleClickOutside, true); // use capture phase
        } else {
            document.removeEventListener('mousedown', handleClickOutside, true);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside, true);
        };
    }, [showDropdown]);

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            setIsLoggedIn(true);
        } catch (error) {
            alert('Google login failed');
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        auth.signOut();
        setIsLoggedIn(false);
    };

    return (
        <div>
            {checking ? (
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <Spinner />
                </div>
            ) :
                isLoggedIn ? (
                    <div className="relative" ref={profileRef}>
                        <div className='flex items-center justify-end p-4'>
                            <button
                                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary-500 hover:bg-primary-600 text-white focus:outline-none mb-2"
                                onClick={() => setShowDropdown((v) => !v)}
                                title="Profile"
                            >
                                <User className="w-6 h-6" />
                            </button>
                        </div>
                        {showDropdown && (
                            <div className="absolute right-10 top-14 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-20 animate-fade-in">
                                <div className="px-4 py-3 border-b border-gray-100">
                                    <p className="text-sm text-gray-700 font-semibold">{userEmail || 'No email'}</p>
                                </div>
                                <button
                                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded-b-lg"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                        <EventsManager />
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-gray-100">
                        <h1 className="text-2xl text-primary-500 font-bold mb-4">Please log in to access the Events Manager</h1>
                        <motion.button
                            initial={{ scale: 0.8, opacity: 0, x: -40 }}
                            animate={{ scale: 1, opacity: 1, x: 0 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.97, x: -2 }}
                            className="bg-primary-500 hover:bg-primary-600 text-white font-bold px-4 py-2 rounded shadow-sm transition-all duration-200 focus:outline-none flex items-center gap-3 mb-2"
                            onClick={handleGoogleLogin}
                            disabled={loading}
                        >
                            {loading ? <SimpleSpinner /> : (
                                <svg
                                    viewBox="-3 0 262 262"
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6"
                                >
                                    <g id="SVGRepo_bgCarrier" strokeWidth="0" />
                                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" />
                                    <g id="SVGRepo_iconCarrier">
                                        <path
                                            d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                                            fill="#4285F4"
                                        />
                                        <path
                                            d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                                            fill="#34A853"
                                        />
                                        <path
                                            d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                                            fill="#FBBC05"
                                        />
                                        <path
                                            d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                                            fill="#EB4335"
                                        />
                                    </g>
                                </svg>
                            )}
                            <span>Sign in</span>
                        </motion.button>
                    </div>
                )}
        </div>
    )
}

export default EventsPage
