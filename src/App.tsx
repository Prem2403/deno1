import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CounterStats } from './components/CounterStats';
import { RoomShowcase } from './components/RoomShowcase';
import { Amenities } from './components/Amenities';
import { ParallaxBanner } from './components/ParallaxBanner';
import { GallerySection } from './components/GallerySection';
import { ReviewSlider } from './components/ReviewSlider';
import { FaqAccordion } from './components/FaqAccordion';
import { ContactMap } from './components/ContactMap';
import { WhatsAppButton } from './components/WhatsAppButton';
import { Footer } from './components/Footer';

export default function App() {
  const [selectedSuiteCategory, setSelectedSuiteCategory] = useState<string>('all');
  const [checkInDate, setCheckInDate] = useState<string>('2026-11-12');
  const [checkOutDate, setCheckOutDate] = useState<string>('2026-11-17');

  const handleCheckAvailability = (criteria: {
    checkIn: string;
    checkOut: string;
    suiteType: string;
    guests: number;
  }) => {
    setCheckInDate(criteria.checkIn);
    setCheckOutDate(criteria.checkOut);
    setSelectedSuiteCategory(criteria.suiteType);

    // Smoothly scroll down to sanctuaries section
    const elem = document.getElementById('sanctuaries');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToSanctuaries = () => {
    const elem = document.getElementById('sanctuaries');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleScrollToContact = () => {
    const elem = document.getElementById('location');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#fbf9f5] text-[#181716] font-sans antialiased selection:bg-[#c5a059] selection:text-white relative">
      {/* Top Navbar with thin progress bar, sticky shrink and soft shadow */}
      <Navbar
        onOpenBooking={handleScrollToSanctuaries}
        onOpenConcierge={handleScrollToContact}
      />

      {/* Main Page Flow */}
      <main>
        {/* Hero Section: Word-by-word headline fade, Ken Burns slideshow, sliding booking bar */}
        <Hero
          onCheckAvailability={handleCheckAvailability}
          onExploreSanctuaries={handleScrollToSanctuaries}
        />

        {/* Counter Stats: Count up once on scroll */}
        <CounterStats />

        {/* Sanctuaries / Rooms: Sliding tab underline, hover lift & zoom, scale-in modal */}
        <RoomShowcase
          initialCategory={selectedSuiteCategory}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />

        {/* Sanctuary Amenities: Icon rise & accent color on hover */}
        <Amenities />

        {/* Large Parallax Background Photo Banner */}
        <ParallaxBanner onOpenBooking={handleScrollToSanctuaries} />

        {/* Visual Gallery: Image hover zoom & cross-fade lightbox */}
        <GallerySection />

        {/* Review Slider: Auto 6s slide/fade with pause on hover */}
        <ReviewSlider />

        {/* FAQs: Smooth height transition accordion */}
        <FaqAccordion />

        {/* Contact & Map: Google Maps pin drops in once */}
        <ContactMap />
      </main>

      {/* Footer */}
      <Footer />

      {/* WhatsApp Button: Soft periodic pulse and instant concierge drawer */}
      <WhatsAppButton onOpenBooking={handleScrollToSanctuaries} />
    </div>
  );
}
