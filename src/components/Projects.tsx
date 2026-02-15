import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Star,
  Github,
  ExternalLink,
  ChevronDown,
  BarChart3,
  Cpu,
  Layers,
  Calendar,
  Sparkles,
  CircleDot,
} from "lucide-react";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

interface ProjectMetric {
  icon: React.ReactNode;
  label: string;
  value: string;
}

interface Project {
  title: string;
  tagline: string;
  featured: boolean;
  status: "Production" | "In Progress" | "Open Source" | "Archived";
  statusColor: string;
  role: string;
  year: string;
  description: string;
  highlights: string[];
  defaultHighlights: number; // how many to show by default
  metrics?: ProjectMetric[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
}

const projects: Project[] = [
  {
    title: "StockPredict AI",
    tagline: "AI-powered S&P 100 prediction platform with daily automated ML pipeline",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    role: "Full-stack + ML Engineer",
    year: "2024 – Present",
    description:
      "Trains LightGBM models daily, predicts market-neutral alpha at multiple horizons with conformal intervals, and serves SHAP explanations alongside real-time data through an interactive dashboard.",
    highlights: [
      "LightGBM with walk-forward validation, purge/embargo, and feature pruning",
      "50+ engineered features: technicals, macro (FRED), insider transactions, sentiment",
      "5-model NLP sentiment ensemble (FinBERT, RoBERTa variants, VADER)",
      "SHAP explainability + Gemini 2.5 Flash AI market narratives",
      "Finnhub WebSocket real-time prices with React context provider",
      "TradingView charts, heatmaps, economic calendar, and hotlists",
      "Automated daily CI/CD pipeline: train → predict → explain → evaluate",
      "Multi-source news aggregation with sentiment scoring",
    ],
    defaultHighlights: 4,
    metrics: [
      { icon: <BarChart3 size={14} />, label: "Tickers", value: "100" },
      { icon: <Layers size={14} />, label: "Horizons", value: "3" },
      { icon: <Cpu size={14} />, label: "Features", value: "50+" },
      { icon: <Calendar size={14} />, label: "Pipeline", value: "Daily CI" },
      { icon: <Sparkles size={14} />, label: "Explain", value: "SHAP + LLM" },
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "FastAPI", "LightGBM", "MongoDB", "Redis", "WebSocket", "Tailwind"],
    liveUrl: "https://stock-predict-ai.vercel.app",
    githubUrl: "https://github.com/Yogesh-VG0/Stock_Predict_Ai",
    image: "/stockpredict-preview.png",
  },
  {
    title: "ExpenseVision",
    tagline: "Smart expense tracker with receipt OCR and self-learning categorization",
    featured: false,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    role: "Full-stack Developer",
    year: "2024",
    description:
      "Dual-path OCR receipt scanning (Veryfi API + Tesseract fallback) with a self-learning category classifier and interactive Chart.js analytics dashboards.",
    highlights: [
      "Dual OCR pipeline: Veryfi cloud API with local Tesseract fallback",
      "Self-learning keyword classifier that improves with each expense added",
      "Chart.js analytics: category doughnut, monthly bar, daily trend line",
      "Drag-and-drop receipt upload with auto-extracted amount, vendor & date",
      "Dark/light theme toggle with responsive mobile sidebar",
      "CSV export, filtering by date range/category/search, and secure auth",
    ],
    defaultHighlights: 4,
    tech: ["Flask", "Python", "JavaScript", "SQLite", "PostgreSQL", "Chart.js", "Tesseract OCR", "Veryfi API"],
    liveUrl: "https://expensevision-ip5u.onrender.com",
    githubUrl: "https://github.com/Yogesh-VG0/ExpenseVision",
    image: "/expensevision-preview.png",
  },
  {
    title: "WeatherWise",
    tagline: "CLI weather tool with styled HTML reports — CS50P final project",
    featured: false,
    status: "Open Source",
    statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    role: "Developer",
    year: "2024",
    description:
      "Command-line weather app that fetches real-time data from OpenWeatherMap and generates styled HTML reports.",
    highlights: [
      "Real-time weather data via OpenWeatherMap API",
      "Input validation with regex",
      "Styled HTML report generation",
      "Testable code with unittest.mock",
    ],
    defaultHighlights: 4,
    tech: ["Python", "OpenWeatherMap API", "HTML/CSS", "unittest"],
    githubUrl: "https://github.com/Yogesh-VG0/weather-dashboard",
  },
];

/* ------------------------------------------------------------------ */
/*  Expandable highlights                                              */
/* ------------------------------------------------------------------ */
const ExpandableHighlights = ({
  highlights,
  defaultCount,
}: {
  highlights: string[];
  defaultCount: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = highlights.length > defaultCount;
  const visible = expanded ? highlights : highlights.slice(0, defaultCount);

  return (
    <div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-2">
        {visible.map((h) => (
          <li key={h} className="text-[13px] text-muted-foreground/80 flex items-start gap-2.5">
            <span className="w-1 h-1 rounded-full bg-primary mt-[7px] flex-shrink-0" />
            {h}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="inline-flex items-center gap-1 text-xs font-mono text-primary/70 hover:text-primary transition-colors mt-1"
        >
          <ChevronDown
            size={13}
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          />
          {expanded ? "Show less" : `Show more (${highlights.length - defaultCount})`}
        </button>
      )}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Featured project card (hero layout)                                */
/* ------------------------------------------------------------------ */
const FeaturedCard = ({ project, inView }: { project: Project; inView: boolean }) => (
  <motion.div
    variants={fadeUp}
    className="group relative rounded-2xl border bg-card/60 border-primary/15 p-7 md:p-9 transition-all duration-500 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
  >
    {/* Ambient glow */}
    <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-primary/3 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

    {/* Featured ribbon */}
    <div className="absolute -top-px -right-px">
      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-bl-xl rounded-tr-2xl bg-primary/10 border-b border-l border-primary/20 text-xs font-mono text-primary">
        <Star size={11} fill="currentColor" />
        Featured
      </div>
    </div>

    {/* Hero layout: image left, content right */}
    <div className="flex flex-col lg:flex-row gap-7 lg:gap-9">
      {/* Preview image */}
      {project.image && (
        <motion.div
          className="lg:w-[45%] flex-shrink-0 rounded-xl overflow-hidden border border-border/20 bg-background/50 shadow-lg"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top aspect-[16/10]"
            loading="lazy"
            onError={(e) => {
              // Fallback: gradient placeholder if image doesn't exist yet
              const target = e.currentTarget;
              target.style.display = "none";
              target.parentElement!.classList.add(
                "bg-gradient-to-br",
                "from-primary/10",
                "to-primary/5",
                "flex",
                "items-center",
                "justify-center",
                "min-h-[200px]",
                "lg:min-h-[280px]"
              );
              const placeholder = document.createElement("div");
              placeholder.className = "text-center p-6";
              placeholder.innerHTML = `<div class="text-4xl mb-2">📊</div><p class="text-xs text-muted-foreground/50 font-mono">Dashboard Preview</p>`;
              target.parentElement!.appendChild(placeholder);
            }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${project.statusColor}`}
          >
            <CircleDot size={8} />
            {project.status}
          </span>
          <span className="text-[11px] text-muted-foreground/50 font-mono">{project.role}</span>
          <span className="text-[11px] text-muted-foreground/30">·</span>
          <span className="text-[11px] text-muted-foreground/50 font-mono">{project.year}</span>
        </div>

        {/* Title + tagline */}
        <h3 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm md:text-[15px] text-muted-foreground/70 leading-relaxed mb-5">
          {project.description}
        </p>

        {/* Metrics row */}
        {project.metrics && (
          <div className="flex flex-wrap gap-3 mb-6">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded-lg bg-background/50 border border-border/20 text-muted-foreground/70"
              >
                <span className="text-primary/70">{m.icon}</span>
                <span className="font-semibold text-foreground/80">{m.value}</span>
                <span className="text-muted-foreground/40">{m.label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Expandable highlights */}
        <ExpandableHighlights
          highlights={project.highlights}
          defaultCount={project.defaultHighlights}
        />

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
        <div className="flex flex-wrap items-center gap-3">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-shadow"
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/60 text-muted-foreground text-sm font-medium border border-border/30 hover:text-foreground hover:bg-secondary/80 transition-colors"
            >
              <Github size={14} />
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Regular project card                                               */
/* ------------------------------------------------------------------ */
const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    variants={fadeUp}
    className="group relative rounded-2xl border bg-card/40 border-border/30 p-6 md:p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/3 overflow-hidden"
  >
    {/* Hover glow */}
    <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/4 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
      {/* Preview image (smaller for standard cards) */}
      {project.image && (
        <motion.div
          className="sm:w-[200px] flex-shrink-0 rounded-xl overflow-hidden border border-border/20 bg-background/50 shadow-md"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
        >
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="w-full h-full object-cover object-top aspect-[16/10] sm:aspect-[4/3]"
            loading="lazy"
            onError={(e) => {
              const target = e.currentTarget;
              target.style.display = "none";
              target.parentElement!.classList.add(
                "bg-gradient-to-br",
                "from-primary/8",
                "to-primary/3",
                "flex",
                "items-center",
                "justify-center",
                "min-h-[120px]"
              );
              const placeholder = document.createElement("div");
              placeholder.className = "text-center p-4";
              placeholder.innerHTML = `<div class="text-2xl mb-1">💰</div><p class="text-[10px] text-muted-foreground/40 font-mono">Preview</p>`;
              target.parentElement!.appendChild(placeholder);
            }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Meta row */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span
            className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${project.statusColor}`}
          >
            <CircleDot size={8} />
            {project.status}
          </span>
          <span className="text-[11px] text-muted-foreground/50 font-mono">{project.role}</span>
          <span className="text-[11px] text-muted-foreground/30">·</span>
          <span className="text-[11px] text-muted-foreground/50 font-mono">{project.year}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground/70 leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Expandable highlights */}
        <ExpandableHighlights
          highlights={project.highlights}
          defaultCount={project.defaultHighlights}
        />

        {/* Tech chips */}
        <div className="flex flex-wrap gap-1.5 mt-4 mb-5">
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
        <div className="flex flex-wrap items-center gap-2.5">
          {project.liveUrl && (
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors"
            >
              <ExternalLink size={13} />
              Live Demo
            </motion.a>
          )}
          {project.githubUrl && (
            <motion.a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03, y: -1 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-secondary/50 text-muted-foreground text-xs font-medium border border-border/20 hover:text-foreground hover:bg-secondary/70 transition-colors"
            >
              <Github size={13} />
              Source Code
            </motion.a>
          )}
        </div>
      </div>
    </div>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Section                                                            */
/* ------------------------------------------------------------------ */
const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const featured = projects.filter((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">Projects</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Featured work</h2>
            <div className="section-ornament" />
          </motion.div>

          {/* Featured projects */}
          <div className="space-y-10">
            {featured.map((project) => (
              <FeaturedCard key={project.title} project={project} inView={inView} />
            ))}
          </div>

          {/* Other projects */}
          {others.length > 0 && (
            <div className="space-y-6 mt-10">
              {others.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
