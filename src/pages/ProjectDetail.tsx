import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ExternalLink,
  Github,
  CircleDot,
  AlertTriangle,
  Lightbulb,
  Target,
  Layers,
  Zap,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Workflow,
  Trophy,
} from "lucide-react";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { projects } from "@/data/projects";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Yogesh Vadivel`;
    }
    return () => {
      document.title = "Yogesh Vadivel | Full-Stack Developer";
    };
  }, [project]);

  const handleBackToProjects = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("projects");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  if (!project || !project.caseStudy) {
    return (
      <div className="min-h-screen text-foreground flex items-center justify-center relative z-[1]">
        <div className="text-center px-4">
          <h1 className="text-4xl font-bold mb-4">Project not found</h1>
          <button onClick={handleBackToProjects} className="text-primary hover:underline">
            ← Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const cs = project.caseStudy;
  const gallery = project.gallery || [];
  const currentImg = gallery[galleryIdx] || null;

  const prevImage = () => setGalleryIdx((galleryIdx - 1 + gallery.length) % gallery.length);
  const nextImage = () => setGalleryIdx((galleryIdx + 1) % gallery.length);

  return (
    <div className="min-h-screen text-foreground relative z-[1]">
      {/* Top bar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40">
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-16 px-4 sm:px-6">
          <button
            onClick={handleBackToProjects}
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Projects
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
              >
                <ExternalLink size={12} />
                <span className="hidden sm:inline">Live Demo</span>
                <span className="sm:hidden">Demo</span>
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github size={12} />
                Source
              </a>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 sm:px-6 py-10 sm:py-16">
        <motion.div
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="visible"
        >
          {/* Hero */}
          <motion.div variants={fadeUp} className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-2 mb-4">
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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          </motion.div>

          {/* Image Carousel */}
          {gallery.length > 0 && (
            <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
              <div className="relative group rounded-xl overflow-hidden border border-border/30 shadow-lg bg-card/20">
                {/* Main image with click to open lightbox */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="w-full cursor-zoom-in"
                  aria-label="Click to enlarge image"
                >
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={galleryIdx}
                      src={gallery[galleryIdx].src}
                      alt={gallery[galleryIdx].alt}
                      className="w-full h-auto object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    />
                  </AnimatePresence>
                </button>

                {/* Navigation arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all opacity-0 group-hover:opacity-100"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Image counter badge */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[11px] font-mono">
                    {galleryIdx + 1} / {gallery.length}
                  </div>
                )}
              </div>

              {/* Thumbnail strip */}
              {gallery.length > 1 && (
                <div className="flex gap-2 mt-3 overflow-x-auto pb-1 scrollbar-hide">
                  {gallery.map((img, idx) => (
                    <button
                      key={img.src}
                      onClick={() => setGalleryIdx(idx)}
                      className={`flex-shrink-0 w-16 h-10 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        idx === galleryIdx
                          ? "border-primary shadow-md shadow-primary/20"
                          : "border-border/20 opacity-50 hover:opacity-80"
                      }`}
                      aria-label={img.alt}
                    >
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              {/* Caption */}
              {currentImg && (
                <p className="text-xs text-muted-foreground/50 mt-2 font-mono">{currentImg.alt}</p>
              )}
            </motion.div>
          )}

          {/* Metrics */}
          {project.metrics && (
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg bg-card/50 border border-border/20 text-muted-foreground/70"
                >
                  <span className="text-primary/70">{m.icon}</span>
                  <span className="font-semibold text-foreground/80">{m.value}</span>
                  <span className="text-muted-foreground/50">{m.label}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* Problem */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">The Problem</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-0 sm:pl-10">{cs.problem}</p>
          </motion.div>

          {/* Approach */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">Approach</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-0 sm:pl-10">{cs.approach}</p>
          </motion.div>

          {/* Architecture */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Layers size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">Architecture</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-0 sm:pl-10 mb-5">{cs.architecture}</p>

            {/* Architecture Cards */}
            {cs.architectureCards && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:pl-10">
                {cs.architectureCards.map((card) => (
                  <div
                    key={card.label}
                    className="rounded-xl bg-card/40 border border-border/20 p-4 hover:border-primary/20 transition-colors group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {card.icon && <span className="text-lg">{card.icon}</span>}
                      <h3 className="text-sm font-bold text-foreground">{card.label}</h3>
                    </div>
                    <p className="text-xs text-muted-foreground/70 leading-relaxed">{card.detail}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* How It Works */}
          {cs.howItWorks && cs.howItWorks.length > 0 && (
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Workflow size={16} className="text-primary" />
                </div>
                <h2 className="text-xl font-bold">How It Works</h2>
              </div>
              <div className="space-y-0 pl-0 sm:pl-10">
                {cs.howItWorks.map((step, idx) => (
                  <div key={step.title} className="relative pl-6 sm:pl-8 pb-8 last:pb-0">
                    {/* Vertical line */}
                    {idx < cs.howItWorks!.length - 1 && (
                      <div className="absolute left-[11px] top-7 bottom-0 w-px bg-border/40" />
                    )}
                    {/* Step number dot */}
                    <div className="absolute left-0 top-0.5 w-6 h-6 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-primary">{idx + 1}</span>
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-1">{step.title}</h3>
                    <p className="text-[13px] text-muted-foreground/70 leading-relaxed">{step.description}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Key Features */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">Key Features</h2>
            </div>
            <ul className="grid gap-3 pl-0 sm:pl-10">
              {project.highlights.map((h) => (
                <li key={h} className="text-sm text-muted-foreground flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                  {h}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Challenges */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-orange-500/10 flex items-center justify-center flex-shrink-0">
                <AlertTriangle size={16} className="text-orange-400" />
              </div>
              <h2 className="text-xl font-bold">Challenges & Solutions</h2>
            </div>
            <ul className="grid gap-3 pl-0 sm:pl-10">
              {cs.challenges.map((c) => (
                <li key={c} className="text-sm text-muted-foreground flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-1.5 flex-shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Tech Stack */}
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="text-xl font-bold mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary/40 text-muted-foreground/70 border border-border/20 hover:border-primary/20 hover:text-foreground/80 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          <motion.div variants={fadeUp} className="mb-12">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <Trophy size={16} className="text-emerald-400" />
              </div>
              <h2 className="text-xl font-bold">Results</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed pl-0 sm:pl-10">{cs.results}</p>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <motion.a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={tapScale}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/15"
              >
                <ExternalLink size={14} />
                Try Live Demo
              </motion.a>
            )}
            {project.githubUrl && (
              <motion.a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={tapScale}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/60 text-muted-foreground text-sm font-medium border border-border/30 hover:text-foreground transition-colors"
              >
                <Github size={14} />
                View Source Code
              </motion.a>
            )}
            <button onClick={handleBackToProjects}>
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={tapScale}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/60 text-muted-foreground text-sm font-medium border border-border/30 hover:text-foreground transition-colors"
              >
                All Projects
                <ArrowRight size={14} />
              </motion.span>
            </button>
          </motion.div>
        </motion.div>
      </main>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxOpen && gallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setLightboxOpen(false)}
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
          >
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 sm:left-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 sm:right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={20} />
                </button>
              </>
            )}

            <img
              src={gallery[galleryIdx].src}
              alt={gallery[galleryIdx].alt}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-xs font-mono">
              {galleryIdx + 1} / {gallery.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetail;
