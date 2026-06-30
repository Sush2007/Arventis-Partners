'use client';

import React, { useState, useRef } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReCAPTCHA from 'react-google-recaptcha';
import { Compass } from 'lucide-react';

export default function ContactUsPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    name: '',
    organisation: '',
    email: '',
    phone: '',
    message: '',
  });

  const onCaptchaChange = (token: string | null) => {
    setCaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!captchaToken) {
      setErrorMessage('Please verify that you are not a robot.');
      return;
    }
    
    setIsLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/contact-us', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          captchaToken
        }),
      });

      const result = await res.json();
      if (result.success) {
        setIsSubmitted(true);
        setFormData({ name: '', organisation: '', email: '', phone: '', message: '' });
      } else {
        setErrorMessage(result.error || 'Failed to submit enquiry. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('A network error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
        setCaptchaToken(null);
      }
    }
  };

  return (
    <div className="relative w-full min-h-screen flex flex-col bg-[#081226] text-white">
      <Navbar />

      <main className="flex-grow flex items-center justify-center pt-32 md:pt-40 pb-24 px-6">
        <div className="w-full max-w-2xl">
          
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-white mb-3">Contact Us</h1>
          </div>

          <div className="p-8 md:p-12 bg-white/85 backdrop-blur-2xl border border-white/60 rounded-xl shadow-2xl text-[#081226]">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 bg-[#081226]/5 border border-[#081226]/20 rounded-full flex items-center justify-center mx-auto text-[#081226] mb-6">
                  <Compass className="w-8 h-8 text-[#c5a880]" />
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-light">Mandate Received</h3>
                <p className="font-sans text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  Thank you for showing your interest. We have received your inquiry and will be in touch shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="mt-6 inline-flex justify-center bg-transparent hover:bg-[#081226] hover:text-white text-[#081226] text-xs font-bold tracking-widest uppercase border border-[#081226]/30 px-6 py-3 transition-all duration-300 rounded-md"
                >
                  Submit Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <p className="font-sans text-sm text-slate-600 leading-relaxed font-medium mb-6">
                    Note: All Asterisks (*) must be filled.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg font-sans">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-[#081226] mb-2 font-bold">
                      Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-white/70 backdrop-blur-sm border border-slate-300 px-4 py-3 text-sm text-[#081226] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#081226] transition-all duration-300 font-sans rounded-md shadow-sm"
                      placeholder="Your name or entity"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-[#081226] mb-2 font-bold">
                      Organisation
                    </label>
                    <input
                      type="text"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      className="w-full bg-white/70 backdrop-blur-sm border border-slate-300 px-4 py-3 text-sm text-[#081226] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#081226] transition-all duration-300 font-sans rounded-md shadow-sm"
                      placeholder="Organisation name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-[#081226] mb-2 font-bold">
                      Email address *
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/70 backdrop-blur-sm border border-slate-300 px-4 py-3 text-sm text-[#081226] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#081226] transition-all duration-300 font-sans rounded-md shadow-sm"
                      placeholder="email@domain.com"
                    />
                  </div>

                  <div>
                    <label className="block font-sans text-xs tracking-widest uppercase text-[#081226] mb-2 font-bold">
                      Phone number *
                    </label>
                    <input
                      required
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/70 backdrop-blur-sm border border-slate-300 px-4 py-3 text-sm text-[#081226] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#081226] transition-all duration-300 font-sans rounded-md shadow-sm"
                      placeholder="+91 99000 00000"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-sans text-xs tracking-widest uppercase text-[#081226] mb-2 font-bold">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/70 backdrop-blur-sm border border-slate-300 px-4 py-3 text-sm text-[#081226] placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-[#081226] transition-all duration-300 font-sans resize-none rounded-md shadow-sm"
                    placeholder="Please describe the parameters of your enquiry..."
                  />
                </div>

                <div className="flex justify-center md:justify-start">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "INSERT_KEY_VALUE"}
                    onChange={onCaptchaChange}
                    theme="light"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-[#081226] hover:bg-[#1a2b4c] disabled:bg-[#081226]/50 text-white text-sm font-bold tracking-[0.2em] uppercase py-4 transition-all duration-300 rounded-md shadow-lg flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <span>Contact Us</span>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
