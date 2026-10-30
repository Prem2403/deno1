import React, { useState } from 'react';
import { Compass, ArrowRight, ShieldCheck, Award } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-[#181716] text-[#fbf9f5] pt-20 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="w-6 h-6 text-[#c5a059]" />
              <span className="font-serif tracking-[0.2em] text-xl font-medium text-white">
                L’ÉCRIN
              </span>
            </div>
            <p className="text-xs text-white/60 font-sans font-light max-w-sm leading-relaxed">
              An intimate sanctuary carved into natural volcanic stone. A sovereign retreat of stillness, Aegean ocean horizons, and bespoke hospitality.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-[#c5a059]">
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4" />
                MICHELIN 3 Keys 2026
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                Virtuoso Preferred
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white/90">
              Sanctuaries
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-sans">
              <li><a href="#sanctuaries" className="hover:text-white transition-colors">Oceanfront Villas</a></li>
              <li><a href="#sanctuaries" className="hover:text-white transition-colors">Olive Pavilions</a></li>
              <li><a href="#sanctuaries" className="hover:text-white transition-colors">Royal Belvedere</a></li>
              <li><a href="#sanctuaries" className="hover:text-white transition-colors">Sunset Cove Suites</a></li>
            </ul>
          </div>

          {/* Experiences */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white/90">
              Experiences
            </h4>
            <ul className="space-y-2 text-xs text-white/60 font-sans">
              <li><a href="#wellness" className="hover:text-white transition-colors">Ayurvedic Thermal Spa</a></li>
              <li><a href="#wellness" className="hover:text-white transition-colors">Olea Gastronomy</a></li>
              <li><a href="#wellness" className="hover:text-white transition-colors">Private Riva Yacht</a></li>
              <li><a href="#gallery" className="hover:text-white transition-colors">Visual Anthology</a></li>
            </ul>
          </div>

          {/* Newsletter / Gazette */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] font-medium text-white/90">
              The Sanctuary Chronicle
            </h4>
            <p className="text-xs text-white/60 font-sans font-light">
              Periodic private letters on seasonal retreats, gastronomic harvests, and acoustic solitude.
            </p>

            {subscribed ? (
              <div className="text-xs text-[#c5a059] font-medium py-2">
                Thank you for joining our private circle.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/15 rounded-full px-3.5 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to Chronicle"
                  className="btn-luxury p-2 rounded-full bg-[#c5a059] text-white hover:bg-[#b08c46] shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 font-sans gap-4">
          <div>
            © {new Date().getFullYear()} L’Écrin Sanctuary & Spa. All rights reserved.
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Stay</a>
            <a href="#" className="hover:text-white transition-colors">Acoustic Standards</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
