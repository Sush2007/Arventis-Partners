'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

function LinkedInIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.25V10.9H6.46M7.86 6.7a1.4 1.4 0 1 0 0 2.8 1.4 1.4 0 0 0 0-2.8z" />
    </svg>
  );
}

function TwitterIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function YoutubeIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function RssIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={`fill-current ${className}`} viewBox="0 0 24 24">
      <path d="M6.18 15.64a2.18 2.18 0 0 1 2.18 2.18C8.36 19 7.38 20 6.18 20 5 20 4 19 4 17.82a2.18 2.18 0 0 1 2.18-2.18M4 4.44v2.83c7.2 0 13 5.8 13 13h2.83c0-8.74-7.09-15.83-15.83-15.83m0 5.66v2.83c4.07 0 7.37 3.3 7.37 7.34h2.83c0-5.62-4.55-10.17-10.2-10.17z" />
    </svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Navigation items mapping
  const navItems = [
    { label: 'about', href: '/about' },
    { label: 'our services', href: '/services' },
    { label: 'our people', href: '/our-people' },
    { label: 'contact us', href: '/contact' },
  ];

  // Lock body scroll when full page menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 h-20 sm:h-24 md:h-28 px-4 sm:px-6 md:px-12 lg:px-16 flex items-center justify-between transition-all duration-500 ${
        isMenuOpen ? 'bg-white border-b border-primary-navy/10' : 'bg-white/95 backdrop-blur-md border-b border-primary-navy/10 shadow-sm'
      }`}>
        {/* Left column: Logo */}
        <div className="flex items-center justify-start h-full py-1.5 sm:py-2 z-20">
          <Link 
            href="/" 
            onClick={() => setIsMenuOpen(false)}
            className="hover-target inline-flex items-center h-full relative transition-transform duration-300 hover:scale-[1.02]"
          >
            <Image
              src="/logo-final.png"
              alt="Arventis Partners Logo"
              width={450}
              height={140}
              priority
              className="h-full max-h-20 sm:max-h-22 md:max-h-24 w-auto object-contain mix-blend-multiply filter contrast-[1.08] scale-110 sm:scale-115 md:scale-120 origin-left"
            />
          </Link>
        </div>

        {/* Right column: Hamburger Toggle (Visible on all screen sizes) */}
        <div className="flex items-center justify-end z-20">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            className="relative z-50 p-1.5 sm:p-2 transition-colors duration-300 focus:outline-none hover-target text-primary-navy hover:text-primary-gold-dark"
          >
            {isMenuOpen ? <X className="w-8 h-8 sm:w-9 sm:h-9" /> : <Menu className="w-8 h-8 sm:w-9 sm:h-9" />}
          </button>
        </div>
      </header>

      {/* Full-page menu drawer translating from right to left */}
      <div
        className={`fixed inset-0 z-40 bg-white text-primary-navy flex flex-col justify-between px-6 py-12 md:p-20 transition-transform duration-700 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header spacer */}
        <div className="relative z-10 pt-16 md:pt-24" />

        {/* Navigation links */}
        <nav className="relative z-10 flex flex-col items-center justify-center space-y-6 md:space-y-10 my-auto text-center">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`font-serif text-3xl sm:text-4xl md:text-6xl lg:text-7xl tracking-widest uppercase transition-all duration-300 hover:scale-105 hover-target ${
                  isActive ? 'text-primary-gold-dark font-bold' : 'text-primary-navy/80 hover:text-primary-gold-dark'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Drawer Footer */}
        <div className="relative z-10 border-t border-primary-navy/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs tracking-widest text-primary-navy/50 uppercase font-sans">
          <div>Where Strategy meets consulting</div>
          <div>ARVENTIS PARTNERS &copy; {new Date().getFullYear()}</div>
        </div>
      </div>
    </>
  );
}
