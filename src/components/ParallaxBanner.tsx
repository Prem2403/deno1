import React, { useRef, useState, useEffect } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ArrowRight } from 'lucide-react';

interface ParallaxBannerProps {
  onOpenBooking: () => void;
}

export const ParallaxBanner: React.FC<ParallaxBannerProps> = ({ onOpenBooking }) => {
  const containerRef = useRef<HTMLElement | null>(null);
  const [parallaxOffset, setParallaxOffset] = useState<number>(0);
  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLElement>({ threshold: 0.1 });

  useEffect(() => {
    // Check reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            // Only calculate if within or near viewport
            if (rect.top < windowHeight && rect.bottom > 0) {
              const middleOffset = (rect.top - windowHeight / 2) * 0.12;
              setParallaxOffset(middleOffset);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      ref={(el) => {
        containerRef.current = el;
        // Also attach intersection observer ref
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
      className="relative min-h-[520px] sm:min-h-[600px] flex items-center justify-center overflow-hidden my-12"
    >
      {/* Large Background Photo with Light Parallax Effect */}
      <div
        className="absolute inset-0 -top-24 -bottom-24 w-full h-[calc(100%+192px)] bg-cover bg-center pointer-events-none transition-transform duration-100 ease-out will-change-transform"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2200&q=85")',
          transform: `translateY(${parallaxOffset}px) scale(1.05)`,
        }}
      />

      {/* Luxury atmospheric overlay */}
      <div className="absolute inset-0 bg-[#181716]/65 backdrop-blur-[1px]" />

      {/* Banner Content: Fades up smoothly once in view */}
      <div
        className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white transition-all duration-700 ease-luxury py-16"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(28px)',
        }}
      >
        <span className="text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#e6ca85] font-medium block mb-4">
          A Sanctuary Built for Stillness
        </span>

        <h2 className="text-3xl sm:text-5xl md:text-6xl font-serif font-light leading-tight">
          “Time does not merely pass here; it softens into horizon, salt, and breath.”
        </h2>

        <p className="mt-6 text-sm sm:text-base text-white/80 max-w-xl mx-auto font-sans font-light leading-relaxed">
          Disconnect from the velocity of the outside world. Experience dedicated personal sanctuary villas secluded between pine forests and the Mediterranean tide.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="btn-luxury inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#c5a059] text-white hover:bg-[#b08c46] text-xs uppercase tracking-[0.2em] font-medium shadow-lg shadow-black/30"
          >
            <span>Begin Your Journey</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
