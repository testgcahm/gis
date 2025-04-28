'use client';

import React, { useState, useEffect } from 'react';
import { Copy } from 'lucide-react';

const GOOGLE_FORM_URL = process.env.NEXT_PUBLIC_GOOGLE_FORM_SUBMIT_URL;
const ENTRY_NAME = "entry.1649783382";
const ENTRY_FATHER = "entry.1058043668";
const ENTRY_GENDER = "entry.265549784";
const ENTRY_CNIC = "entry.565316031";
const ENTRY_CATEGORY = "entry.936925128";
const ENTRY_INSTITUTE = "entry.1577305617";
const ENTRY_FILE_URL = "entry.421343422";

const Register: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        father: '',
        gender: '',
        cnic: '',
        category: '',
        institute: '',
        fileUrl: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        father: false,
        gender: false,
        cnic: false,
        category: false,
        institute: false,
        fileUrl: false,
    });
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: false });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let newErrors = {
            name: formData.name.trim() === '',
            father: formData.father.trim() === '',
            gender: formData.gender === '',
            cnic: formData.cnic.trim() === '',
            category: formData.category === '',
            institute: formData.institute.trim() === '',
            fileUrl: formData.fileUrl.trim() === '',
        };

        if (Object.values(newErrors).some((error) => error)) {
            setErrors(newErrors);
            setLoading(false);
            return;
        }

        const formUrl = `${GOOGLE_FORM_URL}?${ENTRY_NAME}=${encodeURIComponent(formData.name)}&${ENTRY_FATHER}=${encodeURIComponent(formData.father)}&${ENTRY_GENDER}=${encodeURIComponent(formData.gender)}&${ENTRY_CNIC}=${encodeURIComponent(formData.cnic)}&${ENTRY_CATEGORY}=${encodeURIComponent(formData.category)}&${ENTRY_INSTITUTE}=${encodeURIComponent(formData.institute)}&${ENTRY_FILE_URL}=${encodeURIComponent(formData.fileUrl)}`;

        try {
            await fetch(formUrl, {
                mode: 'no-cors',
                method: 'POST',
            });
            setSuccessMessage('Registration submitted successfully!');
            setFormData({ name: '', father: '', gender: '', cnic: '', category: '', institute: '', fileUrl: '' });
            setTimeout(() => setSuccessMessage(null), 3000);
        } catch (error) {
            console.error('Error submitting form:', error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText('03200035854');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section id="register" className="p-6 min-h-screen flex flex-col bg-white min-[400px]:text-base text-sm">
            <h1 className="text-4xl font-bold text-primary mb-8 text-center">Register</h1>
            {successMessage && (
                <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 animate-[bounce_1s_ease-in-out]">
                    <p className="text-green-600 text-center font-semibold bg-green-50 py-2 px-6 rounded-lg border border-green-200 shadow-lg">
                        {successMessage}
                    </p>
                </div>
            )}
            <div className={`flex flex-col space-x-8 min-[975px]:flex-row min-[975px]:items-start items-center justify-center mb-6 transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="mb-12 min-[975px]:mb-0 flex-col md:max-w-[500px]">
                    <div className="bg-white rounded-xl shadow-lg border-l-4 border-secondary p-8 flex flex-col items-center text-center">
                        <h2 className="text-2xl md:text-3xl font-extrabold text-primary mb-3 drop-shadow-sm">Welcome to Islamic Fiesta 2025</h2>
                        <p className="text-lg text-gray-700 mb-4 font-medium">An inspiring event dedicated to learning, unity, and spiritual growth for the GMC community and beyond.</p>
                        <div className="my-2">
                            <span className="inline-block bg-secondary text-primary-900 font-semibold px-4 py-1 rounded-full text-base mb-2">May 7th, 2025 &middot; GMCTH Auditorium</span>
                        </div>
                        <p className="text-base text-primary-700 mb-2">Engage with renowned speakers, connect with peers, and be part of a memorable experience.</p>
                    </div>
                    <div className="bg-white border-l-4 border-secondary rounded-xl p-6 shadow-lg text-center flex flex-col items-center mt-6 w-full relative">
                        <p className="text-base text-secondary font-bold mb-2">Registration Fee: 800 Rs</p>
                        <p className="text-sm text-gray-500 mb-2">See payment details below and secure your spot today!</p>
                        <div className="bg-[#f3eaff] border-2 border-[#ab9eff] max-w-[300px] rounded-xl p-6 shadow-lg text-center relative flex flex-col items-center">
                            <h3 className="text-xl font-bold text-[#552e91] mb-3">Easypaisa</h3>
                            <div className="flex flex-col gap-1 items-center w-full">
                                <div className="flex items-center justify-center w-full">
                                    <span className="text-sm font-medium text-[#552e91]">Account:</span>
                                    <span className="font-mono font-bold ml-2 text-[#7e5be9]">03200035854</span>
                                    <button onClick={copyToClipboard} className="ml-2 text-[#7e5be9] hover:text-[#552e91] transition cursor-pointer align-middle">
                                        <Copy size={18} />
                                    </button>
                                </div>
                                <span className="text-sm text-[#552e91] font-semibold">Account Title: <span className="text-[#7e5be9] font-bold">Hamza</span></span>
                            </div>
                            {copied && (
                                <span className="text-xs text-[#552e91] absolute top-4 right-4 bg-[#e9ddff] px-2 py-1 rounded shadow">Copied!</span>
                            )}
                        </div>
                    </div>
                    <p className="mt-6 text-center text-lg font-bold text-primary-700 bg-secondary/20 rounded-lg px-4 py-2 shadow-sm">
                        Ready to join? <span className="text-secondary">Register by filling out the form below!</span>
                    </p>
                </div>
                <div className={`bg-white shadow-[2px_2px_8px_2px_rgba(102,102,153,0.3)] w-full min-[975px]:min-w-[520px] max-[975px]:max-w-[750px] border border-primary-300 p-8 rounded-2xl transition-all duration-700 delay-300 transform ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'} flex justify-center`}>
                    <form onSubmit={handleSubmit} className="space-y-4 w-full">
                        <div className={`transition-all duration-500 delay-400 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">Name</label>
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
                        <div className={`transition-all duration-500 delay-420 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">Father's Name</label>
                            <input
                                type="text"
                                name="father"
                                value={formData.father}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.father ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter your father's name"
                                required
                            />
                            {errors.father && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Father's name is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-440 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">Gender</label>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center">
                                    <input type="radio" name="gender" value="Male" checked={formData.gender === 'Male'} onChange={handleChange} className="form-radio text-[#552e91] focus:outline-none focus:ring-0 ring-0 outline-none" />
                                    <span className="ml-2">Male</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" name="gender" value="Female" checked={formData.gender === 'Female'} onChange={handleChange} className="form-radio text-[#552e91] focus:outline-none focus:ring-0 ring-0 outline-none" />
                                    <span className="ml-2">Female</span>
                                </label>
                            </div>
                            {errors.gender && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Gender is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-460 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">CNIC (National Identity Card Number)</label>
                            <input
                                type="text"
                                name="cnic"
                                value={formData.cnic}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.cnic ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter your CNIC number"
                                required
                            />
                            {errors.cnic && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">CNIC is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-480 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">Category</label>
                            <div className="flex flex-col">
                                <label className="inline-flex items-center">
                                    <input type="radio" name="category" value="Medical Student / HO / MO / PGR" checked={formData.category === 'Medical Student / HO / MO / PGR'} onChange={handleChange} className="form-radio text-[#552e91] focus:outline-none focus:ring-0 ring-0 outline-none" />
                                    <span className="ml-2">Medical Student / HO / MO / PGR</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <input type="radio" name="category" value="Other Degree Student" checked={formData.category === 'Other Degree Student'} onChange={handleChange} className="form-radio text-[#552e91] focus:outline-none focus:ring-0 ring-0 outline-none" />
                                    <span className="ml-2">Other Degree Student</span>
                                </label>
                            </div>
                            {errors.category && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Category is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-500 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">Institute Name</label>
                            <input
                                type="text"
                                name="institute"
                                value={formData.institute}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.institute ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter your institute name"
                                required
                            />
                            {errors.institute && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">Institute name is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-520 transform ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
                            <label className="block text-primary font-semibold mb-1">Upload File URL</label>
                            <input
                                type="text"
                                name="fileUrl"
                                value={formData.fileUrl}
                                onChange={handleChange}
                                className={`w-full p-3 border rounded-lg focus:outline-none transition-all duration-300 focus:ring-1 focus:ring-[#6d4aff] hover:border-[#6d4aff]/50 ${errors.fileUrl ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Paste your file URL here"
                                required
                            />
                            {errors.fileUrl && <p className="text-red-500 text-sm mt-1 animate-[pulse_0.5s_ease-in-out]">File URL is required.</p>}
                        </div>
                        <div className={`transition-all duration-500 delay-540 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                            <button
                                type="submit"
                                className="w-full bg-primary cursor-pointer font-semibold text-white p-3 rounded-lg hover:bg-secondary hover:text-primary-900 hover:scale-[1.02] transition-all duration-300 shadow-md flex justify-center items-center disabled:opacity-60 disabled:cursor-not-allowed"
                                disabled={loading}
                            >
                                {loading ?
                                    <span className="animate-spin border-4 border-[#552e91] border-t-transparent rounded-full w-6 h-6 inline-block"></span> :
                                    'Register'
                                }
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section >
    );
};

export default Register;