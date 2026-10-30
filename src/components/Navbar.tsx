import React, { useState } from 'react';
import { Menu, X, Compass, Phone } from 'lucide-react';
import { useScrollProgress } from '../hooks/useScrollProgress';

interface NavbarProps {
  onOpenBooking: () => void;
  onOpenConcierge: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, onOpenConcierge }) => {
  const { scrollProgress, isScrolled } = useScrollProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Sanctuaries', href: '#sanctuaries' },
    { label: 'Wellness', href: '#wellness' },
    { label: 'Experiences', href: '#experiences' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Location & FAQs', href: '#location' },
  ];

  return (
    <>
      {/* Scroll Progress Bar at the absolute top of the viewport */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-black/5 pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-[#d4af37] via-[#c5a059] to-[#e6ca85] transition-[width] duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Sticky Header with soft shadow and slight shrink after scrolling */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ease-luxury ${
          isScrolled
            ? 'bg-[#fbf9f5]/95 backdrop-blur-md py-3.5 shadow-sm shadow-[#181716]/8 border-b border-[#181716]/6'
            : 'bg-gradient-to-b from-black/60 via-black/30 to-transparent py-6 text-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#"
            className="flex items-center gap-2 group transition-transform duration-500 ease-luxury focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
          >
            <Compass
              className={`transition-all duration-700 ease-luxury ${
                isScrolled ? 'text-[#c5a059] w-6 h-6' : 'text-[#e6ca85] w-7 h-7'
              } group-hover:rotate-45`}
            />
            <div className="flex flex-col">
              <span
                className={`font-serif tracking-[0.2em] font-medium transition-all duration-700 ease-luxury ${
                  isScrolled
                    ? 'text-lg text-[#181716]'
                    : 'text-xl text-white drop-shadow-sm'
                }`}
              >
                L’ÉCRIN
              </span>
              <span
                className={`text-[9px] uppercase tracking-[0.3em] font-sans -mt-1 transition-colors duration-500 ${
                  isScrolled ? 'text-[#736e67]' : 'text-stone-300'
                }`}
              >
                Sanctuary & Spa
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-[0.12em] uppercase font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`relative py-1 transition-colors duration-500 ease-luxury group ${
                  isScrolled
                    ? 'text-[#4a463f] hover:text-[#181716]'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#c5a059] transition-all duration-500 ease-luxury group-hover:w-full" />
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            <button
              onClick={onOpenConcierge}
              aria-label="Direct Concierge Line"
              className={`btn-luxury flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase border transition-all ${
                isScrolled
                  ? 'border-[#181716]/15 text-[#181716] hover:bg-[#181716]/5'
                  : 'border-white/30 text-white hover:bg-white/10'
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-[#c5a059]" />
              <span>Concierge</span>
            </button>

            <button
              onClick={onOpenBooking}
              className="btn-luxury px-5 py-2 rounded-full text-xs font-semibold tracking-[0.15em] uppercase bg-[#c5a059] text-white hover:bg-[#b08c46] shadow-sm shadow-[#c5a059]/30"
            >
              Reserve Stay
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            className={`lg:hidden p-2 rounded-md transition-colors ${
              isScrolled ? 'text-[#181716]' : 'text-white'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer with smooth fade and transition */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-500 ease-luxury ${
            mobileMenuOpen ? 'max-h-96 opacity-100 mt-3 py-4' : 'max-h-0 opacity-0 py-0'
          } bg-[#fbf9f5] border-t border-[#181716]/10 px-6`}
        >
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-[#181716]">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-1 border-b border-[#181716]/5 hover:text-[#c5a059] transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="btn-luxury w-full py-2.5 text-center text-xs uppercase tracking-widest font-semibold bg-[#c5a059] text-white rounded-full"
              >
                Reserve Stay
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenConcierge();
                }}
                className="btn-luxury w-full py-2.5 text-center text-xs uppercase tracking-widest font-medium border border-[#181716]/20 rounded-full text-[#181716]"
              >
                Contact Concierge
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};
