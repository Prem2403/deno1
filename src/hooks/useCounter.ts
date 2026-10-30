import { useState, useEffect } from 'react';
import { easeOutCubicBezier } from '../utils/booking';

interface UseCounterOptions {
  target: number;
  duration?: number; // milliseconds, default 900ms (within 0.5 to 1 second range)
  decimals?: number;
  shouldStart: boolean;
}

export function useCounter({
  target,
  duration = 900,
  decimals = 0,
  shouldStart,
}: UseCounterOptions): string {
  const [currentValue, setCurrentValue] = useState<number>(0);

  useEffect(() => {
    if (!shouldStart) return;

    // Respect prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCurrentValue(target);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubicBezier(progress);

      const calculated = easedProgress * target;
      setCurrentValue(calculated);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCurrentValue(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [shouldStart, target, duration]);

  return currentValue.toFixed(decimals);
}
