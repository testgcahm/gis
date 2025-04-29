'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About Us', href: '/about' },
  { name: 'Events', href: '/events' },
  { name: 'Contact Us', href: '/contact' },
];

const Header = () => {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full bg-primary-900 py-[6px] px-2">
      <div className="container-custom mx-auto flex items-center justify-between relative">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="mx-1">
            <Image 
              src="/logo.png" 
              alt="GMC Islamic Society Logo"
              width={70}
              height={70}
            />
          </div>
          <span className={`font-bold text-lg text-secondary md:text-xl`}>
            <span className="hidden min-[340px]:inline">GMC Islamic Society</span>
            <span className="inline min-[340px]:hidden">GIS</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex text-secondary items-center space-x-1">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`px-4 py-2 rounded-md font-medium transition-colors duration-200 ${
                pathname === link.href ? 'bg-[#ffcc0096] text-secondary' : ''
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden z-50 text-secondary focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-7 w-7" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
            strokeWidth={3}
          >
            {menuOpen ? (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M6 18L18 6M6 6l12 12" 
              />
            ) : (
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={3} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            )}
          </svg>
        </button>
      </div>
      {/* Mobile Navigation moved outside the main container to prevent click conflict */}
      {menuOpen && (
        <nav className="md:hidden absolute top-16 right-0 transform z-50 -translate-x-1/6 w-[90%] max-w-[220px] bg-primary-900 text-secondary rounded-lg shadow-lg border border-secondary-800 py-4">
          <ul className="flex flex-col items-center space-y-3">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`block px-4 py-2 rounded-md font-semibold transition-colors duration-200 ${
                    pathname === link.href
                      ? 'bg-[#ffcc0096] text-secondary font-bold'
                      : 'hover:bg-[#ffcc0096]'
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
