import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  children?: React.ReactNode;
}

/**
 * Animates each character in individually with a stagger.
 * Characters slide up and fade in for a dramatic entrance.
 */
const SplitText = ({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
}: SplitTextProps) => {
  const words = text.split(" ");
  const reducedMotion = useReducedMotion();

  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <Fragment key={wIdx}>
        <span className="inline-block whitespace-nowrap" aria-hidden="true">
          {word.split("").map((char, cIdx) => {
            const globalIdx = words
              .slice(0, wIdx)
              .reduce((sum, w) => sum + w.length + 1, 0) + cIdx;
            return (
              <motion.span
                key={`${wIdx}-${cIdx}`}
                className="inline-block"
                aria-hidden="true"
                initial={reducedMotion ? false : { opacity: 1, y: 12, rotateX: 15 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: reducedMotion ? 0 : 0.35,
                  delay: reducedMotion ? 0 : delay + globalIdx * stagger,
                  ease: EASE_OUT_EXPO,
                }}
              >
                {char}
              </motion.span>
            );
          })}
        </span>
        {wIdx < words.length - 1 && " "}
        </Fragment>
      ))}
    </span>
  );
};

export default SplitText;
