import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { screenshotSources } from "@/lib/images";
import { projectDetails, type ProjectSlug } from "@/data/project-details";
import ArchitectureFlow from "@/components/ArchitectureFlow";
import ThemeToggle from "@/components/ThemeToggle";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);
  const [galleryIdx, setGalleryIdx] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const headerVisible = useScrollDirection(10);
  const galleryCount = project?.gallery?.length ?? 0;

  useEffect(() => {
    if (!lightboxOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    const dialog = document.querySelector<HTMLElement>('[role="dialog"][aria-label="Image viewer"]');
    const pageContent = document.querySelector<HTMLElement>("main");
    const pageHeader = document.querySelector<HTMLElement>("header");
    document.body.style.overflow = "hidden";
    if (pageContent) pageContent.inert = true;
    if (pageHeader) pageHeader.inert = true;
    dialog?.querySelector<HTMLButtonElement>("button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
      if (event.key === "ArrowRight" && galleryCount) setGalleryIdx(index => (index + 1) % galleryCount);
      if (event.key === "ArrowLeft" && galleryCount) setGalleryIdx(index => (index - 1 + galleryCount) % galleryCount);
      if (event.key === "Tab") {
        const controls = dialog?.querySelectorAll<HTMLButtonElement>("button");
        if (!controls?.length) return;
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (pageContent) pageContent.inert = false;
      if (pageHeader) pageHeader.inert = false;
      previousFocus?.focus();
    };
  }, [lightboxOpen, galleryCount]);

  /* Scroll to top on mount */
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const handleBackToProjects = () => {
    navigate("/projects/");
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
  const detail = projectDetails[project.slug as ProjectSlug];
  const relatedProjects = projects.filter(item => item.slug !== project.slug);

  const prevImage = () => setGalleryIdx((galleryIdx - 1 + gallery.length) % gallery.length);
  const nextImage = () => setGalleryIdx((galleryIdx + 1) % gallery.length);

  return (
    <div className="min-h-screen text-foreground relative z-[1]">
      {/* Top bar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
        style={{
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-16 px-4 sm:px-6">
          <button
            onClick={handleBackToProjects}
            aria-label="Back to Projects"
            className="inline-flex min-h-11 shrink-0 items-center gap-2 text-sm font-medium text-foreground/72 hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            <span><span className="hidden sm:inline">Back to </span>Projects</span>
          </button>
          <div className="flex items-center gap-2 sm:gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold"
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
                aria-label="Source code"
                className="inline-flex min-h-11 min-w-11 justify-center items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/40 text-xs font-medium text-foreground/80 hover:text-foreground transition-colors"
              >
                <Github size={12} />
                <span className="hidden sm:inline">Source</span>
              </a>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container mx-auto max-w-5xl px-4 sm:px-6 pt-24 sm:pt-28 pb-10 sm:pb-16">
        <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-2 text-xs leading-6 text-foreground/70"><Link to="/" className="hover:text-primary">Home</Link><span aria-hidden="true">/</span><Link to="/projects/" className="hover:text-primary">Projects</Link><span aria-hidden="true">/</span><span aria-current="page">{project.title}</span></nav>
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
              <span className="text-[11px] text-foreground/60 font-mono">
                {project.year}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-foreground/78 max-w-2xl leading-relaxed">
              {detail.descriptor}.
            </p>
            <p className="mt-4 text-xs leading-6 text-foreground/65">By Yogesh Vadivel · Full-stack development · Case study reviewed <time dateTime="2026-11-10">10 November 2026</time></p>
          </motion.div>

          {/* Image Carousel */}
          {gallery.length > 0 && (
            <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
              <div className="relative group rounded-xl overflow-hidden border border-border/30 shadow-lg bg-black/10 dark:bg-black/30 aspect-[16/10]" role="region" aria-roledescription="carousel" aria-label={`${project.title} screenshots`} onKeyDown={event => { if (event.key === "ArrowRight") { event.preventDefault(); nextImage(); } if (event.key === "ArrowLeft") { event.preventDefault(); prevImage(); } }}>
                {/* Main image with click to open lightbox */}
                <button
                  onClick={() => setLightboxOpen(true)}
                  className="absolute inset-0 w-full h-full cursor-zoom-in"
                  aria-label="Click to enlarge image"
                >
                  <AnimatePresence initial={false}>
                    <motion.img
                      key={galleryIdx}
                      src={gallery[galleryIdx].src}
                      {...screenshotSources(gallery[galleryIdx].src, "(max-width: 768px) calc(100vw - 32px), 960px")}
                      alt={gallery[galleryIdx].alt}
                      width="1920" height="1200"
                      className="absolute inset-0 w-full h-full object-cover"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    />
                  </AnimatePresence>
                </button>

                {/* Navigation arrows */}
                {gallery.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-all sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 z-[2]"
                      aria-label="Previous image"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm flex items-center justify-center text-white transition-all sm:opacity-0 sm:group-hover:opacity-100 focus-visible:opacity-100 z-[2]"
                      aria-label="Next image"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </>
                )}

                {/* Image counter badge */}
                {gallery.length > 1 && (
                  <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-sm text-white text-[11px] font-mono z-[2]">
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
                      className={`flex-shrink-0 w-16 h-11 sm:w-20 sm:h-12 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                        idx === galleryIdx
                          ? "border-primary shadow-md shadow-primary/20"
                          : "border-border/20 opacity-50 hover:opacity-80"
                      }`}
                      aria-label={img.alt}
                    >
                      <img src={img.src} {...screenshotSources(img.src, "96px")} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}

              {/* Caption */}
              {currentImg && (
                <p className="text-sm text-foreground/65 mt-2 font-mono">{currentImg.alt}</p>
              )}
            </motion.div>
          )}

          {/* Metrics */}
          {project.metrics && (
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2 sm:gap-3 mb-10 sm:mb-12">
              {project.metrics.map((m) => (
                <div
                  key={m.label}
                  className="flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg bg-card/50 border border-border/20 text-foreground/74"
                >
                  <span className="text-primary/80">{m.icon}</span>
                  <span className="font-semibold text-foreground">{m.value}</span>
                  <span className="text-foreground/56">{m.label}</span>
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
            <p className="text-foreground/80 leading-relaxed pl-0 sm:pl-10">{cs.problem}</p>
          </motion.div>

          {/* Approach */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Lightbulb size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">Approach</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed pl-0 sm:pl-10">{cs.approach}</p>
          </motion.div>

          {/* Architecture */}
          <motion.div variants={fadeUp} className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Layers size={16} className="text-primary" />
              </div>
              <h2 className="text-xl font-bold">Architecture</h2>
            </div>
            <p className="text-foreground/80 leading-relaxed pl-0 sm:pl-10 mb-5">{cs.architecture}</p>
            <ArchitectureFlow steps={detail.flow} title={project.title} />

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
                    <p className="text-sm text-foreground/74 leading-7 sm:text-xs sm:leading-relaxed">{card.detail}</p>
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
                    <p className="text-[15px] leading-7 sm:text-sm sm:leading-relaxed text-foreground/80">{step.description}</p>
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
                <li key={h} className="text-[15px] leading-7 sm:text-sm sm:leading-relaxed text-foreground/80 flex items-start gap-2.5">
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
                <li key={c} className="text-[15px] leading-7 sm:text-sm sm:leading-relaxed text-foreground/80 flex items-start gap-2.5">
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
                  className="text-xs font-mono px-3 py-1.5 rounded-lg bg-secondary/40 text-foreground/72 border border-border/20 hover:border-primary/20 hover:text-foreground transition-colors"
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
            <p className="text-foreground/80 leading-relaxed pl-0 sm:pl-10">{cs.results}</p>
            <p className="mt-4 border-l-2 border-primary/40 pl-4 text-sm leading-7 text-foreground/75 sm:ml-10">{detail.note}</p>
          </motion.div>

          <section className="mb-10 border-t border-border/40 pt-8">
            <h2 className="text-xl font-bold">What I'd improve next</h2>
            <p className="mt-3 text-base leading-8 text-foreground/80">{detail.nextSteps}</p>
            <a href={`${project.githubUrl}/blob/main/README.md`} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-primary">Read the implementation notes<ExternalLink size={14} aria-hidden="true" /></a>
          </section>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <motion.a
                href={"demoUrl" in detail ? detail.demoUrl : project.liveUrl}
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
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/60 text-foreground/80 text-sm font-medium border border-border/30 hover:text-foreground transition-colors"
              >
                <Github size={14} />
                View Source Code
              </motion.a>
            )}
            <button onClick={handleBackToProjects}>
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={tapScale}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-secondary/60 text-foreground/80 text-sm font-medium border border-border/30 hover:text-foreground transition-colors"
              >
                All Projects
                <ArrowRight size={14} />
              </motion.span>
            </button>
          </motion.div>
          <section className="mt-12 border-t border-border/40 pt-8" aria-labelledby="related-projects">
            <h2 id="related-projects" className="text-xl font-bold">Explore another project</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">{relatedProjects.map(item => <Link key={item.slug} to={`/projects/${item.slug}/`} className="rounded-xl border border-border/40 p-5 transition-colors hover:border-primary/50">
              <h3 className="flex items-center justify-between gap-3 text-base font-semibold">{item.title}<ArrowRight size={16} aria-hidden="true" /></h3>
              <p className="mt-2 text-sm leading-7 text-foreground/75">{projectDetails[item.slug as ProjectSlug].descriptor}.</p>
            </Link>)}</div>
            <div className="mt-8 flex flex-wrap items-center gap-4"><a href="/#contact" className="inline-flex min-h-12 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground">Let's discuss a role or project</a><Link to="/resume/" className="inline-flex min-h-11 items-center text-sm text-primary">View my resume</Link></div>
          </section>
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
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
              aria-label="Close"
            >
              <X size={20} />
            </button>

            {gallery.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevImage(); }}
                  className="absolute left-2 sm:left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-2 sm:right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors z-10"
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

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  // Related-project navigation reuses the route; each case study needs fresh
  // gallery/lightbox state so a long gallery's index cannot reach a shorter one.
  return <ProjectDetail key={slug} />;
}
