'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, Scale, Globe, ShieldCheck, Mail, MapPin } from 'lucide-react';
import Navbar from './components/Navbar';

// Custom component to reveal text word-by-word with a calming stagger
function RevealHeading({ children, className = "" }: { children: string; className?: string }) {
  const words = children.split(' ');
  return (
    <span className={`reveal-text flex flex-wrap gap-x-2 gap-y-1 ${className}`}>
      {words.map((word, idx) => (
        <span key={idx} className="reveal-text-line inline-block overflow-hidden">
          <span
            className="reveal-text-word"
            style={{ transitionDelay: `${idx * 0.04}s` }}
          >
            {word}
          </span>
        </span>
      ))}
    </span>
  );
}

export default function Home() {
  const slides = [
    {
      tagline: "Dual Expertise",
      title: "Two Disciplines. One Standard of Rigour.",
      description: "ARVENTIS PARTNERS brings together Supreme Court-level legal advocacy and senior strategy consulting under one roof — so your legal counsel and commercial strategy never work in isolation again.",
      image: "/strategic_foresight.png",
      primaryBtnText: "Explore Services",
      primaryBtnHref: "/services",
      secondaryBtnText: "Legal Mandate",
      secondaryBtnHref: "/contact"
    },
    {
      tagline: "Strategy Consulting",
      title: "Strategy Built for Execution, Not Just Slide Decks.",
      description: "From growth strategy and sales transformation to market entry and digital infrastructure — led by an IIM Lucknow MBA with 11 years of P&L ownership across consulting, BFSI, government, and technology businesses.",
      image: "/Buisness-bg.jpg",
      primaryBtnText: "Explore Consulting",
      primaryBtnHref: "/services#consulting",
      secondaryBtnText: "Discuss Growth",
      secondaryBtnHref: "/contact"
    },
    {
      tagline: "Legal Services",
      title: "Courtroom Credibility Across Every Practice Area.",
      description: "A bench of six advocates led by Suman Thakur, Advocate, Supreme Court of India — covering civil litigation, corporate advisory, real estate, family & succession, constitutional matters, and cross-border arbitration.",
      image: "/legal-bg.jpg",
      primaryBtnText: "Explore Practice Areas",
      primaryBtnHref: "/services#legal",
      secondaryBtnText: "Initiate Mandate",
      secondaryBtnHref: "/contact"
    },
    {
      tagline: "Industries & Sectors",
      title: "Built for the Sectors Where the Stakes Are Highest.",
      description: "Deep experience across BFSI, government and public sector, EdTech, manufacturing and specialty chemicals, consumer and D2C, and professional services — in India and internationally.",
      image: "/prof_services_bg.png",
      primaryBtnText: "View Industries",
      primaryBtnHref: "/services#industries",
      secondaryBtnText: "Contact Us",
      secondaryBtnHref: "/contact"
    },
    {
      tagline: "Global Reach",
      title: "Local Depth. International Fluency.",
      description: "Litigation and advisory across Indian courts and regulatory bodies. Consulting engagements delivered in India, Saudi Arabia, the UAE, Kuwait, the UK, the US, and South Korea — with the same preparation and the same standard of delivery, every time.",
      image: "/global_reach_bg.png",
      primaryBtnText: "Our Story",
      primaryBtnHref: "/about",
      secondaryBtnText: "Get in Touch",
      secondaryBtnHref: "/contact"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  // Intersection Observer for scroll-triggered entrance animations
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const revealElements = document.querySelectorAll('.scroll-fade-up, .reveal-text');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('scroll-fade-up')) {
              entry.target.classList.add('scroll-fade-up-active');
            } else if (entry.target.classList.contains('reveal-text')) {
              entry.target.classList.add('reveal-text-active');
            }
            // Unobserve to make the animation permanent on this scroll
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-primary-navy">
      
      {/* 1. STICKY HEADER */}
      <Navbar />

      {/* 2. HERO BANNER WITH BACKGROUND IMAGE SLIDER */}
      <section className="relative w-full h-screen flex flex-col justify-between pt-28 pb-6 px-6 md:px-16 overflow-hidden">
        
        {/* Background Image Slider Stacks */}
        <div className="absolute inset-0 z-0 bg-[#081226]">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-all duration-[1500ms] ease-in-out ${
                currentSlide === idx ? 'opacity-70 scale-100' : 'opacity-0 scale-105 pointer-events-none'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                priority={idx === 0}
                className="object-cover"
              />
            </div>
          ))}
          
          {/* Calming gradient overlays: centered dark overlay for legibility, bottom fade for section transition */}
          <div className="absolute inset-0 bg-[#081226]/65 z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#081226] via-transparent to-transparent z-10" />
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 max-w-5xl mx-auto my-auto pt-10 pb-12 text-center flex flex-col items-center justify-center">
          <div key={currentSlide} className="animate-slide-fade-in-up space-y-4 sm:space-y-6 flex flex-col items-center text-center">
            <span className="font-sans text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-primary-gold font-bold block mx-auto">
              {slides[currentSlide].tagline}
            </span>

            <h1 className="text-white font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.1] max-w-5xl drop-shadow-lg mx-auto">
              {slides[currentSlide].title}
            </h1>

            <p className="font-sans text-sm sm:text-base md:text-lg text-white/85 font-light leading-relaxed max-w-3xl pt-1 mx-auto">
              {slides[currentSlide].description}
            </p>
          </div>
        </div>

        {/* Slider Controls (Pagination & Chevrons - Hidden on mobile) */}
        <div className="relative z-10 w-full hidden md:flex items-center justify-between pb-4 border-t border-white/15 pt-8 mt-auto">
          {/* Pagination numbers */}
          <div className="flex items-center gap-4 md:gap-8 overflow-x-auto no-scrollbar py-2">
            {slides.map((slide, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className="group flex flex-col items-start text-left focus:outline-none flex-shrink-0"
              >
                <span className={`font-serif text-sm md:text-base tracking-widest ${
                  currentSlide === idx ? 'text-primary-gold font-bold scale-105' : 'text-white/60 group-hover:text-white/90'
                } transition-all duration-300`}>
                  0{idx + 1}
                </span>
                <span className={`font-sans text-[9px] md:text-[10px] tracking-[0.18em] uppercase ${
                  currentSlide === idx ? 'text-primary-gold/85 font-semibold' : 'text-white/45 group-hover:text-white/70'
                } transition-all duration-300 mt-1.5 hidden sm:block`}>
                  {slide.tagline}
                </span>
                {/* Thin progress bar line */}
                <div className="w-12 md:w-20 h-[3px] bg-white/10 mt-3.5 relative overflow-hidden">
                  {currentSlide === idx && (
                    <div className="absolute left-0 top-0 h-full bg-primary-gold animate-slide-progress" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Prev/Next chevrons */}
          <div className="flex items-center gap-3 md:gap-4 pl-4">
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-primary-gold bg-white/[0.02] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 hover-target shadow-md"
            >
              <span className="font-sans text-sm md:text-base">&larr;</span>
            </button>
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full border border-white/20 hover:border-primary-gold bg-white/[0.02] flex items-center justify-center text-white/80 hover:text-white hover:bg-white/5 transition-all duration-300 hover-target shadow-md"
            >
              <span className="font-sans text-sm md:text-base">&rarr;</span>
            </button>
          </div>
        </div>

      </section>
    </div>
  );
}
