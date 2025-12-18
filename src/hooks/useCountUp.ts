import { useState, useEffect, useRef, useCallback } from "react";

interface UseCountUpOptions {
  start?: number;
  end: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  suffix?: string;
  prefix?: string;
  easing?: (t: number) => number;
}

const easeOutExpo = (t: number): number => {
  return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
};

export function useCountUp({
  start = 0,
  end,
  duration = 2000,
  delay = 0,
  decimals = 0,
  suffix = "",
  prefix = "",
  easing = easeOutExpo,
}: UseCountUpOptions) {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    if (hasAnimated) return;

    const startTime = performance.now();
    const startValue = start;

    const tick = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      const currentValue = startValue + (end - startValue) * easedProgress;

      setCount(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(tick);
      } else {
        setCount(end);
        setHasAnimated(true);
      }
    };

    animationRef.current = requestAnimationFrame(tick);
  }, [start, end, duration, easing, hasAnimated]);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setIsInView(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [hasAnimated]);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timeoutId = setTimeout(animate, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [isInView, hasAnimated, animate, delay]);

  const formattedCount = `${prefix}${count.toFixed(decimals)}${suffix}`;

  return { count: formattedCount, ref };
}
