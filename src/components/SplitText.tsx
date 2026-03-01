import { motion } from "framer-motion";
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

  return (
    <span className={className} aria-label={text}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap">
          {word.split("").map((char, cIdx) => {
            const globalIdx = words
              .slice(0, wIdx)
              .reduce((sum, w) => sum + w.length + 1, 0) + cIdx;
            return (
              <motion.span
                key={`${wIdx}-${cIdx}`}
                className="inline-block"
                aria-hidden="true"
                initial={{ opacity: 0, y: 20, rotateX: 30 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                transition={{
                  duration: 0.35,
                  delay: delay + globalIdx * stagger,
                  ease: EASE_OUT_EXPO,
                }}
              >
                {char}
              </motion.span>
            );
          })}
          {wIdx < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
