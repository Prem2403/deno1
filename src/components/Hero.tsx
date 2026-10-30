import React, { useState, useEffect } from 'react';
import { Calendar, Users, Home, ArrowRight, ShieldCheck } from 'lucide-react';
import { HERO_SLIDES } from '../data/resortData';

interface HeroProps {
  onCheckAvailability: (bookingCriteria: {
    checkIn: string;
    checkOut: string;
    suiteType: string;
    guests: number;
  }) => void;
  onExploreSanctuaries: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onCheckAvailability, onExploreSanctuaries }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Booking bar state
  const [checkIn, setCheckIn] = useState('2026-11-12');
  const [checkOut, setCheckOut] = useState('2026-11-17');
  const [suiteType, setSuiteType] = useState('all');
  const [guests, setGuests] = useState(2);

  // Trigger page load animation sequence
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 80);
    return () => clearTimeout(timer);
  }, []);

  // Background slideshow rotation (every 7 seconds)
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 7000);
    return () => clearInterval(slideInterval);
  }, []);

  const headlineWords = ['Where', 'Silence', 'Meets', 'the', 'Ocean'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCheckAvailability({ checkIn, checkOut, suiteType, guests });
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 pb-10 overflow-hidden bg-[#181716]">
      {/* Background Slideshow with Slow Cross-Fade & Ken Burns (5% zoom) */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none">
        {HERO_SLIDES.map((slide, idx) => {
          const isActive = idx === currentSlide;
          return (
            <div
              key={slide.image}
              className={`absolute inset-0 transition-opacity duration-1500 ease-luxury ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <div
                className={`w-full h-full bg-cover bg-center transition-transform duration-[7000ms] ease-luxury ${
                  isActive ? 'scale-105' : 'scale-100'
                }`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            </div>
          );
        })}
        {/* Subtle Atmospheric Vignette & Gradients */}
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#181716]/90 via-[#181716]/40 to-[#181716]/60" />
      </div>

      {/* Hero Central Content */}
      <div className="relative z-20 max-w-5xl mx-auto px-6 text-center my-auto flex flex-col items-center">
        {/* Subtle Location Pill */}
        <div
          className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white/90 text-xs font-sans tracking-[0.25em] uppercase mb-6 transition-all duration-700 ease-luxury ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '100ms' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] animate-pulse" />
          <span>Southern Aegean Promontory · Sanctuary Seclusion</span>
        </div>

        {/* Hero Headline: Fades up ONE WORD AT A TIME */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif text-white tracking-wide font-normal leading-[1.1] max-w-4xl">
          {headlineWords.map((word, index) => {
            const delayMs = 200 + index * 120;
            return (
              <span
                key={index}
                className="inline-block mx-1.5 sm:mx-2.5 transition-all duration-700 ease-luxury"
                style={{
                  transitionDelay: `${delayMs}ms`,
                  opacity: isLoaded ? 1 : 0,
                  transform: isLoaded ? 'translateY(0)' : 'translateY(28px)',
                }}
              >
                {word === 'Silence' ? (
                  <span className="italic font-light text-[#f3e5c8] underline decoration-[#c5a059]/40 underline-offset-8">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </span>
            );
          })}
        </h1>

        {/* Subtitle follows with a short delay */}
        <p
          className="mt-6 max-w-2xl text-base sm:text-lg text-white/80 font-sans font-light leading-relaxed transition-all duration-700 ease-luxury"
          style={{
            transitionDelay: '840ms',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          Thirty-six private cliffside pavilions carved into natural travertine stone.
          A timeless realm of restorative silence, private saltwater horizons, and Michelin-starred biodynamic gastronomy.
        </p>

        {/* Action Buttons follow with short delay */}
        <div
          className="mt-9 flex flex-wrap items-center justify-center gap-4 transition-all duration-700 ease-luxury"
          style={{
            transitionDelay: '1000ms',
            opacity: isLoaded ? 1 : 0,
            transform: isLoaded ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <button
            onClick={onExploreSanctuaries}
            className="btn-luxury group flex items-center gap-3 px-7 py-3.5 rounded-full bg-[#c5a059] text-white hover:bg-[#b08c46] text-xs uppercase tracking-[0.2em] font-medium shadow-lg shadow-[#c5a059]/25"
          >
            <span>Explore Pavilions & Villas</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-500 ease-luxury group-hover:translate-x-1" />
          </button>

          <a
            href="#wellness"
            className="btn-luxury px-7 py-3.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white text-xs uppercase tracking-[0.2em] font-medium"
          >
            The Wellness Journey
          </a>
        </div>
      </div>

      {/* Booking Bar: Slides up from the bottom of the hero */}
      <div
        className="relative z-30 max-w-6xl mx-auto w-full px-4 sm:px-6 transition-all duration-800 ease-luxury mt-8"
        style={{
          transitionDelay: '1150ms',
          opacity: isLoaded ? 1 : 0,
          transform: isLoaded ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        <div className="bg-[#fbf9f5] rounded-2xl sm:rounded-full p-4 sm:p-3 sm:pl-7 shadow-2xl shadow-black/40 border border-[#181716]/10">
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-center"
          >
            {/* Check-In */}
            <div className="flex items-center gap-3 pr-2 lg:border-r border-[#181716]/10">
              <Calendar className="w-5 h-5 text-[#c5a059] shrink-0" />
              <div className="flex flex-col text-left w-full">
                <label htmlFor="check-in-date" className="text-[10px] uppercase tracking-wider text-[#736e67] font-semibold">
                  Check-In
                </label>
                <input
                  id="check-in-date"
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#181716] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Check-Out */}
            <div className="flex items-center gap-3 pr-2 lg:border-r border-[#181716]/10">
              <Calendar className="w-5 h-5 text-[#c5a059] shrink-0" />
              <div className="flex flex-col text-left w-full">
                <label htmlFor="check-out-date" className="text-[10px] uppercase tracking-wider text-[#736e67] font-semibold">
                  Check-Out
                </label>
                <input
                  id="check-out-date"
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#181716] focus:outline-none cursor-pointer"
                />
              </div>
            </div>

            {/* Suite Category */}
            <div className="flex items-center gap-3 pr-2 lg:border-r border-[#181716]/10">
              <Home className="w-5 h-5 text-[#c5a059] shrink-0" />
              <div className="flex flex-col text-left w-full">
                <label htmlFor="suite-type" className="text-[10px] uppercase tracking-wider text-[#736e67] font-semibold">
                  Sanctuary Tier
                </label>
                <select
                  id="suite-type"
                  value={suiteType}
                  onChange={(e) => setSuiteType(e.target.value)}
                  className="bg-transparent text-xs font-medium text-[#181716] focus:outline-none cursor-pointer"
                >
                  <option value="all">All Sanctuaries</option>
                  <option value="villas">Oceanfront Villas</option>
                  <option value="pavilions">Hillside Pavilions</option>
                  <option value="penthouses">Royal Penthouses</option>
                </select>
              </div>
            </div>

            {/* Guests */}
            <div className="flex items-center gap-3 pr-2">
              <Users className="w-5 h-5 text-[#c5a059] shrink-0" />
              <div className="flex flex-col text-left w-full">
                <label htmlFor="guest-count" className="text-[10px] uppercase tracking-wider text-[#736e67] font-semibold">
                  Guests
                </label>
                <select
                  id="guest-count"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="bg-transparent text-xs font-medium text-[#181716] focus:outline-none cursor-pointer"
                >
                  <option value={1}>1 Guest (Solitude)</option>
                  <option value={2}>2 Guests (Couple)</option>
                  <option value={3}>3 Guests</option>
                  <option value={4}>4 Guests (Family)</option>
                  <option value={6}>6 Guests (Royal Party)</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <div className="w-full">
              <button
                type="submit"
                className="btn-luxury w-full py-3.5 px-6 rounded-xl sm:rounded-full bg-[#181716] text-[#fbf9f5] hover:bg-[#c5a059] hover:text-white text-xs uppercase tracking-[0.16em] font-medium flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Check Dates</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </form>

          {/* Quick guarantee pill */}
          <div className="mt-2.5 pt-2 border-t border-[#181716]/5 hidden sm:flex items-center justify-between text-[11px] text-[#736e67] px-4 font-sans">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c5a059]" />
              Best Rate Guarantee with direct concierge reservation
            </span>
            <span className="hidden md:inline">Complimentary private airport transfer on 4+ nights</span>
          </div>
        </div>
      </div>
    </section>
  );
};
