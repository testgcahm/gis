'use client';

import React, { useState, useEffect } from 'react';
import { EmailIcon, PhoneIcon, FacebookIcon, InstagramIcon, WhatsAppIcon } from '@/components/footer/FooterIcons';
import { Copy } from 'lucide-react';
import { motion } from 'framer-motion';
import useInView from '@/components/useInView';

const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_CONTACT_URL;
const ENTRY_NAME = "entry.780881885";
const ENTRY_EMAIL = "entry.117990330";
const ENTRY_MESSAGE = "entry.438681110";

const Contact: React.FC = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({ name: false, email: false, message: false });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const phoneNumber = '+923434369958';
    const email = 'gmcislamicsociety1199@gmail.com';

    // Animation refs for on-view
    const [infoRef, infoInView] = useInView<HTMLDivElement>(0.2);
    const [formRef, formInView] = useInView<HTMLDivElement>(0.2);

    // Animation trigger on page load
    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let newErrors = {
            name: formData.name.trim() === '',
            email: formData.email.trim() === '' || !/\S+@\S+\.\S+/.test(formData.email),
            message: formData.message.trim() === '',
        };

        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const formUrl = `${GOOGLE_FORM_URL}?${ENTRY_NAME}=${encodeURIComponent(formData.name)}&${ENTRY_EMAIL}=${encodeURIComponent(formData.email)}&${ENTRY_MESSAGE}=${encodeURIComponent(formData.message.trim().replace(/^\n+|\n+$/g, ''))}`;

        try {
            await fetch(formUrl, {
                mode: 'no-cors',
                method: 'POST',
            });
            setSuccessMessage('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(phoneNumber);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleCopyEmail = () => {
        navigator.clipboard.writeText(email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const scrollToContactForm = () => {
        const formSection = document.getElementById('contact-form-section');
        if (formSection) {
            formSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="contact" className="p-6 min-h-screen flex flex-col bg-gradient-to-br from-[#f3eaff] via-[#e9ddff] to-[#f8fafc] min-[400px]:text-base text-sm">
            <h1 className="text-4xl font-extrabold text-primary-700 mb-8 text-center">Contact Us</h1>
            <div className="flex flex-col min-[975px]:space-x-8 min-[975px]:flex-row min-[975px]:items-start items-center justify-center">
                {/* Side info section (like register page) */}
                <motion.div
                    ref={infoRef}
                    initial={{ opacity: 0, x: -60 }}
                    animate={infoInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    className="mb-8 min-[975px]:mb-0 flex-col max-w-[500px] space-y-6"
                >
                    <div className="bg-white rounded-2xl shadow-xl border-l-8 border-secondary p-8 flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl">
                        <h2 className="text-2xl font-bold text-primary-700 mb-2">Get in Touch</h2>
                        <p className="text-gray-700 font-medium mb-2">We value your feedback, questions, and suggestions. Whether you want to learn more about our events, need help, or wish to collaborate, our team is here to assist you.</p>
                        <p className="text-gray-600 mb-4">Reach out to us through the contact form or use the details below. We aim to respond to all inquiries within 24 hours.</p>
                        <button
                            onClick={scrollToContactForm}
                            aria-label="Scroll to contact form"
                            className="mb-6 px-7 py-3 rounded-lg bg-primary-700 text-white font-bold shadow hover:bg-primary-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary-400 mt-2 hidden min-[975px]:hidden max-[976px]:inline-flex"
                        >
                            <span className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                                </svg>
                                Contact Form
                            </span>
                        </button>
                        <div className="flex space-x-4 mb-4">
                            <a href="https://www.facebook.com/people/GMC-Islamic-Society/100067471032724/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gradient-to-br from-[#7e5be9] to-[#ab9eff] flex items-center justify-center hover:bg-secondary-500 transition-colors shadow-md">
                                <FacebookIcon />
                            </a>
                            <a href="https://www.instagram.com/islamicsociety_gmc/" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gradient-to-br from-[#e1306c] to-[#fdc468] flex items-center justify-center hover:bg-secondary-500 transition-colors shadow-md">
                                <InstagramIcon />
                            </a>
                            <a href="https://whatsapp.com/channel/0029Vb9V8EWLNSa2uew73k28" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-gradient-to-br from-[#25d366] to-[#128c7e] flex items-center justify-center hover:bg-secondary-500 transition-colors shadow-md">
                                <WhatsAppIcon />
                            </a>
                        </div>
                        <div className="flex flex-col gap-3 items-center text-gray-700">
                            <div className="flex items-center bg-[#f3eaff] rounded-lg px-3 py-2 shadow-sm group transition-all">
                                <EmailIcon className="mr-2 text-[#552e91]" />
                                <a href={`mailto:${email}`} className="font-semibold text-primary-700 hover:text-[#7e5be9] transition-colors break-all">{email}</a>
                                <button onClick={handleCopyEmail} className="ml-2 hover:text-primary-700 text-primary-400 transition" aria-label="Copy email address">
                                    <Copy size={18} />
                                </button>
                                {copiedEmail && (
                                    <span className="ml-2 text-xs text-primary-700 bg-white/20 px-2 py-1 rounded shadow animate-bounce">Copied!</span>
                                )}
                            </div>
                            <div className="flex items-center bg-[#f3eaff] rounded-lg px-3 py-2 shadow-sm group transition-all">
                                <PhoneIcon className="mr-2 text-[#552e91]" />
                                <a href={`tel:${phoneNumber}`} className="font-semibold text-primary-700 hover:text-[#7e5be9] transition-colors">+92 343 4369958</a>
                                <button onClick={handleCopy} className="ml-2 hover:text-primary-700 text-primary-400 transition" aria-label="Copy phone number">
                                    <Copy size={18} />
                                </button>
                                {copied && (
                                    <span className="ml-2 text-xs text-primary-700 bg-white/20 px-2 py-1 rounded shadow animate-bounce">Copied!</span>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
                {/* Contact form section */}
                <motion.div
                    ref={formRef}
                    initial={{ opacity: 0, x: 60 }}
                    animate={formInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.7, ease: 'easeOut' }}
                    id="contact-form-section"
                    className="bg-white shadow-xl border min-[975px]:min-w-[455px] border-primary-200 p-8 rounded-2xl max-w-lg w-full transition-all duration-700 delay-300 transform hover:shadow-xl"
                >
                    <h2 className="text-xl font-bold text-primary-700 mb-4 text-center">Send Us a Message</h2>
                    <p className="text-gray-600 text-center mb-6">Fill out the form below and our team will get back to you as soon as possible. Please provide as much detail as you can so we can assist you effectively.</p>
                    {successMessage && (
                        <div className="transition-all duration-300 transform animate-[bounce_1s_ease-in-out]">
                            <p className="text-green-600 text-center mb-4 font-semibold bg-green-50 py-2 px-4 rounded-lg border border-green-200">
                                {successMessage}
                            </p>
                        </div>
                    )}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className={`transition-all duration-500 delay-400 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-[#552e91] font-semibold mb-1">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[#7e5be9] hover:border-[#7e5be9]/50 ${errors.name ? 'border-red-500' : 'border-gray-300'} bg-[#f8f6ff]`}
                                placeholder="Enter your name"
                                required
                            />
                            {errors.name && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Name is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-[#552e91] font-semibold mb-1">Email <span className="text-red-500">*</span></label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[#7e5be9] hover:border-[#7e5be9]/50 ${errors.email ? 'border-red-500' : 'border-gray-300'} bg-[#f8f6ff]`}
                                placeholder="Enter your email"
                                required
                            />
                            {errors.email && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Valid email is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-600 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-[#552e91] font-semibold mb-1">Message <span className="text-red-500">*</span></label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-2 focus:ring-[#7e5be9] hover:border-[#7e5be9]/50 ${errors.message ? 'border-red-500' : 'border-gray-300'} bg-[#f8f6ff]`}
                                placeholder="Write your message..."
                                rows={4}
                                required
                            />
                            {errors.message && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Message is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <button
                                type="submit"
                                className="w-full bg-gradient-to-r from-[#7e5be9] to-[#ab9eff] cursor-pointer font-semibold text-white p-3 rounded-lg hover:bg-[#7e5be9] hover:scale-[1.03] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ?
                                    <span className="animate-spin border-4 border-[#552e91] border-t-transparent rounded-full w-6 h-6 inline-block"></span> :
                                    'Send Message'
                                }
                            </button>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    );
};

export default Contact;
