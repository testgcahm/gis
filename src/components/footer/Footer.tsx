'use client';

import Link from 'next/link';
import Image from 'next/image';
import { EmailIcon, FacebookIcon, InstagramIcon, LocationIcon, PhoneIcon, WhatsAppIcon } from './FooterIcons';

const Footer = () => {

    return (
        <footer className="bg-primary-900 text-white pt-16 px-10 pb-8">
            <div className="container-custom">
                {/* Added justify-items-center to center content within grid columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">
                    {/* Logo and About */}
                    <div className="space-y-4">
                        <div className="flex items-center">
                            <div className="relative h-18 w-18 mr-2">
                                <Image
                                    src="/logo.png" /* Changed from /file.svg */
                                    alt="GMC Islamic Society Logo"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                            <span className="font-bold text-xl text-secondary">GMC Islamic Society</span>
                        </div>
                        <p className="text-gray-300">
                            Fostering spiritual growth, community service, and Islamic education within the Gujranwala Medical College community.
                        </p>
                        <div className="flex space-x-4">
                            <SocialIcon href="https://www.facebook.com/people/GMC-Islamic-Society/100067471032724/" icon="facebook" />
                            <SocialIcon href="https://www.instagram.com/islamicsociety_gmc/" icon="instagram" />
                            <SocialIcon href="https://wa.me/923001234567" icon="whatsapp" />
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='md:flex md:flex-col w-full md:items-center'> {/* Added w-full and items-center */}
                        <h3 className="font-semibold text-lg mb-4 md:mr-10 text-secondary">Quick Links</h3>
                        <ul className="space-y-2 md:mr-16">
                            <FooterLink href="/about" label="About Us" />
                            <FooterLink href="/events" label="Events" />
                        </ul>
                    </div>

                    {/* Contact */}
                    <div className="w-full"> {/* Added w-full */}
                        <h3 className="font-semibold text-lg mb-4 text-secondary">Contact Us</h3>
                        <address className="not-italic space-y-2 text-gray-300"> {/* Restore space-y-2 */}
                            <p className="flex items-start">
                                <LocationIcon className="mt-1 mr-2 flex-shrink-0" /> {/* Added flex-shrink-0 */}
                                <span>Gondalanwala Village, Ali pur Chatha Road, Gujranwala Punjab Pakistan</span>
                            </p>
                            {/* <p className="flex items-center">
                                <EmailIcon className="mr-2 flex-shrink-0" />
                                <a href="mailto:contact@gmcislamicsociety.org" className="hover:text-secondary-300 transition-colors break-all">
                                    contact@gmcislamicsociety.org
                                </a>
                            </p>
                            <p className="flex items-center">
                                <PhoneIcon className="mr-2 flex-shrink-0" />
                                <a href="tel:+92123456789" className="hover:text-secondary-300 transition-colors">
                                    +92 123 456 789
                                </a>
                            </p> */}
                        </address>
                        {/* Embedded Google Map for Gujranwala Medical College */}
                        <div className="mt-4 rounded overflow-hidden shadow-lg w-full h-48 md:h-56">
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