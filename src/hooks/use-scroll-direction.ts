import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Returns whether the user is scrolling up.
 * The navbar should be visible when scrolling up or at the top.
 */
export function useScrollDirection(threshold = 10) {
  const [visible, setVisible] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const update = useCallback(() => {
    const currentY = window.scrollY;
    // Always show at top of page
    if (currentY < threshold) {
      setVisible(true);
      lastScrollY.current = currentY;
      ticking.current = false;
      return;
    }
    const diff = currentY - lastScrollY.current;
    if (Math.abs(diff) < threshold) {
      ticking.current = false;
      return;
    }
    // Scrolling up → show, scrolling down → hide
    setVisible(diff < 0);
    lastScrollY.current = currentY;
    ticking.current = false;
  }, [threshold]);

  useEffect(() => {
    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [update]);

  return visible;
}
