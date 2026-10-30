import React, { useState } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { MapPin, Navigation, Phone, Mail, Compass, Layers, CheckCircle2, Send } from 'lucide-react';

export const ContactMap: React.FC = () => {
  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });
  const [mapMode, setMapMode] = useState<'stylized' | 'satellite'>('stylized');
  const [zoomLevel, setZoomLevel] = useState<number>(14);

  // Inquiry form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dates: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setSubmitted(true);
  };

  return (
    <section id="location" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div
        className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-luxury"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-3">
          Secluded Coordinates
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#181716]">
          Finding Sanctuary
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#736e67] font-sans font-light">
          Nestled on the Southern Promontory of the Aegean. Protected from northern winds, bathed in all-day golden warmth.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Simulated Google Map Card with Pin Drop */}
        <div
          className="lg:col-span-7 bg-[#fbf9f5] rounded-3xl overflow-hidden border border-[#181716]/8 shadow-lg flex flex-col transition-all duration-700 ease-luxury"
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Map Header Bar */}
          <div className="px-5 py-3.5 bg-[#f4efe6] border-b border-[#181716]/6 flex items-center justify-between text-xs font-sans">
            <div className="flex items-center gap-2 text-[#181716] font-medium">
              <Compass className="w-4 h-4 text-[#c5a059]" />
              <span>36°23&apos;42.8&quot;N 25°27&apos;18.4&quot;E · Private Cape</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setMapMode('stylized')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  mapMode === 'stylized' ? 'bg-white text-[#181716] shadow-xs' : 'text-[#736e67] hover:text-[#181716]'
                }`}
              >
                Terrain
              </button>
              <button
                onClick={() => setMapMode('satellite')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  mapMode === 'satellite' ? 'bg-white text-[#181716] shadow-xs' : 'text-[#736e67] hover:text-[#181716]'
                }`}
              >
                Satellite
              </button>
            </div>
          </div>

          {/* Map Visual Surface */}
          <div className="relative h-96 sm:h-[440px] w-full overflow-hidden select-none bg-[#e8e2d5]">
            {mapMode === 'satellite' ? (
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80"
                alt="Satellite Coast View"
                className="w-full h-full object-cover filter contrast-105"
              />
            ) : (
              /* Stylized Vector Terrain Simulation */
              <div className="relative w-full h-full bg-[#f3ede2]">
                {/* Simulated Coastline SVG */}
                <svg className="w-full h-full" viewBox="0 0 800 500" preserveAspectRatio="none">
                  {/* Sea Water */}
                  <path
                    d="M 0,0 L 800,0 L 800,280 C 650,220 540,320 400,250 C 260,180 180,310 0,260 Z"
                    fill="#cadbdc"
                  />
                  {/* Sandy Beach Fringe */}
                  <path
                    d="M 0,260 C 180,310 260,180 400,250 C 540,320 650,220 800,280 L 800,310 C 650,240 540,340 400,270 C 260,200 180,330 0,280 Z"
                    fill="#dfd3be"
                  />
                  {/* Topographic Lines */}
                  <path
                    d="M 50,350 Q 200,310 400,370 T 750,330"
                    stroke="#c8beaf"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  <path
                    d="M 80,410 Q 240,380 420,430 T 780,390"
                    stroke="#c8beaf"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    fill="none"
                  />
                  {/* Private Coastal Road */}
                  <path
                    d="M 100,500 C 200,420 300,400 400,320"
                    stroke="#ffffff"
                    strokeWidth="4"
                    strokeLinecap="round"
                    fill="none"
                  />
                  {/* Helipad Symbol */}
                  <circle cx="440" cy="300" r="16" fill="#f4efe6" stroke="#c5a059" strokeWidth="2" />
                  <text x="440" y="305" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#c5a059">H</text>
                </svg>
              </div>
            )}

            {/* Google Maps Pin: Drops in once when scrolled into view */}
            <div className="absolute top-[48%] left-[50%] -translate-x-1/2 -translate-y-full z-20 flex flex-col items-center pointer-events-none">
              <div
                className={`relative flex items-center justify-center ${
                  hasEntered ? 'animate-pin-drop' : 'opacity-0'
                }`}
              >
                {/* SVG Google-Style Pin */}
                <div className="relative group">
                  <div className="w-11 h-11 rounded-full bg-[#181716] text-[#c5a059] flex items-center justify-center shadow-2xl border-2 border-[#c5a059]">
                    <MapPin className="w-6 h-6 fill-[#c5a059] text-[#181716]" />
                  </div>
                  {/* Radar pulse around pin point */}
                  <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-1.5 bg-black/40 rounded-full blur-[1px]" />
                </div>
              </div>

              {/* Pin Callout Label */}
              <div
                className={`mt-2 bg-[#181716]/95 backdrop-blur-md px-3.5 py-1.5 rounded-full shadow-lg border border-[#c5a059]/40 text-white text-xs font-serif whitespace-nowrap transition-all duration-700 ease-luxury ${
                  hasEntered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                }`}
                style={{ transitionDelay: '600ms' }}
              >
                L’Écrin Sanctuary & Spa <span className="text-[#c5a059]">✦</span>
              </div>
            </div>

            {/* Zoom Controls Overlay */}
            <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1 shadow-md rounded-lg overflow-hidden bg-white/90 backdrop-blur-md">
              <button
                onClick={() => setZoomLevel((z) => Math.min(18, z + 1))}
                aria-label="Zoom In Map"
                className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#181716] hover:bg-stone-100 border-b border-stone-200"
              >
                +
              </button>
              <button
                onClick={() => setZoomLevel((z) => Math.max(10, z - 1))}
                aria-label="Zoom Out Map"
                className="w-8 h-8 flex items-center justify-center text-sm font-bold text-[#181716] hover:bg-stone-100"
              >
                −
              </button>
            </div>

            {/* Google Attribution Watermark */}
            <div className="absolute bottom-1 left-2 z-20 text-[9px] text-[#181716]/60 font-sans">
              Google Maps Interactive Preview · Zoom {zoomLevel}x
            </div>
          </div>

          {/* Arrival Logistics Bar */}
          <div className="p-5 bg-[#fbf9f5] border-t border-[#181716]/6 grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#736e67]">Airport Maybach</span>
              <p className="font-medium text-[#181716] mt-0.5">45 min direct</p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#736e67]">Private Helipad</span>
              <p className="font-medium text-[#181716] mt-0.5">Coords Verified (ICAO: LERN)</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <span className="text-[10px] uppercase tracking-wider text-[#736e67]">Deep Water Berth</span>
              <p className="font-medium text-[#181716] mt-0.5">Private Riva Pontoon</p>
            </div>
          </div>
        </div>

        {/* Direct Concierge Inquiry Card */}
        <div
          className="lg:col-span-5 bg-[#fbf9f5] rounded-3xl p-6 sm:p-8 border border-[#181716]/8 shadow-md flex flex-col justify-between transition-all duration-700 ease-luxury"
          style={{
            transitionDelay: '80ms',
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              Private Concierge Desk
            </span>
            <h3 className="text-2xl font-serif text-[#181716] mt-1">
              Direct Estate Inquiries
            </h3>
            <p className="mt-2 text-xs text-[#736e67] font-sans font-light leading-relaxed">
              For presidential penthouses, multi-villa buyouts, private jet arrival, or bespoke wellness retreats, connect with our Head of Sanctuary Services.
            </p>

            {submitted ? (
              <div className="mt-6 p-6 rounded-2xl bg-[#f4efe6] border border-[#c5a059]/40 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-[#c5a059] mx-auto" />
                <h4 className="text-lg font-serif text-[#181716]">Inquiry Received with Honour</h4>
                <p className="text-xs text-[#4a463f] leading-relaxed">
                  Thank you, {formData.name}. Our Head of Concierge has received your inquiry and will reach out privately via {formData.email} within 2 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="mt-6 space-y-4">
                <div>
                  <label htmlFor="inquiry-name" className="text-[10px] uppercase tracking-wider text-[#736e67] block mb-1">
                    Full Name
                  </label>
                  <input
                    id="inquiry-name"
                    required
                    type="text"
                    placeholder="e.g. Eleanor Vance"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f4efe6]/80 border border-[#181716]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-email" className="text-[10px] uppercase tracking-wider text-[#736e67] block mb-1">
                    Confidential Email Address
                  </label>
                  <input
                    id="inquiry-email"
                    required
                    type="email"
                    placeholder="eleanor@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f4efe6]/80 border border-[#181716]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-dates" className="text-[10px] uppercase tracking-wider text-[#736e67] block mb-1">
                    Preferred Dates or Window
                  </label>
                  <input
                    id="inquiry-dates"
                    type="text"
                    placeholder="e.g. November 2026 (5-7 nights)"
                    value={formData.dates}
                    onChange={(e) => setFormData({ ...formData, dates: e.target.value })}
                    className="w-full bg-[#f4efe6]/80 border border-[#181716]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>

                <div>
                  <label htmlFor="inquiry-message" className="text-[10px] uppercase tracking-wider text-[#736e67] block mb-1">
                    Special Inquiries & Preferences
                  </label>
                  <textarea
                    id="inquiry-message"
                    rows={3}
                    placeholder="Helipad arrival, private yacht charter, dietary requests..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#f4efe6]/80 border border-[#181716]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#181716] focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-luxury w-full py-3.5 rounded-full bg-[#181716] text-[#fbf9f5] hover:bg-[#c5a059] text-xs uppercase tracking-[0.18em] font-semibold flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Dispatch Private Inquiry</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>

          <div className="mt-8 pt-6 border-t border-[#181716]/8 space-y-2 text-xs text-[#736e67]">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#c5a059]" />
              <span>Estate Line: +30 2286 099800 (24h Concierge)</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#c5a059]" />
              <span>Direct: sanctuaries@lecrin-retreat.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
