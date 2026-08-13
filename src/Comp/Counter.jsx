import { useState, useEffect, useRef } from "react";

/**
 * EasedCounter
 * Animates from 0 up to `value` using an ease-out curve.
 *
 * Props:
 *  - value: number        (the target number to count up to)
 *  - duration?: number    (animation length in ms, default 1200)
 *  - decimals?: number    (decimal places to show, default 0)
 *  - formatter?: (n) => string  (optional custom formatter, e.g. for commas)
 *  - className?: string
 */
export default function EasedCounter({ value = 0, duration = 1200, decimals = 0, formatter, className = "" }) {
  const [display, setDisplay] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);

  // Standard ease-out-cubic curve: fast start, slow finish.
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

  useEffect(() => {
    // Reset animation whenever the target value changes
    startTimeRef.current = null;
    cancelAnimationFrame(rafRef.current);

    const from = 0;
    const to = value;

    const step = (timestamp) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = from + (to - from) * eased;

      setDisplay(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setDisplay(to); // snap exactly to target at the end
      }
    };

    rafRef.current = requestAnimationFrame(step);

    return () => cancelAnimationFrame(rafRef.current);
  }, [value, duration]);

  const formatted = formatter ? formatter(display) : display.toFixed(decimals);

  return <span className={className}>{formatted}</span>;
}
