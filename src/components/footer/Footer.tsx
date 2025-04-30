'use client';

import Link from 'next/link';
import Image from 'next/image';
import { EmailIcon, FacebookIcon, InstagramIcon, LocationIcon, PhoneIcon, WhatsAppIcon } from './FooterIcons';
import { Copy } from 'lucide-react';
import React, { useState } from 'react';

const Footer = () => {
    const [copied, setCopied] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const phoneNumber = '+923434369958';
    const email = 'gmcislamicsociety1199@gmail.com';
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

    return (
        <footer className="bg-primary-900 text-white pt-16 px-4 sm:px-8 pb-8">
            <div className="max-w-7xl mx-auto w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[2fr_1fr_3fr] gap-10 lg:gap-16 items-start">
                    {/* Logo and About */}
                    <div className="space-y-2 flex flex-col items-start md:col-span-1">
                        <div className="flex items-center">
                            <div className="relative mr-2">
                                <Image
                                    src="/logo.png"
                                    alt="GMC Islamic Society Logo"
                                    width={64}
                                    height={64}
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl text-secondary">GMC Islamic Society</span>
                        </div>
                        <p className="text-gray-300 text-left">
                            Fostering spiritual growth, community service, and Islamic education within the Gujranwala Medical College community.
                        </p>
                        <div className="flex space-x-4 mt-2">
                            <SocialIcon href="https://www.facebook.com/people/GMC-Islamic-Society/100067471032724/" icon="facebook" />
                            <SocialIcon href="https://www.instagram.com/islamicsociety_gmc/" icon="instagram" />
                            <SocialIcon href="https://whatsapp.com/channel/0029Vb9V8EWLNSa2uew73k28" icon="whatsapp" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex flex-col md:mt-4 md:pl-5 lg:pl-0 items-start w-full md:col-span-1 lg:col-auto">
                        <h3 className="font-semibold text-lg mb-4 text-secondary">Quick Links</h3>
                        <ul className="space-y-2">
                            <FooterLink href="/about" label="About Us" />
                            <FooterLink href="/events" label="Events" />
                            <FooterLink href='/contact' label="Contact Us" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="flex flex-col lg:mt-4 items-start w-full md:col-span-2 lg:col-span-1">
                        <h3 className="font-semibold text-lg mb-4 text-secondary">Contact Us</h3>
                        <address className="not-italic space-y-4 text-gray-300 w-full">
                            <p className="flex items-start">
                                <LocationIcon className="mt-1 mr-2 flex-shrink-0" />
                                <span>Gondalanwala Village, Ali pur Chatha Road, Gujranwala Punjab Pakistan</span>
                            </p>
                            <p className="flex items-center flex-wrap">
                                <EmailIcon className="mr-2 flex-shrink-0" />
                                <a href="mailto:gmcislamicsociety1199@gmail.com" className="hover:text-secondary-300 transition-colors break-all">
                                    {email}
                                </a>
                                <button onClick={handleCopyEmail} className="ml-2 hover:text-secondary-300 text-primary-200 transition" aria-label="Copy email address">
                                    <Copy size={18} />
                                </button>
                                {copiedEmail && (
                                    <span className="ml-2 text-xs text-secondary bg-white/20 px-2 py-1 rounded shadow animate-bounce">Copied!</span>
                                )}
                            </p>
                            <p className="flex items-center flex-wrap">
                                <PhoneIcon className="mr-2 flex-shrink-0" />
                                <a href="tel:+923434369958" className="hover:text-secondary-300 transition-colors">
                                    +92 343 4369958
                                </a>
                                <button onClick={handleCopy} className="ml-2 hover:text-secondary-300 text-primary-200 transition" aria-label="Copy phone number">
                                    <Copy size={18} />
                                </button>
                                {copied && (
                                    <span className="ml-2 text-xs text-secondary bg-white/20 px-2 py-1 rounded shadow animate-bounce">Copied!</span>
                                )}
                            </p>
                        </address>
                        <div className="mt-4 rounded max-w-[800px] overflow-hidden shadow-lg w-full h-48 md:h-56">
                            <iframe
                                title="Gujranwala Medical College Map"
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d54017.51389275296!2d74.13238!3d32.201681!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391f2f2c72a3040b%3A0x73d5df7d05f93168!2sGujranwala%20Medical%20College!5e0!3m2!1sen!2sus!4v1745758103569!5m2!1sen!2sus"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen={true}
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Footer Link Component
const FooterLink = ({ href, label }: { href: string; label: string }) => {
    return (
        <li>
            <Link href={href} className="text-gray-300 hover:text-secondary-300 transition-colors">
                {label}
            </Link>
        </li>
    );
};

// Social Media Icon Component
const SocialIcon = ({ href, icon }: { href: string; icon: string }) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="h-9 w-9 rounded-full bg-primary-700 flex items-center justify-center hover:bg-secondary-500 transition-colors"
        >
            {icon === 'facebook' && <FacebookIcon />}
            {icon === 'instagram' && <InstagramIcon />}
            {icon === 'whatsapp' && <WhatsAppIcon />}
        </a>
    );
};


export default Footer;