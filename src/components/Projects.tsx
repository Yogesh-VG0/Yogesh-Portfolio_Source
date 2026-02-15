import { motion, useInView } from "framer-motion";
import { useId, useRef, useState, type ReactNode } from "react";
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
  icon: ReactNode;
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
  defaultHighlights: number;
  metrics?: ProjectMetric[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "StockPredict AI",
    tagline: "Daily AI predictions for the top 100 US stocks — with confidence scores and clear explanations",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    role: "Full-stack + ML Engineer",
    year: "2024 – Present",
    description:
      "A daily retraining pipeline that forecasts short-term direction for 1, 7, and 30 days, shows confidence for each prediction, and explains which signals influenced the result — all inside a live interactive dashboard.",
    highlights: [
      "Fully automated: the system retrains and updates predictions every day without manual effort",
      "Pulls from 50+ data signals including price trends, economic indicators, insider activity, and news sentiment",
      "Analyzes news from multiple sources and scores how positive or negative the coverage is for each stock",
      "Every prediction comes with a plain-English explanation of the key drivers behind it",
      "AI-generated market summaries written by Google Gemini give a quick overview of each stock",
      "Live price updates stream into the dashboard in real time via WebSocket",
      "Interactive charts, heatmaps, and an economic calendar built with TradingView widgets",
      "Tracks prediction history so you can see how accurate the model has been over time",
    ],
    defaultHighlights: 4,
    metrics: [
      { icon: <BarChart3 size={14} />, label: "Stocks", value: "100" },
      { icon: <Layers size={14} />, label: "Windows", value: "3" },
      { icon: <Cpu size={14} />, label: "Signals", value: "50+" },
      { icon: <Calendar size={14} />, label: "Updates", value: "Daily" },
      { icon: <Sparkles size={14} />, label: "Insights", value: "AI-powered" },
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "FastAPI", "LightGBM", "MongoDB", "Redis", "WebSocket", "Tailwind"],
    liveUrl: "https://stock-predict-ai.vercel.app",
    githubUrl: "https://github.com/Yogesh-VG0/Stock_Predict_Ai",
  },
  {
    title: "ExpenseVision",
    tagline: "Snap a receipt, auto-categorize, and visualize your spending instantly",
    featured: false,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    role: "Full-stack Developer",
    year: "2024",
    description:
      "Upload or photograph a receipt and the app reads it automatically, extracts the amount and vendor, sorts it into a category that gets smarter over time, and shows interactive spending charts.",
    highlights: [
      "Two receipt-reading engines: a cloud API for speed plus a local fallback so it always works",
      "Smart categorization that learns your habits — the more you use it, the better it gets",
      "Visual dashboards: spending by category, monthly trends, and daily breakdowns",
      "Drag-and-drop upload with auto-extracted amount, vendor, and date",
      "Dark/light theme with a mobile-friendly sidebar for easy navigation",
      "Export to CSV, filter by date or category, and secure login/signup",
    ],
    defaultHighlights: 4,
    tech: ["Flask", "Python", "JavaScript", "SQLite", "PostgreSQL", "Chart.js", "Tesseract OCR", "Veryfi API"],
    liveUrl: "https://expensevision-ip5u.onrender.com",
    githubUrl: "https://github.com/Yogesh-VG0/ExpenseVision",
  },
  {
    title: "WeatherWise",
    tagline: "Command-line weather reports with styled HTML output — CS50P final project",
    featured: false,
    status: "Open Source",
    statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    role: "Developer",
    year: "2024",
    description:
      "A command-line app that fetches live weather data and generates clean, styled HTML reports you can open in any browser.",
    highlights: [
      "Live weather data from OpenWeatherMap with city search",
      "Generates a styled HTML report you can save and share",
      "Input validation so typos and bad queries are handled gracefully",
      "Fully tested with automated unit tests",
    ],
    defaultHighlights: 4,
    tech: ["Python", "OpenWeatherMap API", "HTML/CSS", "unittest"],
    githubUrl: "https://github.com/Yogesh-VG0/weather-dashboard",
  },
];

/* ------------------------------------------------------------------ */
/*  Expandable highlights (accessible)                                 */
/* ------------------------------------------------------------------ */
const ExpandableHighlights = ({
  highlights,
  defaultCount,
}: {
  highlights: string[];
  defaultCount: number;
}) => {
  const [expanded, setExpanded] = useState(false);
  const listId = useId();
  const hasMore = highlights.length > defaultCount;
  const visible = expanded ? highlights : highlights.slice(0, defaultCount);

  return (
    <div>
      <ul
        id={listId}
        className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-2"
      >
        {visible.map((h) => (
          <li
            key={h}
            className="text-[13px] leading-relaxed text-muted-foreground/80 flex items-start gap-2.5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-[6px] flex-shrink-0" />
            {h}
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          type="button"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          aria-controls={listId}
          className="inline-flex items-center gap-1 text-xs font-mono text-primary/70 hover:text-primary transition-colors mt-1 py-1 px-2 -ml-2 rounded-lg hover:bg-primary/10"
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
/*  Featured project card                                              */
/* ------------------------------------------------------------------ */
const FeaturedCard = ({ project }: { project: Project }) => (
  <motion.div
    variants={fadeUp}
    className="group relative rounded-2xl border bg-card/60 border-primary/15 p-5 sm:p-7 md:p-9 transition-all duration-500 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/5 overflow-hidden"
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

    {/* Meta row */}
    <div className="flex flex-wrap items-center gap-2 mb-3">
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${project.statusColor}`}
      >
        <CircleDot size={8} />
        {project.status}
      </span>
      <span className="text-[11px] text-muted-foreground/50 font-mono">
        {project.role}
      </span>
      <span className="text-[11px] text-muted-foreground/30">·</span>
      <span className="text-[11px] text-muted-foreground/50 font-mono">
        {project.year}
      </span>
    </div>

    {/* Title + tagline */}
    <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors mb-1.5">
      {project.title}
    </h3>
    <p className="text-sm text-muted-foreground/60 font-medium mb-3">
      {project.tagline}
    </p>
    <p className="text-sm md:text-[15px] text-muted-foreground/70 leading-relaxed mb-5">
      {project.description}
    </p>

    {/* Metrics row */}
    {project.metrics && (
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
        {project.metrics.map((m) => (
          <div
            key={m.label}
            className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-background/50 border border-border/20 text-muted-foreground/70"
          >
            <span className="text-primary/70">{m.icon}</span>
            <span className="font-semibold text-foreground/80">{m.value}</span>
            <span className="text-muted-foreground/50">{m.label}</span>
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
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Regular project card                                               */
/* ------------------------------------------------------------------ */
const ProjectCard = ({ project }: { project: Project }) => (
  <motion.div
    variants={fadeUp}
    className="group relative rounded-2xl border bg-card/40 border-border/30 p-5 sm:p-6 md:p-8 transition-all duration-300 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/3 overflow-hidden"
  >
    {/* Hover glow */}
    <div className="absolute -top-16 -right-16 w-32 h-32 bg-primary/4 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

    {/* Meta row */}
    <div className="flex flex-wrap items-center gap-2 mb-2">
      <span
        className={`inline-flex items-center gap-1 text-[11px] font-mono px-2 py-0.5 rounded-full border ${project.statusColor}`}
      >
        <CircleDot size={8} />
        {project.status}
      </span>
      <span className="text-[11px] text-muted-foreground/50 font-mono">
        {project.role}
      </span>
      <span className="text-[11px] text-muted-foreground/30">·</span>
      <span className="text-[11px] text-muted-foreground/50 font-mono">
        {project.year}
      </span>
    </div>

    {/* Title */}
    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors mb-1">
      {project.title}
    </h3>
    <p className="text-[13px] text-muted-foreground/55 font-medium mb-2">
      {project.tagline}
    </p>
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
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.12)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-10 sm:mb-12">
            <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">
              Projects
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              Featured work
            </h2>
            <div className="section-ornament" />
          </motion.div>

          {/* Featured projects */}
          <div className="space-y-8 sm:space-y-10">
            {featured.map((project) => (
              <FeaturedCard key={project.title} project={project} />
            ))}
          </div>

          {/* Other projects */}
          {others.length > 0 && (
            <div className="space-y-5 sm:space-y-6 mt-8 sm:mt-10">
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
