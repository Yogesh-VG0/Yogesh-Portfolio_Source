import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Star,
  Github,
  ExternalLink,
  CircleDot,
  Telescope,
} from "lucide-react";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { projects, type Project } from "@/data/projects";
import SectionHeader from "./SectionHeader";
import { Link } from "react-router-dom";
import CountUp from "./CountUp";

/* ------------------------------------------------------------------ */
/*  Unified project card                                               */
/* ------------------------------------------------------------------ */
/** Parse a metric value — returns { num, suffix } if it starts with a number, else null */
const parseMetricValue = (value: string): { num: number; suffix: string } | null => {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return null;
  return { num: parseFloat(match[1]), suffix: match[2] };
};

const ProjectCard = ({
  project,
  variant,
}: {
  project: Project;
  variant: "featured" | "standard";
}) => {
  const isFeatured = variant === "featured";
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, visible: false }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 p-5 sm:p-7 md:p-9 ${
        isFeatured
          ? "bg-card/60 border-primary/15 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/5"
          : "bg-card/40 border-border/30 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/3"
      }`}
    >
      {/* Cursor-following spotlight */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
        style={{
          opacity: spotlight.visible ? 1 : 0,
          background: `radial-gradient(600px circle at ${spotlight.x}px ${spotlight.y}px, hsl(217 91% 60% / 0.06), transparent 40%)`,
        }}
      />

      {/* Ambient glow */}
      <div
        className={`absolute -top-24 -right-24 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isFeatured ? "w-48 h-48 bg-primary/5" : "w-32 h-32 bg-primary/5"
        }`}
      />
      <div
        className={`absolute -bottom-24 -left-24 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isFeatured ? "w-48 h-48 bg-primary/3" : "w-32 h-32 bg-primary/3"
        }`}
      />

      {/* Featured ribbon */}
      {isFeatured && (
        <div className="absolute -top-px -right-px z-10">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-bl-xl rounded-tr-2xl bg-primary/10 border-b border-l border-primary/20 text-xs font-mono text-primary">
            <Star size={11} fill="currentColor" />
            Featured
          </div>
        </div>
      )}

      {/* Hero screenshot */}
      {project.image && (
        <div className="mb-5 -mx-1 sm:-mx-2 overflow-hidden rounded-xl border border-border/20">
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          />
        </div>
      )}

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${project.statusColor}`}
        >
          <CircleDot size={8} />
          {project.status}
        </span>
        <span className="text-[11px] text-muted-foreground/50 font-mono">
          {project.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
        {project.title}
      </h3>

      {/* Tagline */}
      <p className="text-sm text-muted-foreground/60 font-medium mb-3">
        {project.tagline}
      </p>

      {/* Description */}
      <p className="text-sm md:text-[15px] text-muted-foreground/70 leading-relaxed mb-5">
        {project.description}
      </p>

      {/* Metrics row */}
      {project.metrics && (
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {project.metrics.map((m) => {
            const parsed = parseMetricValue(m.value);
            return (
              <div
                key={m.label}
                className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-background/50 border border-border/20 text-muted-foreground/70"
              >
                <span className="text-primary/70">{m.icon}</span>
                <span className="font-semibold text-foreground/80">
                  {parsed ? (
                    <CountUp end={parsed.num} suffix={parsed.suffix} duration={1.8} />
                  ) : (
                    m.value
                  )}
                </span>
                <span className="text-muted-foreground/50">{m.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Highlights — truncated to 4 on card */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-2">
        {project.highlights.slice(0, 4).map((h) => (
          <li
            key={h}
            className="text-[13px] leading-relaxed text-muted-foreground/80 flex items-start gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[6px] flex-shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mt-5 mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary/40 text-muted-foreground/60 border border-border/20"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3">
        {project.liveUrl && (
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={tapScale}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-shadow"
          >
            <ExternalLink size={14} />
            Live Demo
          </motion.a>
        )}
        {project.caseStudy && (
          <Link to={`/projects/${project.slug}`}>
            <motion.span
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={tapScale}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl text-primary text-sm font-semibold border border-primary/30 bg-primary/5 hover:bg-primary/10 hover:border-primary/50 transition-colors"
            >
              <Telescope size={14} />
              Deep Dive
            </motion.span>
          </Link>
        )}
        {project.githubUrl && (
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={tapScale}
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-secondary/60 text-muted-foreground text-sm font-medium border border-border/30 hover:text-foreground hover:bg-secondary/80 transition-colors"
          >
            <Github size={14} />
            Source Code
          </motion.a>
        )}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader label="Projects" title="Featured work" />

          {/* All project cards */}
          <div className="space-y-6 sm:space-y-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                variant={project.featured ? "featured" : "standard"}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
