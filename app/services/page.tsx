'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight, MapPin } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ContactUs from '../components/ContactUs';

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

export default function ServicesPage() {
  // Scroll animations observer
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
    <div className="relative w-full overflow-hidden bg-black text-white">
      {/* Shared Navigation Bar */}
      <Navbar />

      {/* HERO VIDEO BANNER */}
      <section className="relative w-full min-h-[60vh] md:min-h-[75vh] flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-16 border-b border-white/10 text-white overflow-hidden pt-28 bg-black">
        {/* Background Video */}
        <video 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src="https://pub-e76f3c2b747241f99a84d7c073d76e11.r2.dev/services_page.mp4" type="video/mp4" />
        </video>
        
        {/* Overlays for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 z-10"></div>

        <div className="max-w-7xl mx-auto w-full relative z-20">
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-tight leading-normal text-white mb-6 drop-shadow-lg">
            <RevealHeading>SERVICES</RevealHeading>
          </h1>
          <p className="scroll-fade-up font-sans text-sm sm:text-base md:text-lg text-white/90 font-light leading-relaxed max-w-3xl transition-delay-300 drop-shadow-md">
            Unified strategic management consulting and elite legal advocacy, engineered for high-stakes execution.
          </p>
        </div>
      </section>

      {/* 1. TWIN HERO BANNER (Standalone Luxury Cards with margins from everywhere) */}
      <section className="relative w-full py-10 md:py-14 px-6 md:px-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          
          {/* Card 1: Arventis Consulting */}
          <div className="group bg-white border border-black/10 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-500 flex flex-col min-h-[480px]">
            <div className="relative h-[240px] w-full overflow-hidden">
              <Image
                src="/arvBuisness-bg.jpg"
                alt="Arventis Consulting"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-between flex-1 bg-white">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wider leading-tight text-black">
                  ARVENTIS CONSULTING
                </h2>
                <p className="font-sans text-sm text-black/70 font-light leading-relaxed">
                  Senior strategy advisory engineered for execution. From growth planning, sales transformation, and operating model design to AI integration and cross-border market expansion.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/services/consulting"
                  className="inline-flex items-center gap-3 bg-[#fa0249] hover:bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 hover-target shadow-xl"
                >
                  <span>EXPLORE CONSULTING</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Card 2: Arventis Legal */}
          <div className="group bg-white border border-black/10 rounded-[2px] overflow-hidden shadow-2xl transition-all duration-500 flex flex-col min-h-[480px]">
            <div className="relative h-[240px] w-full overflow-hidden">
              <Image
                src = "/arvlegal-bg.jpg"
                alt="Arventis Legal"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
            <div className="p-8 sm:p-10 flex flex-col justify-between flex-1 bg-white">
              <div className="space-y-4">
                <h2 className="font-serif text-2xl sm:text-3xl font-light tracking-wider leading-tight text-black">
                  ARVENTIS LEGAL
                </h2>
                <p className="font-sans text-sm text-black/75 font-light leading-relaxed">
                  Courtroom credibility and senior advocacy across trial courts, high courts, arbitral tribunals, and the Supreme Court of India. Covering litigation, corporate compliance, and constitutional law.
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/services/legal"
                  className="inline-flex items-center gap-3 bg-[#fa0249] hover:bg-black text-white font-bold text-xs tracking-[0.2em] uppercase px-8 py-4 transition-all duration-300 hover-target shadow-xl"
                >
                  <span>EXPLORE LEGAL</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. INDUSTRIES WE ARE IN SECTION */}
      <section className="relative w-full bg-white py-12 md:py-16 px-6 md:px-16 text-black">
        <div className="max-w-7xl mx-auto">
          <div className="scroll-fade-up">
            
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light tracking-tight leading-tight text-black mb-12">
              INDUSTRIES WE ARE IN
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Card 1: BFSI */}
              <div className="group bg-white border border-black/10 rounded-[1px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-[340px]">
                <div className="relative h-[150px] w-full overflow-hidden bg-white">
                  <Image
                    src="/bfsi_bg.png"
                    alt="BFSI"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 bg-white text-black">
                  <span className="font-serif text-xs text-[#fa0249] font-bold block">01</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-semibold tracking-wide uppercase leading-tight text-black">
                      BFSI
                    </h3>
                    <p className="font-sans text-[10px] text-black/60 leading-normal font-normal">
                      banking, financial services, and insurance
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2: Government */}
              <div className="group bg-white border border-black/10 rounded-[1px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-[340px]">
                <div className="relative h-[150px] w-full overflow-hidden bg-white">
                  <Image
                    src="/gov_bg.png"
                    alt="Government"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 bg-white text-black">
                  <span className="font-serif text-xs text-[#fa0249] font-bold block">02</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-semibold tracking-wide uppercase leading-tight text-black">
                      Government
                    </h3>
                    <p className="font-sans text-[10px] text-black/60 leading-normal font-normal">
                      and public sector — India and GCC
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 3: EdTech */}
              <div className="group bg-white border border-black/10 rounded-[1px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-[340px]">
                <div className="relative h-[150px] w-full overflow-hidden bg-white">
                  <Image
                    src="/edtech_bg.png"
                    alt="EdTech"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 bg-white text-black">
                  <span className="font-serif text-xs text-[#fa0249] font-bold block">03</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-semibold tracking-wide uppercase leading-tight text-black">
                      EdTech
                    </h3>
                    <p className="font-sans text-[10px] text-black/60 leading-normal font-normal">
                      educational technology solutions
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 4: Manufacturing */}
              <div className="group bg-white border border-black/10 rounded-[1px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-[340px]">
                <div className="relative h-[150px] w-full overflow-hidden bg-white">
                  <Image
                    src="/manufacturing_bg.png"
                    alt="Manufacturing"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 bg-white text-black">
                  <span className="font-serif text-xs text-[#fa0249] font-bold block">04</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-semibold tracking-wide uppercase leading-tight text-black">
                      Manufacturing
                    </h3>
                    <p className="font-sans text-[10px] text-black/60 leading-normal font-normal">
                      and specialty chemicals
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 5: Consumer */}
              <div className="group bg-white border border-black/10 rounded-[1px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-[340px]">
                <div className="relative h-[150px] w-full overflow-hidden bg-white">
                  <Image
                    src="/consumer_bg.png"
                    alt="Consumer & D2C"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 bg-white text-black">
                  <span className="font-serif text-xs text-[#fa0249] font-bold block">05</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-semibold tracking-wide uppercase leading-tight text-black">
                      Consumer & D2C
                    </h3>
                    <p className="font-sans text-[10px] text-black/60 leading-normal font-normal">
                      direct-to-consumer and retail
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 6: Professional Services */}
              <div className="group bg-white border border-black/10 rounded-[1px] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col h-[340px]">
                <div className="relative h-[150px] w-full overflow-hidden bg-white">
                  <Image
                    src="/prof_services_bg.png"
                    alt="Professional Services"
                    fill
                    className="object-cover scale-100 group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 bg-white text-black">
                  <span className="font-serif text-xs text-[#fa0249] font-bold block">06</span>
                  <div className="space-y-1">
                    <h3 className="font-serif text-sm font-semibold tracking-wide uppercase leading-tight text-black">
                      Professional Services
                    </h3>
                    <p className="font-sans text-[10px] text-black/60 leading-normal font-normal">
                      consulting and advisory practices
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. OPERATIONAL FLOW SECTION */}
      <section className="relative w-full bg-white py-24 md:py-32 px-6 md:px-16 text-black border-t border-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="font-serif text-3xl md:text-5xl font-light tracking-tight leading-tight text-black">
              <RevealHeading>THREE STEPS. ONE ACCOUNTABLE TEAM.</RevealHeading>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
            {/* Step 1 Card */}
            <div className="group relative overflow-hidden scroll-fade-up bg-white border border-black/10 p-8 md:p-10 shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 flex flex-col items-start">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
              <div className="relative z-10 w-8 h-8 bg-black text-white font-serif flex items-center justify-center text-sm font-semibold mb-6">
                01
              </div>
              <h3 className="relative z-10 font-serif text-xl font-semibold mb-3 tracking-wide text-black">
                Assessment
              </h3>
              <p className="relative z-10 font-sans text-xs md:text-sm text-black/70 leading-relaxed font-light">
                Surgical dissection of vulnerabilities, counter-party positions, and jurisdictional liabilities on the target field.
              </p>
            </div>

            {/* Step 2 Card */}
            <div className="group relative overflow-hidden scroll-fade-up bg-white border border-black/10 p-8 md:p-10 shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 flex flex-col items-start transition-delay-100">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
              <div className="relative z-10 w-8 h-8 bg-[#fa0249] text-white font-serif flex items-center justify-center text-sm font-semibold mb-6">
                02
              </div>
              <h3 className="relative z-10 font-serif text-xl font-semibold mb-3 tracking-wide text-black">
                Strategy
              </h3>
              <p className="relative z-10 font-sans text-xs md:text-sm text-black/70 leading-relaxed font-light">
                Architecting tactical blueprints designed to neutralize threats, resolve claims, and secure high-value legal advantages.
              </p>
            </div>

            {/* Step 3 Card */}
            <div className="group relative overflow-hidden scroll-fade-up bg-white border border-black/10 p-8 md:p-10 shadow-md hover:shadow-xl hover:translate-y-[-4px] transition-all duration-500 flex flex-col items-start transition-delay-200">
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-20 translate-x-[-150%] group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out pointer-events-none z-20" />
              <div className="relative z-10 w-8 h-8 bg-[#fa0249] text-white font-serif flex items-center justify-center text-sm font-semibold mb-6">
                03
              </div>
              <h3 className="relative z-10 font-serif text-xl font-semibold mb-3 tracking-wide text-black">
                Execution
              </h3>
              <p className="relative z-10 font-sans text-xs md:text-sm text-black/70 leading-relaxed font-light">
                Unwavering advocacy and precise coordination of resources to deliver the defined mandate under secure frameworks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA SECTION */}
      <ContactUs />

      <Footer/>
    </div>
  );
}
