'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const mobileLogoRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const container = containerRef.current;
    const text = textRef.current;
    const subtitle = subtitleRef.current;
    const mobileLogo = mobileLogoRef.current;

    if (!container || !text || !subtitle) return;

    // Reset scroll to top on initial mount/loading
    window.scrollTo(0, 0);

    // Split text into letters for the blur-reveal effect
    const rawText = text.innerText;
    text.innerHTML = '';
    const letters: HTMLSpanElement[] = [];

    rawText.split('').forEach((char) => {
      const span = document.createElement('span');
      span.innerText = char === ' ' ? '\u00A0' : char; // Keep non-breaking space
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      text.appendChild(span);
      letters.push(span);
    });

    const tl = gsap.timeline({
      onComplete: () => {
        // Slide the loading container up completely
        gsap.to(container, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut',
          onComplete: () => {
            setIsVisible(false);
            window.dispatchEvent(new Event('resize'));
            if (onComplete) {
              onComplete();
            }
          },
        });
      },
    });

    // 1. Calming initial delay
    tl.delay(0.3);

    // 2. Letters fade in with blur and gentle translate up
    tl.to(letters, {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      stagger: 0.04,
      duration: 1.2,
      ease: 'power3.out',
      onStart: () => {
        gsap.set(letters, { filter: 'blur(12px)', y: 15 });
      },
    });

    // Also animate mobile logo if present
    if (mobileLogo) {
      tl.fromTo(
        mobileLogo,
        { opacity: 0, scale: 0.9, filter: 'blur(10px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 1.2, ease: 'power3.out' },
        0.3
      );
    }

    // 3. Subtitle slides up gently
    tl.fromTo(
      subtitle,
      { opacity: 0, y: 10 },
      { opacity: 0.8, y: 0, duration: 1.0, ease: 'power2.out' },
      '-=0.6'
    );

    // 4. Calming pause at full opacity before slide-out
    tl.to({}, { duration: 1.0 });

    return () => {
      tl.kill();
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-[#081226] z-[99999] flex flex-col items-center justify-center select-none p-6"
    >
      <div className="text-center flex flex-col items-center justify-center w-full max-w-4xl mx-auto">
        
        {/* Centered Loading Logo */}
        <div ref={mobileLogoRef} className="block md:hidden my-auto py-4">
          <Image
            src="/Logo-loading.png"
            alt="Arventis Partners Loading Logo"
            width={320}
            height={140}
            priority
            className="w-auto h-24 sm:h-32 object-contain filter contrast-[1.05] drop-shadow-md mx-auto"
          />
        </div>

        {/* Desktop Title */}
        <h1
          ref={textRef}
          className="hidden md:block font-serif text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-[0.25em] text-[#faf6ee] font-normal leading-normal uppercase whitespace-nowrap"
        >
          ARVENTIS PARTNERS
        </h1>

        {/* Subtitle Tagline */}
        <p
          ref={subtitleRef}
          className="font-sans text-xs md:text-sm tracking-[0.4em] text-[#c5a880] uppercase mt-4 md:mt-6 opacity-0 font-medium"
        >
          Where Strategy Meets Consulting
        </p>
      </div>
    </div>
  );
}
