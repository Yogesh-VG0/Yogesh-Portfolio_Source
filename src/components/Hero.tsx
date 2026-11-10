import { motion } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import SplitText from "./SplitText";
import { AuroraText } from "./AuroraText";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { Link } from "react-router-dom";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import { locations } from "@/data/locations";

const MotionLink = motion.create(Link);

const Hero = () => {
  const { region, status } = useVisitorRegion();
  const location = status === "loading" ? "India & UAE" : locations[region].label;
  return (
    <section className="relative isolate min-h-svh flex items-center justify-center section-padding pt-24 overflow-hidden">
      <motion.div
        className="container mx-auto max-w-4xl text-center relative z-10 px-4"
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-6 flex min-h-14 items-center justify-center" data-nosnippet>
          <span className="inline-flex max-w-full items-center gap-2 px-4 py-2 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-xs leading-5 text-foreground/72 sm:font-mono">
            <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <span>Open to opportunities · {location}</span>
          </span>
        </motion.div>

        {/* Main heading with glow + SplitText */}
        <motion.p variants={fadeUp} className="mb-2 text-xl font-medium text-foreground/85 sm:text-2xl">Hi, I'm</motion.p>
        <h1 aria-label="Yogesh Vadivel — Full-Stack Developer"
          className="relative text-[clamp(2rem,9vw,2.5rem)] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.2] sm:leading-[1.1] tracking-tight mb-4"
        >
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <span className="w-[60%] h-[80%] bg-primary/10 dark:bg-primary/[0.07] rounded-full blur-[60px] sm:blur-[80px]" />
          </span>
          <span className="relative" aria-hidden="true">
            <AuroraText className="whitespace-nowrap" colors={["var(--hero-blue)", "var(--hero-cyan)", "var(--hero-violet)", "var(--hero-blue)"]} speed={1}>
              <SplitText text="Yogesh Vadivel" delay={0} stagger={0.02} />
            </AuroraText>
          </span>
        </h1>
        <motion.p variants={fadeUp} className="mb-5 text-sm font-medium tracking-wide text-foreground/85 sm:text-base">
          Full-Stack Developer<span className="hidden sm:inline"> · React, Next.js &amp; Python</span>
        </motion.p>

        {/* Keep the primary introduction visible in the first HTML paint. */}
        <p
          className="mx-auto mb-8 max-w-[30ch] text-base leading-7 text-foreground/82 sm:mb-10 sm:max-w-2xl sm:text-lg md:text-xl"
        >
          I build reliable web apps with React, Next.js, and Python.
        </p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="grid grid-cols-2 items-stretch gap-3 sm:flex sm:flex-wrap sm:items-center sm:justify-center">
          <MotionLink
            to="/resume/"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="order-1 sm:order-none inline-flex min-h-12 justify-center items-center gap-2 px-3 sm:px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
          >
            <FileDown size={16} aria-hidden="true" />Resume
          </MotionLink>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="order-2 sm:order-none inline-flex min-h-12 justify-center items-center gap-2 px-3 sm:px-5 py-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
          >
            <Mail size={16} aria-hidden="true" />Contact
          </motion.a>
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="order-3 col-span-2 sm:order-none inline-flex min-h-12 justify-center items-center gap-2 px-3 sm:px-5 py-3 text-foreground/80 font-medium text-sm hover:text-primary transition-colors"
          >
            View Projects<ArrowDown size={16} aria-hidden="true" />
          </motion.a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
