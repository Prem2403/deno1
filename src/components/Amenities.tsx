import React from 'react';
import { Waves, Sparkles, UtensilsCrossed, Compass, Sun, Bell } from 'lucide-react';
import { AMENITIES } from '../data/resortData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const iconMap: Record<string, React.ElementType> = {
  Waves,
  Sparkles,
  UtensilsCrossed,
  Compass,
  Sun,
  Bell,
};

export const Amenities: React.FC = () => {
  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });

  return (
    <section id="wellness" ref={sectionRef} className="py-24 px-6 bg-[#f4efe6]/50 border-y border-[#181716]/6">
      <div className="max-w-7xl mx-auto">
        {/* Section Heading & Subtitle */}
        <div
          className="text-center max-w-2xl mx-auto mb-16 transition-all duration-700 ease-luxury"
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-3">
            Holistic Sanctuary Elements
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#181716]">
            Experiences of Quiet Rejuvenation
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#736e67] font-sans font-light">
            Every ritual is harmonized with natural circadian light, Aegean sea minerals, and ancient Mediterranean wellness philosophy.
          </p>
        </div>

        {/* Amenity Cards Grid: Staggered by 80ms each */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {AMENITIES.map((amenity, idx) => {
            const IconComponent = iconMap[amenity.iconName] || Sparkles;

            return (
              <div
                key={amenity.id}
                className="group relative p-8 rounded-3xl bg-[#fbf9f5] border border-[#181716]/8 shadow-sm hover:shadow-lg transition-all duration-600 ease-luxury hover:-translate-y-1 flex flex-col justify-between"
                style={{
                  transitionDelay: `${idx * 80}ms`,
                  opacity: hasEntered ? 1 : 0,
                  transform: hasEntered ? undefined : 'translateY(24px)',
                }}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    {/* Amenity Icon: Rises slightly and changes to accent colour on hover */}
                    <div className="w-14 h-14 rounded-2xl bg-[#f4efe6] flex items-center justify-center text-[#181716] group-hover:text-[#c5a059] group-hover:-translate-y-1.5 transition-all duration-500 ease-luxury border border-[#181716]/6 shadow-xs">
                      <IconComponent className="w-7 h-7 transition-colors duration-500 ease-luxury" />
                    </div>

                    {amenity.badge && (
                      <span className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-[#f4efe6] text-[#736e67] font-semibold border border-[#181716]/5">
                        {amenity.badge}
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-serif text-[#181716] group-hover:text-[#c5a059] transition-colors duration-500 ease-luxury">
                    {amenity.name}
                  </h3>

                  <p className="text-xs uppercase tracking-wider text-[#c5a059] font-medium mt-1">
                    {amenity.tagline}
                  </p>

                  <p className="mt-3 text-xs sm:text-sm text-[#4a463f] font-sans font-light leading-relaxed">
                    {amenity.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#181716]/6 flex items-center justify-between text-xs text-[#736e67]">
                  <span>Personalized Arrangement</span>
                  <span className="group-hover:translate-x-1 transition-transform duration-500 ease-luxury text-[#c5a059]">
                    ✦
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
