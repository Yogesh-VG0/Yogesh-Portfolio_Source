import { motion } from "framer-motion";

const paths = [
  "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
  "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
  "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
  "M-338 -237C-338 -237 -270 168 194 295C658 422 726 827 726 827",
  "M-324 -253C-324 -253 -256 152 208 279C672 406 740 811 740 811",
  "M-310 -269C-310 -269 -242 136 222 263C686 390 754 795 754 795",
  "M-296 -285C-296 -285 -228 120 236 247C700 374 768 779 768 779",
  "M-282 -301C-282 -301 -214 104 250 231C714 358 782 763 782 763",
  "M-268 -317C-268 -317 -200 88 264 215C728 342 796 747 796 747",
  "M-254 -333C-254 -333 -186 72 278 199C742 326 810 731 810 731",
  "M-345 -229C-345 -229 -277 176 187 303C651 430 719 835 719 835",
  "M-261 -325C-261 -325 -193 80 271 207C735 334 803 739 803 739",
];

const BackgroundBeams = () => {
  return (
    <div className="absolute h-full w-full inset-0 overflow-hidden pointer-events-none" style={{ maxWidth: '100vw' }}>
      <svg
        className="z-0 h-full w-full pointer-events-none absolute"
        width="100%"
        height="100%"
        viewBox="0 0 696 316"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="beam-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="beam-gradient-bright" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0" />
            <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#AE48FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Base beam paths */}
        {paths.map((d, i) => (
          <path
            key={`base-${i}`}
            d={d}
            stroke="url(#beam-gradient-1)"
            strokeWidth="0.5"
          />
        ))}

        {/* Animated bright beams */}
        {[0, 4, 8].map((idx) => (
          <motion.path
            key={`bright-${idx}`}
            d={paths[idx]}
            stroke="url(#beam-gradient-bright)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: [0, 1, 0],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 4 + idx * 0.3,
              repeat: Infinity,
              delay: idx * 0.5,
              ease: "easeInOut",
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BackgroundBeams;
