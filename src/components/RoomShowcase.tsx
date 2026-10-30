import React, { useState, useRef, useEffect } from 'react';
import { ROOMS } from '../data/resortData';
import { Room } from '../types';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { formatCurrency, filterRooms } from '../utils/booking';
import { Users, Maximize2, ArrowUpRight } from 'lucide-react';
import { RoomModal } from './RoomModal';

interface RoomShowcaseProps {
  initialCategory?: string;
  checkInDate?: string;
  checkOutDate?: string;
}

export const RoomShowcase: React.FC<RoomShowcaseProps> = ({
  initialCategory = 'all',
  checkInDate,
  checkOutDate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  // Sliding underline for category tabs
  const tabRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  const categories = [
    { id: 'all', label: 'All Sanctuaries' },
    { id: 'villas', label: 'Oceanfront Villas' },
    { id: 'pavilions', label: 'Hillside Pavilions' },
    { id: 'penthouses', label: 'Royal Penthouses' },
  ];

  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.1 });

  // Update underline indicator position whenever category changes
  useEffect(() => {
    const activeTab = tabRefs.current[selectedCategory];
    if (activeTab) {
      setIndicatorStyle({
        left: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
      });
    }
  }, [selectedCategory]);

  const displayedRooms = filterRooms(ROOMS, {
    category: selectedCategory === 'all' ? undefined : selectedCategory,
  });

  const handleOpenRoom = (room: Room) => {
    setSelectedRoom(room);
    setModalOpen(true);
  };

  return (
    <section id="sanctuaries" ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      {/* Section Header */}
      <div
        className="text-center max-w-3xl mx-auto mb-14 transition-all duration-700 ease-luxury"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-3">
          Curated Accommodations
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#181716] leading-tight">
          Private Sanctuaries of Light & Stone
        </h2>
        <p className="mt-4 text-sm sm:text-base text-[#736e67] font-sans font-light max-w-2xl mx-auto">
          Every pavilion is individually positioned along the natural topography to guarantee unobstructed ocean horizons and absolute personal seclusion.
        </p>

        {/* Category Tabs with Animated Sliding Underline */}
        <div className="relative inline-flex items-center mt-10 p-1.5 rounded-full bg-[#f4efe6] border border-[#181716]/6 max-w-full overflow-x-auto">
          {/* Animated Sliding Underline Pill */}
          <div
            className="absolute top-1.5 bottom-1.5 rounded-full bg-white shadow-sm transition-all duration-500 ease-luxury pointer-events-none"
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
          />

          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                ref={(el) => {
                  tabRefs.current[cat.id] = el;
                }}
                onClick={() => setSelectedCategory(cat.id)}
                className={`relative z-10 px-5 py-2 rounded-full text-xs font-medium tracking-wider uppercase transition-colors duration-500 ease-luxury whitespace-nowrap ${
                  isActive ? 'text-[#181716] font-semibold' : 'text-[#736e67] hover:text-[#181716]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Room Cards Grid: Staggered by 80ms each */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
        {displayedRooms.map((room, idx) => {
          return (
            <article
              key={room.id}
              className="group relative flex flex-col bg-[#fbf9f5] rounded-3xl overflow-hidden border border-[#181716]/8 shadow-sm hover:shadow-xl transition-all duration-600 ease-luxury hover:-translate-y-1.5"
              style={{
                transitionDelay: `${idx * 80}ms`,
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? undefined : 'translateY(28px)',
              }}
            >
              {/* Photo Frame: Zooms in slowly inside frame on hover */}
              <div className="relative w-full h-80 sm:h-96 overflow-hidden bg-stone-200">
                <img
                  src={room.image}
                  alt={room.name}
                  loading="lazy"
                  className="w-full h-full object-cover transform transition-transform duration-800 ease-luxury group-hover:scale-105"
                />
                {/* Gradient Shadow inside image */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

                {/* Nightly Price Tag */}
                <div className="absolute bottom-4 left-5 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm text-xs text-[#181716] font-medium tracking-wide">
                  From <span className="font-serif font-bold text-sm">{formatCurrency(room.pricePerNight)}</span>{' '}
                  <span className="text-[10px] text-[#736e67]">/ night</span>
                </div>

                {/* View Badge */}
                <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full text-white text-[11px] font-sans">
                  {room.view}
                </div>
              </div>

              {/* Card Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-2">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#c5a059] font-medium">
                      {room.category === 'villas'
                        ? 'Private Oceanfront Villa'
                        : room.category === 'pavilions'
                        ? 'Secluded Hillside Pavilion'
                        : 'Royal Belvedere Residence'}
                    </span>
                    <div className="flex items-center gap-3 text-xs text-[#736e67]">
                      <span className="flex items-center gap-1">
                        <Maximize2 className="w-3.5 h-3.5 text-[#c5a059]" />
                        {room.sizeSqM} m²
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-[#c5a059]" />
                        {room.maxGuests} Guests
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-serif text-[#181716] group-hover:text-[#c5a059] transition-colors duration-500 ease-luxury">
                    {room.name}
                  </h3>

                  <p className="mt-2 text-xs text-[#736e67] line-clamp-2 font-sans font-light leading-relaxed">
                    {room.description}
                  </p>

                  {/* Highlights tag list */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {room.features.slice(0, 2).map((feat, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2.5 py-1 rounded-md bg-[#f4efe6] text-[#4a463f] border border-[#181716]/5"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Buttons with smooth colour change & 2px lift on hover */}
                <div className="mt-6 pt-5 border-t border-[#181716]/8 flex items-center justify-between gap-3">
                  <button
                    onClick={() => handleOpenRoom(room)}
                    className="btn-luxury inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#181716] hover:text-[#c5a059]"
                  >
                    <span>Discover Details</span>
                    <ArrowUpRight className="w-4 h-4 text-[#c5a059]" />
                  </button>

                  <button
                    onClick={() => handleOpenRoom(room)}
                    className="btn-luxury px-5 py-2.5 rounded-full bg-[#181716] text-white hover:bg-[#c5a059] text-xs font-medium tracking-widest uppercase shadow-sm"
                  >
                    Reserve Villa
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Room Detail Modal with 95% -> 100% scale-in animation */}
      <RoomModal
        room={selectedRoom}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        initialCheckIn={checkInDate}
        initialCheckOut={checkOutDate}
      />
    </section>
  );
};
