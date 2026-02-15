/**
 * Shared Framer Motion variants and utilities.
 * All animations respect prefers-reduced-motion.
 */
import type { Variants, Transition } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Reduced-motion helper                                              */
/* ------------------------------------------------------------------ */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/* ------------------------------------------------------------------ */
/*  Shared easing / durations                                          */
/* ------------------------------------------------------------------ */
export const EASE_OUT_QUART: [number, number, number, number] = [0.25, 1, 0.5, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const DURATION = {
  fast: 0.2,
  normal: 0.45,
  slow: 0.7,
} as const;

export const STAGGER_DELAY = 0.08;

/* ------------------------------------------------------------------ */
/*  Entrance variants                                                  */
/* ------------------------------------------------------------------ */

/** Fade up — the workhorse entrance for sections / cards */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_QUART },
  },
};

/** Fade in (no translate) — for overlays, backgrounds */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: DURATION.normal },
  },
};

/** Scale up — for chips, badges, icons */
export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.fast, ease: EASE_OUT_QUART },
  },
};

/** Slide in from left */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_QUART },
  },
};

/** Slide in from right */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.normal, ease: EASE_OUT_QUART },
  },
};

/* ------------------------------------------------------------------ */
/*  Container / stagger variants                                       */
/* ------------------------------------------------------------------ */

/** Stagger children with configurable delay */
export const staggerContainer = (stagger = STAGGER_DELAY): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: 0.1,
    },
  },
});

/* ------------------------------------------------------------------ */
/*  Micro-interaction helpers (use as whileHover / whileTap)           */
/* ------------------------------------------------------------------ */

export const hoverLift = {
  y: -4,
  transition: { duration: DURATION.fast, ease: EASE_OUT_QUART },
};

export const tapScale = { scale: 0.97 };

export const hoverGlow = {
  boxShadow: "0 0 30px -5px hsl(217 91% 60% / 0.25)",
  transition: { duration: 0.3 },
};
