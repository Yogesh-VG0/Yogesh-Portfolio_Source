import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileDown } from "lucide-react";
import { Link } from "react-router-dom";
import BackgroundBeams from "./BackgroundBeams";
import Typewriter from "./Typewriter";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-24 overflow-hidden">
      <BackgroundBeams />

      {/* Dual gradient orbs for depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[320px] h-[320px] sm:w-[420px] sm:h-[420px] md:w-[640px] md:h-[640px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[200px] h-[200px] md:w-[400px] md:h-[400px] bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        className="container mx-auto max-w-4xl text-center relative z-10 px-4"
        variants={staggerContainer(0.12)}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div variants={fadeUp} className="mb-6">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border/60 bg-card/40 backdrop-blur-md text-xs font-mono text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            Open to opportunities · Dubai, UAE
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          Hi, I'm{" "}
          <span className="text-gradient">Yogesh Vadivel</span>
        </motion.h1>

        {/* Subtitle with typewriter */}
        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          I build{" "}
          <Typewriter
            words={[
              "scalable web apps",
              "modern dashboards",
              "AI-powered solutions",
              "beautiful interfaces",
            ]}
            typingSpeed={80}
            deletingSpeed={40}
            delayBetweenWords={2000}
          />{" "}
          <br className="hidden sm:block" />
          using React and modern technologies.
        </motion.p>

        {/* CTA buttons */}
        <motion.div variants={fadeUp} className="flex flex-wrap items-center justify-center gap-3">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
          >
            View Projects
            <ArrowDown size={16} className="animate-float" />
          </motion.a>
          <motion.a
            href="https://github.com/Yogesh-VG0"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
          >
            <Github size={16} />
            GitHub
          </motion.a>
          <motion.a
            href="https://www.linkedin.com/in/yogesh-vadivel-a287a6269/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
          >
            <Linkedin size={16} />
            LinkedIn
          </motion.a>
          <Link to="/resume" aria-label="View or download resume">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
            >
              <FileDown size={16} />
              Resume
            </motion.span>
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
