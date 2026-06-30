'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { MapPin, CheckCircle2, X } from 'lucide-react';
import { peopleData, Person } from './peopleData';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function OurPeoplePage() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const filters = ['All', 'Strategy Consulting', 'Legal', 'Advocates'];

  const filteredPeople = activeFilter === 'All' 
    ? peopleData 
    : peopleData.filter(person => person.discipline === activeFilter);

  // Prevent scrolling on body when modal is open
  useEffect(() => {
    if (selectedPerson) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedPerson]);

  return (
    <main className="min-h-screen bg-slate-50 pb-0">
      <Navbar />
      {/* 1. Hero Section */}
      <section className="bg-slate-900 text-white pt-32 md:pt-40 pb-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-serif font-light mb-6">One Team, Two Disciplines</h1>
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
            Arventis is led by founding partners across strategy and law, supported by senior advocates and experienced consultants with decades of experience. Every engagement is handled by someone who has done the work before, not handed off to whoever is available.
          </p>
        </div>
      </section>

      {/* 2. Filter Bar */}
      <div className="sticky top-0 z-20 bg-slate-50/90 backdrop-blur-md py-6 px-6 md:px-12 border-b border-slate-200">
        <div className="max-w-6xl mx-auto flex flex-wrap gap-3 justify-center md:justify-start">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === filter 
                  ? 'bg-slate-900 text-white shadow-md' 
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* 3. The Grid & Cards */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-24">
        <div className="flex flex-wrap justify-center gap-12">
          {filteredPeople.map(person => (
            <div 
              key={person.id} 
              onClick={() => setSelectedPerson(person)}
              className="bg-white rounded-none cursor-pointer group hover:shadow-2xl transition-all duration-500 flex flex-col h-full w-full md:w-[calc(50%-1.5rem)] lg:w-[calc(33.333%-2rem)]"
            >
              <div className="relative w-full aspect-[4/5] overflow-hidden bg-slate-200">
                <Image
                  src={person.imagePath}
                  alt={person.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 ease-in-out scale-100 group-hover:scale-105"
                />
              </div>
              <div className="p-8 flex flex-col flex-grow">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                  {person.discipline}
                </span>
                <h3 className="text-3xl font-serif text-slate-900 mb-2 group-hover:text-slate-700 transition-colors">
                  {person.name}
                </h3>
                <p className="text-sm font-medium text-slate-600 mb-6">
                  {person.title}
                </p>
                <p className="text-sm text-slate-500 line-clamp-3 mt-auto leading-relaxed">
                  {person.shortBio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. The Detail View (Modal) */}
      {selectedPerson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 lg:p-12 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
          <div 
            className="bg-white w-full max-w-6xl max-h-[95vh] overflow-y-auto rounded-none shadow-2xl relative animate-in slide-in-from-bottom-8 duration-500"
          >
            {/* Close Button */}
            <button 
              onClick={() => setSelectedPerson(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors z-20 group"
            >
              <X className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </button>

            <div className="flex flex-col md:flex-row h-full">
              {/* Left Column (30%) */}
              <div className="w-full md:w-1/3 bg-slate-50 p-8 md:p-12 border-r border-slate-100 flex flex-col">
                <div className="relative w-full aspect-square md:aspect-[4/5] mb-8 overflow-hidden shadow-md">
                  <Image
                    src={selectedPerson.imagePath}
                    alt={selectedPerson.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h2 className="text-4xl font-serif text-slate-900 mb-2">{selectedPerson.name}</h2>
                <p className="text-slate-600 font-medium text-lg mb-8">{selectedPerson.title}</p>
                
                <div className="space-y-6 mt-auto">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-2">Experience</span>
                    <p className="text-base font-medium text-slate-800">{selectedPerson.experience}</p>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest block mb-3">Geographies</span>
                    <ul className="space-y-3">
                      {selectedPerson.geographies.map((geo, idx) => (
                        <li key={idx} className="flex items-start text-sm font-medium text-slate-800">
                          <MapPin className="w-4 h-4 mr-3 text-slate-400 shrink-0 mt-0.5" />
                          <span>{geo}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right Column (70%) */}
              <div className="w-full md:w-2/3 p-8 md:p-16 lg:p-20 flex flex-col justify-center">
                <p className="text-2xl md:text-3xl font-serif text-slate-900 leading-tight mb-8 font-medium">
                  "{selectedPerson.shortBio}"
                </p>
                <div className="text-lg text-slate-600 leading-relaxed mb-12 whitespace-pre-line">
                  {selectedPerson.fullBio}
                </div>

                <div className="mt-auto">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-widest mb-6 border-b border-slate-200 pb-3">
                    Practice Highlights
                  </h4>
                  <ul className="space-y-5">
                    {selectedPerson.highlights.map(highlight => (
                      <li key={highlight.id} className="flex items-start group">
                        <CheckCircle2 className="w-6 h-6 mr-4 text-slate-800 shrink-0 mt-0.5 opacity-80 group-hover:opacity-100 transition-opacity" />
                        <span className="text-base text-slate-700 leading-relaxed font-medium group-hover:text-slate-900 transition-colors">
                          {highlight.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </main>
  );
}
