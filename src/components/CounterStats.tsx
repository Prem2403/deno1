import React from 'react';
import { COUNTER_STATS } from '../data/resortData';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { useCounter } from '../hooks/useCounter';
import { CounterStat } from '../types';

interface StatCardProps {
  stat: CounterStat;
  index: number;
  hasEntered: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ stat, index, hasEntered }) => {
  const animatedValue = useCounter({
    target: stat.target,
    duration: 850,
    decimals: stat.decimals ?? 0,
    shouldStart: hasEntered,
  });

  return (
    <div
      className="flex flex-col items-center text-center p-6 sm:p-8 rounded-2xl bg-[#f4efe6]/60 border border-[#181716]/6 transition-all duration-700 ease-luxury"
      style={{
        transitionDelay: `${index * 80}ms`,
        opacity: hasEntered ? 1 : 0,
        transform: hasEntered ? 'translateY(0)' : 'translateY(24px)',
      }}
    >
      <div className="flex items-baseline gap-1 text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#181716]">
        {stat.prefix && <span className="text-[#c5a059] text-2xl sm:text-3xl">{stat.prefix}</span>}
        <span>{animatedValue}</span>
        {stat.suffix && <span className="text-xl sm:text-2xl text-[#736e67] font-normal">{stat.suffix}</span>}
      </div>
      <h3 className="mt-2 text-xs sm:text-sm uppercase tracking-[0.2em] font-semibold text-[#181716]">
        {stat.label}
      </h3>
      <p className="mt-1 text-xs text-[#736e67] font-sans">
        {stat.description}
      </p>
    </div>
  );
};

export const CounterStats: React.FC = () => {
  const [ref, hasEntered] = useIntersectionObserver<HTMLDivElement>({ threshold: 0.2 });

  return (
    <section ref={ref} className="py-20 px-6 max-w-7xl mx-auto">
      <div
        className="text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ease-luxury"
        style={{
          opacity: hasEntered ? 1 : 0,
          transform: hasEntered ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.3em] text-[#c5a059] font-medium block mb-2">
          Pure Solitude & Distinction
        </span>
        <h2 className="text-2xl sm:text-3xl font-serif text-[#181716]">
          The Measure of True Quietude
        </h2>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {COUNTER_STATS.map((stat, idx) => (
          <StatCard
            key={stat.id}
            stat={stat}
            index={idx}
            hasEntered={hasEntered}
          />
        ))}
      </div>
    </section>
  );
};
