import React, { useState } from 'react';
import { FAQS } from '../data/resortData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FaqAccordion: React.FC = () => {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({
    'faq-1': true, // first item open by default for immediate clarity
  });

  const [sectionRef, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.15 });

  const toggleFaq = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section id="faqs" ref={sectionRef} className="py-24 px-6 max-w-4xl mx-auto">
      {/* Section Header */}
      <div
        className="text-center mb-14 transition-all duration-700 ease-luxury"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
        }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#f4efe6] text-[#c5a059] text-xs uppercase tracking-[0.25em] font-medium mb-3">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Sanctuary Curiosities</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-serif text-[#181716]">
          Frequently Inquired Questions
        </h2>
        <p className="mt-3 text-sm text-[#736e67] font-sans font-light">
          Everything you need to know about seamless arrivals, inclusions, and bespoke arrangements.
        </p>
      </div>

      {/* Accordion List with smooth height transition */}
      <div className="space-y-4">
        {FAQS.map((faq, idx) => {
          const isOpen = !!openIds[faq.id];

          return (
            <div
              key={faq.id}
              className="rounded-2xl bg-[#fbf9f5] border border-[#181716]/8 shadow-xs overflow-hidden transition-all duration-700 ease-luxury"
              style={{
                transitionDelay: `${idx * 80}ms`,
                opacity: hasEntered ? 1 : 0,
                transform: hasEntered ? 'translateY(0)' : 'translateY(20px)',
              }}
            >
              {/* Accordion Trigger Button */}
              <button
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={isOpen}
                className="w-full p-6 text-left flex items-center justify-between gap-4 group focus:outline-none focus:ring-1 focus:ring-[#c5a059]"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-serif text-[#c5a059] w-6 shrink-0">
                    0{idx + 1}
                  </span>
                  <span className="text-base sm:text-lg font-serif font-medium text-[#181716] group-hover:text-[#c5a059] transition-colors duration-400 ease-luxury">
                    {faq.question}
                  </span>
                </div>

                <div
                  className={`w-8 h-8 rounded-full bg-[#f4efe6] flex items-center justify-center shrink-0 text-[#181716] transition-transform duration-500 ease-luxury ${
                    isOpen ? 'rotate-180 bg-[#c5a059] text-white' : 'rotate-0'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {/* Accordion Body with Smooth Height Transition via Grid rows */}
              <div
                className={`grid transition-[grid-template-rows] duration-500 ease-luxury ${
                  isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-[#4a463f] font-sans font-light leading-relaxed border-t border-[#181716]/4">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
