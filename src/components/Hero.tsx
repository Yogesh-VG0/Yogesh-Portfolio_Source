import { motion } from "framer-motion";
import { ArrowDown, Github, Linkedin } from "lucide-react";
import BackgroundBeams from "./BackgroundBeams";
import Typewriter from "./Typewriter";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center section-padding pt-28">
      <BackgroundBeams />
      {/* Subtle gradient orb */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-wider">
            Full-Stack Developer · Dubai, UAE
          </p>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight mb-6">
            Hi, I'm{" "}
            <span className="text-primary">Yogesh Vadivel</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
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
            using React and modern technologies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
            >
              View Projects
              <ArrowDown size={16} />
            </a>
            <a
              href="https://github.com/Yogesh-VG0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              <Github size={16} />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/yogesh-vadivel-a287a6269/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              <Linkedin size={16} />
              LinkedIn
            </a>
            {/* TODO: Add your resume PDF to /public/resume.pdf and uncomment */}
            {/* <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
            >
              <FileDown size={16} />
              Resume
            </a> */}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
