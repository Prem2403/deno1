import React, { useState, useEffect } from 'react';
import { X, Check, Users, Maximize2, Sparkles, Calendar, ArrowRight, ShieldCheck } from 'lucide-react';
import { Room } from '../types';
import { calculateBookingPrice, formatCurrency, calculateNights } from '../utils/booking';

interface RoomModalProps {
  room: Room | null;
  isOpen: boolean;
  onClose: () => void;
  initialCheckIn?: string;
  initialCheckOut?: string;
}

export const RoomModal: React.FC<RoomModalProps> = ({
  room,
  isOpen,
  onClose,
  initialCheckIn = '2026-11-12',
  initialCheckOut = '2026-11-17',
}) => {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(2);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  useEffect(() => {
    setActivePhotoIndex(0);
    setBookingConfirmed(false);
  }, [room]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !room) return null;

  const nights = calculateNights(checkIn, checkOut);
  const pricing = calculateBookingPrice(room.pricePerNight, nights, guests);

  const handleConfirmReservation = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConfirmed(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-room-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
    >
      {/* Backdrop with smooth fade */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#181716]/75 backdrop-blur-sm transition-opacity duration-500 ease-luxury"
      />

      {/* Modal Dialog Body: Fades and scales in from 95% to 100% */}
      <div
        className="relative z-10 w-full max-w-4xl bg-[#fbf9f5] rounded-3xl shadow-2xl overflow-hidden border border-[#181716]/10 animate-[modalScaleIn_0.6s_cubic-bezier(0.2,0.8,0.2,1)_forwards] my-auto max-h-[92vh] flex flex-col"
        style={{
          animation: 'modalScaleIn 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
        }}
      >
        <style>{`
          @keyframes modalScaleIn {
            0% {
              opacity: 0;
              transform: scale(0.95);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}</style>

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#181716]/8 bg-[#f4efe6]/50">
          <div>
            <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium">
              Sanctuary Suite Details
            </span>
            <h2 id="modal-room-title" className="text-xl sm:text-2xl font-serif text-[#181716]">
              {room.name}
            </h2>
          </div>

          <button
            onClick={onClose}
            aria-label="Close suite detail modal"
            className="p-2 rounded-full hover:bg-black/5 text-[#736e67] hover:text-[#181716] transition-colors duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          {/* Main Visual & Gallery Strip */}
          <div className="space-y-3">
            <div className="relative w-full h-72 sm:h-96 rounded-2xl overflow-hidden bg-stone-200">
              <img
                src={room.gallery[activePhotoIndex] || room.image}
                alt={room.name}
                className="w-full h-full object-cover transition-all duration-700 ease-luxury"
              />
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-sans">
                {room.view}
              </div>
            </div>

            {/* Thumbnails */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {room.gallery.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActivePhotoIndex(idx)}
                  className={`relative w-20 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all duration-300 ${
                    activePhotoIndex === idx
                      ? 'border-[#c5a059] scale-102 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${room.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-[#f4efe6]">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#736e67]">Living Space</span>
              <p className="text-sm font-medium text-[#181716] flex items-center gap-1.5 mt-0.5">
                <Maximize2 className="w-4 h-4 text-[#c5a059]" />
                {room.sizeSqM} m² / {Math.round(room.sizeSqM * 10.76)} ft²
              </p>
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#736e67]">Capacity</span>
              <p className="text-sm font-medium text-[#181716] flex items-center gap-1.5 mt-0.5">
                <Users className="w-4 h-4 text-[#c5a059]" />
                Up to {room.maxGuests} Guests
              </p>
            </div>
            <div className="sm:col-span-2">
              <span className="text-[10px] uppercase tracking-wider text-[#736e67]">Bedding & Comfort</span>
              <p className="text-sm font-medium text-[#181716] flex items-center gap-1.5 mt-0.5">
                <Sparkles className="w-4 h-4 text-[#c5a059]" />
                {room.bedType}
              </p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-sm uppercase tracking-widest text-[#181716] font-semibold mb-2">
              About the Sanctuary
            </h3>
            <p className="text-[#4a463f] text-sm leading-relaxed font-sans">
              {room.description}
            </p>
          </div>

          {/* Features & Amenities List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#181716] font-semibold mb-3">
                Architectural Inclusions
              </h4>
              <ul className="space-y-2">
                {room.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-[#4a463f]">
                    <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs uppercase tracking-wider text-[#181716] font-semibold mb-3">
                Curated Amenities & Technology
              </h4>
              <ul className="space-y-2">
                {room.amenities.map((amen, i) => (
                  <li key={i} className="flex items-center gap-2.5 text-xs text-[#4a463f]">
                    <Check className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{amen}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instant Reserve Calculator Card */}
          <div className="p-6 rounded-2xl bg-[#181716] text-[#fbf9f5]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#c5a059]">Nightly Rate</span>
                <div className="text-2xl font-serif">
                  {formatCurrency(room.pricePerNight)} <span className="text-xs text-white/60 font-sans">/ night</span>
                </div>
              </div>
              <div className="text-right sm:text-left">
                <span className="text-[10px] uppercase tracking-widest text-white/50">Stay Length</span>
                <div className="text-sm font-medium text-white/90">
                  {nights} {nights === 1 ? 'Night' : 'Nights'} ({formatCurrency(pricing.grandTotal)} total with tax)
                </div>
              </div>
            </div>

            {bookingConfirmed ? (
              <div className="mt-4 p-4 rounded-xl bg-[#c5a059]/20 border border-[#c5a059] text-center space-y-2">
                <div className="flex items-center justify-center gap-2 text-[#c5a059] font-medium text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>Reservation Hold Confirmed!</span>
                </div>
                <p className="text-xs text-white/80">
                  A priority hold has been placed on {room.name} for {nights} nights. Your dedicated butler will contact you within two hours to finalize flight coordination and preferences.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmReservation} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="modal-checkin" className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      Check-In
                    </label>
                    <input
                      id="modal-checkin"
                      type="date"
                      value={checkIn}
                      onChange={(e) => setCheckIn(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-checkout" className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      Check-Out
                    </label>
                    <input
                      id="modal-checkout"
                      type="date"
                      value={checkOut}
                      onChange={(e) => setCheckOut(e.target.value)}
                      className="w-full bg-white/10 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                    />
                  </div>
                  <div>
                    <label htmlFor="modal-guests" className="text-[10px] uppercase tracking-wider text-white/60 block mb-1">
                      Guests
                    </label>
                    <select
                      id="modal-guests"
                      value={guests}
                      onChange={(e) => setGuests(Number(e.target.value))}
                      className="w-full bg-stone-900 border border-white/15 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
                    >
                      {Array.from({ length: room.maxGuests }, (_, i) => i + 1).map((num) => (
                        <option key={num} value={num}>
                          {num} {num === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                  <div className="text-xs text-white/60">
                    Includes all daily gourmet breakfast, butler service, and private spa access.
                  </div>
                  <button
                    type="submit"
                    className="btn-luxury w-full sm:w-auto px-6 py-3 rounded-full bg-[#c5a059] text-white hover:bg-[#b08c46] text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2"
                  >
                    <span>Request Sanctuary Hold</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
