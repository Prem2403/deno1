import React, { useState, useEffect } from 'react';
import { REVIEWS } from '../data/resortData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';

export const ReviewSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });

  // Reviews slider slides or fades automatically every 6 seconds, and pauses on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const activeReview = REVIEWS[currentIndex];

  return (
    <section id="reviews" ref={sectionRef} className="py-24 px-6 bg-[#f4efe6]/60 border-y border-[#181716]/6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div
          className="text-center max-w-2xl mx-auto mb-14 transition-all duration-700 ease-luxury"
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-3">
            Guest Reflections
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-[#181716]">
            Words from the Sanctuary
          </h2>
        </div>

        {/* Slider Card Container with Hover-Pause */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative bg-[#fbf9f5] rounded-3xl p-8 sm:p-14 shadow-md border border-[#181716]/6 transition-all duration-700 ease-luxury"
          style={{
            opacity: hasEntered ? 1 : 0,
            transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
          }}
        >
          {/* Subtle Decorative Quote Icon */}
          <Quote className="absolute top-8 right-8 w-16 h-16 text-[#c5a059]/15 pointer-events-none" />

          {/* Review Content with Smooth Fade/Slide */}
          <div className="relative z-10 min-h-[220px] flex flex-col justify-between">
            <div>
              {/* Star Rating */}
              <div className="flex items-center gap-1 mb-6 text-[#c5a059]">
                {Array.from({ length: activeReview.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#c5a059]" />
                ))}
                <span className="ml-2 text-xs text-[#736e67] font-sans">
                  {activeReview.suiteStayed}
                </span>
              </div>

              {/* Review Quote */}
              <p
                key={activeReview.id}
                className="text-lg sm:text-2xl font-serif font-light text-[#181716] leading-relaxed italic animate-[reviewFade_0.7s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
              >
                “{activeReview.comment}”
              </p>
            </div>

            <style>{`
              @keyframes reviewFade {
                0% {
                  opacity: 0;
                  transform: translateY(12px);
                }
                100% {
                  opacity: 1;
                  transform: translateY(0);
                }
              }
            `}</style>

            {/* Author Attribution */}
            <div
              key={`author-${activeReview.id}`}
              className="mt-8 pt-6 border-t border-[#181716]/8 flex items-center justify-between flex-wrap gap-4 animate-[reviewFade_0.7s_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
            >
              <div className="flex items-center gap-3.5">
                <img
                  src={activeReview.avatar}
                  alt={activeReview.author}
                  className="w-12 h-12 rounded-full object-cover border border-[#c5a059]/30"
                />
                <div>
                  <h4 className="text-sm font-serif font-medium text-[#181716]">
                    {activeReview.author}
                  </h4>
                  <p className="text-xs text-[#736e67] font-sans">
                    {activeReview.location} · {activeReview.date}
                  </p>
                </div>
              </div>

              {/* Slider Navigation Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  aria-label="Previous Review"
                  className="btn-luxury p-2.5 rounded-full border border-[#181716]/15 text-[#181716] hover:bg-[#181716] hover:text-white"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={handleNext}
                  aria-label="Next Review"
                  className="btn-luxury p-2.5 rounded-full border border-[#181716]/15 text-[#181716] hover:bg-[#181716] hover:text-white"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {REVIEWS.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ease-luxury ${
                  currentIndex === i ? 'w-8 bg-[#c5a059]' : 'w-2 bg-[#181716]/20'
                }`}
              />
            ))}
          </div>

          {/* Hover Status hint */}
          <div className="text-center mt-3 text-[10px] uppercase tracking-widest text-[#736e67]/70 font-sans">
            {isPaused ? 'Auto-play paused' : 'Auto-advancing every 6s · Hover to pause'}
          </div>
        </div>
      </div>
    </section>
  );
};
