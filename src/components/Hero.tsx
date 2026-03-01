import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin, FileDown } from "lucide-react";
import Typewriter from "./Typewriter";
import SplitText from "./SplitText";
import { AuroraText } from "./AuroraText";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-24 overflow-hidden">
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

        {/* Main heading with glow + SplitText */}
        <h1
          className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.1] tracking-tight mb-6"
        >
          <span className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
            <span className="w-[60%] h-[80%] bg-primary/10 dark:bg-primary/[0.07] rounded-full blur-[60px] sm:blur-[80px]" />
          </span>
          <span className="relative">
            <SplitText text="Hi, I'm " delay={0} stagger={0.02} />
            <AuroraText colors={["#0070F3", "#38bdf8", "#7928CA", "#0070F3"]} speed={1}>
              <SplitText text="Yogesh Vadivel" delay={0} stagger={0.02} />
            </AuroraText>
          </span>
        </h1>

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
          with React, Python, and modern technologies.
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
          <motion.a
            href="/resume"
            whileHover={{ scale: 1.04 }}
            whileTap={tapScale}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
          >
            <FileDown size={16} />
            Resume
          </motion.a>
        </motion.div>

      </motion.div>
    </section>
  );
};

export default Hero;
