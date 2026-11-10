import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
}

/**
 * Animates a number from 0 → end when the element enters the viewport.
 * Uses easeOutExpo for a satisfying deceleration.
 */
const CountUp = ({
  end,
  duration = 2,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [value, setValue] = useState(end);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reducedMotion || duration <= 0) return;

    const start = 0;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let frame = 0;
    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / durationMs, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

      const current = start + (end - start) * eased;
      setValue(current);

      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setValue(end);
      }
    };

    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [inView, end, duration, reducedMotion]);
  const displayValue = reducedMotion || !inView || duration <= 0 ? end : value;

  return (
    <span ref={ref} className={`inline-grid tabular-nums ${className}`}>
      <span className="col-start-1 row-start-1" style={{ opacity: displayValue === end ? 1 : 0 }}>{prefix}{decimals > 0 ? end.toFixed(decimals) : Math.round(end)}{suffix}</span>
      {displayValue !== end && <span aria-hidden="true" data-nosnippet className="col-start-1 row-start-1">{prefix}{decimals > 0 ? displayValue.toFixed(decimals) : Math.round(displayValue)}{suffix}</span>}
    </span>
  );
};

export default CountUp;
