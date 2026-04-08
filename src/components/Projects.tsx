import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Star,
  Github,
  ExternalLink,
  CircleDot,
  Telescope,
  ChevronLeft,
  ChevronRight,
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
  const gallery = project.gallery || [];
  const [galleryIdx, setGalleryIdx] = useState(0);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setSpotlight({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, visible: false }));
  }, []);

  const prevImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setGalleryIdx((prev) => (prev - 1 + gallery.length) % gallery.length);
    },
    [gallery.length],
  );

  const nextImage = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      setGalleryIdx((prev) => (prev + 1) % gallery.length);
    },
    [gallery.length],
  );

  const hasGallery = gallery.length > 1;
  const currentImage = gallery.length > 0 ? gallery[galleryIdx] : null;
  const cardTagline = project.cardTagline ?? project.tagline;
  const cardDescription = project.cardDescription ?? project.description;
  const cardHighlights = project.cardHighlights ?? project.highlights;

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 p-4 sm:p-7 md:p-9 ${
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

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <span
          className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${project.statusColor}`}
        >
          <CircleDot size={8} />
          {project.status}
        </span>
        <span className="text-[11px] text-foreground/60 font-mono">
          {project.year}
        </span>
      </div>

      {/* Title — clickable to live site */}
      {project.liveUrl ? (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block"
        >
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground hover:text-primary transition-colors mb-1.5 cursor-pointer">
            {project.title}
          </h3>
        </a>
      ) : (
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
          {project.title}
        </h3>
      )}

      {/* Tagline */}
      <p className="text-sm text-foreground/74 font-medium mb-4">
        {cardTagline}
      </p>

      {/* Gallery with next/back navigation */}
      {currentImage && (
        <div className="relative mb-5 -mx-1 sm:-mx-2 overflow-hidden rounded-xl border border-border/20 aspect-[16/10] bg-black/10 dark:bg-black/30">
          <AnimatePresence initial={false}>
            <motion.img
              key={galleryIdx}
              src={currentImage.src}
              alt={currentImage.alt}
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />
          </AnimatePresence>

          {/* Navigation arrows */}
          {hasGallery && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-1.5 sm:left-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all z-[2]"
                aria-label="Previous image"
              >
                <ChevronLeft size={16} className="sm:hidden" />
                <ChevronLeft size={18} className="hidden sm:block" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-1.5 sm:right-3 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/50 hover:bg-black/70 backdrop-blur-sm flex items-center justify-center text-white transition-all z-[2]"
                aria-label="Next image"
              >
                <ChevronRight size={16} className="sm:hidden" />
                <ChevronRight size={18} className="hidden sm:block" />
              </button>
            </>
          )}

          {/* Image counter badge */}
          {hasGallery && (
            <div className="absolute bottom-2 right-2 sm:bottom-3 sm:right-3 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[10px] sm:text-[11px] font-mono z-[2]">
              {galleryIdx + 1} / {gallery.length}
            </div>
          )}
        </div>
      )}

      {/* Description */}
      <p className="text-[13px] sm:text-sm md:text-[15px] text-foreground/80 leading-relaxed mb-5">
        {cardDescription}
      </p>

      {/* Metrics row */}
      {project.metrics && (
        <div className="flex flex-wrap gap-1.5 sm:gap-3 mb-5 sm:mb-6">
          {project.metrics.map((m) => {
            const parsed = parseMetricValue(m.value);
            return (
              <div
                key={m.label}
                className="flex items-center gap-1 sm:gap-1.5 text-[11px] sm:text-xs font-mono px-2 sm:px-2.5 py-1 sm:py-1.5 rounded-lg bg-background/50 border border-border/20 text-foreground/74"
              >
                <span className="text-primary/70">{m.icon}</span>
                <span className="font-semibold text-foreground">
                  {parsed ? (
                    <CountUp end={parsed.num} suffix={parsed.suffix} duration={1.8} />
                  ) : (
                    m.value
                  )}
                </span>
                <span className="text-foreground/56">{m.label}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Highlights — truncated to 4 on card */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 sm:gap-y-2.5 mb-2">
        {cardHighlights.slice(0, 4).map((h) => (
          <li
            key={h}
            className="text-[12px] sm:text-[13px] leading-relaxed text-foreground/78 flex items-start gap-2"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[5px] sm:mt-[6px] flex-shrink-0" />
            {h}
          </li>
        ))}
      </ul>

      {/* Tech chips */}
      <div className="flex flex-wrap gap-1.5 mt-4 sm:mt-5 mb-5 sm:mb-6">
        {project.tech.map((t) => (
          <span
            key={t}
            className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-md bg-secondary/40 text-foreground/72 border border-border/20"
          >
            {t}
          </span>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2.5 sm:gap-3">
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
            className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-2.5 rounded-xl bg-secondary/60 text-foreground/80 text-sm font-medium border border-border/30 hover:text-foreground hover:bg-secondary/80 transition-colors"
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
