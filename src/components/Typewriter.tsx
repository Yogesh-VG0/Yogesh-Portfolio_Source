import { useState, useEffect, useRef, useCallback } from "react";

interface TypewriterProps {
  words: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  delayBetweenWords?: number;
}

const Typewriter = ({
  words,
  typingSpeed = 90,
  deletingSpeed = 45,
  delayBetweenWords = 2200,
}: TypewriterProps) => {
  const [display, setDisplay] = useState(words[0] ?? "");
  const phase = useRef<"typing" | "pausing" | "deleting">("typing");
  const wordIdx = useRef(0);
  const charIdx = useRef(words[0]?.length ?? 0);
  const raf = useRef(0);
  const lastTick = useRef(0);
  const pauseUntil = useRef(0);

  /* Slight jitter gives the impression of a real typist */
  const jitter = useCallback(
    (base: number) => base + (Math.random() * 30 - 15),
    [],
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const step = (now: number) => {
      const word = words[wordIdx.current];

      if (phase.current === "pausing") {
        if (now >= pauseUntil.current) {
          phase.current = "deleting";
          lastTick.current = now;
        }
        raf.current = requestAnimationFrame(step);
        return;
      }

      const interval =
        phase.current === "typing"
          ? jitter(typingSpeed)
          : jitter(deletingSpeed);

      if (now - lastTick.current < interval) {
        raf.current = requestAnimationFrame(step);
        return;
      }
      lastTick.current = now;

      if (phase.current === "typing") {
        charIdx.current += 1;
        setDisplay(word.slice(0, charIdx.current));

        if (charIdx.current >= word.length) {
          phase.current = "pausing";
          pauseUntil.current = now + delayBetweenWords;
        }
      } else {
        charIdx.current -= 1;
        setDisplay(word.slice(0, charIdx.current));

        if (charIdx.current <= 0) {
          wordIdx.current = (wordIdx.current + 1) % words.length;
          phase.current = "typing";
        }
      }

      raf.current = requestAnimationFrame(step);
    };

    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [words, typingSpeed, deletingSpeed, delayBetweenWords, jitter]);

  return (
    <span className="inline-flex min-w-[19ch] items-baseline justify-start">
      <span className="sr-only">{words[0]}</span>
      <span aria-hidden="true">{display}</span>
      <span
        className="ml-0.5 inline-block w-[2.5px] h-[1.15em] bg-primary rounded-full animate-caret-blink"
        aria-hidden="true"
      />
    </span>
  );
};

export default Typewriter;
