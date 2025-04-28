'use client';

import React, { useState, useEffect } from 'react';

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

    return (
        <section id="contact" className="p-6 min-h-screen flex flex-col items-center justify-center bg-white">
            <div className={`flex flex-col items-center mb-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-3xl font-bold text-primary-700 mb-2 text-center">Contact Us</h2>
                <p className="text-gray-600 text-center max-w-2xl mx-auto font-medium">
                    Send us a message and we will get back to you as soon as possible.
                </p>
            </div>
            <div className={`bg-white shadow-[2px_2px_8px_2px_rgba(102,102,153,0.3)] border border-primary-300 p-8 rounded-2xl max-w-lg w-full transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
                {successMessage && (
                    <div className="transition-all duration-300 transform animate-[bounce_1s_ease-in-out]">
                        <p className="text-green-600 text-center mb-4 font-semibold bg-green-50 py-2 px-4 rounded-lg border border-green-200">
                            {successMessage}
                        </p>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className={`transition-all duration-500 delay-400 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <label className="block text-[#552e91] font-semibold mb-1">Name</label>
                        <input 
                            type="text" 
                            name="name" 
                            value={formData.name} 
                            onChange={handleChange} 
                            className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
                            placeholder="Enter your name" 
                            required 
                        />
                        {errors.name && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Name is required.</p>}
                    </div>
                    <div className={`transition-all duration-500 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <label className="block text-[#552e91] font-semibold mb-1">Email</label>
                        <input 
                            type="email" 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange} 
                            className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                            placeholder="Enter your email" 
                            required 
                        />
                        {errors.email && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Valid email is required.</p>}
                    </div>
                    <div className={`transition-all duration-500 delay-600 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                        <label className="block text-[#552e91] font-semibold mb-1">Message</label>
                        <textarea 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange} 
                            className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.message ? 'border-red-500' : 'border-gray-300'}`} 
                            placeholder="Write your message..." 
                            rows={4} 
                            required 
                        />
                        {errors.message && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Message is required.</p>}
                    </div>
                    <div className={`transition-all duration-500 delay-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                        <button 
                            type="submit" 
                            className="w-full bg-[#ab9eff] cursor-pointer font-semibold text-[#552e91] p-3 rounded-lg hover:bg-[#7e5be9] hover:text-white hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed" 
                            disabled={loading}
                        >
                            {loading ? 
                                <span className="animate-spin border-4 border-[#552e91] border-t-transparent rounded-full w-6 h-6 inline-block"></span> : 
                                'Send Message'
                            }
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Contact;
