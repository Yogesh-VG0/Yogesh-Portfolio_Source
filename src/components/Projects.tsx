import { motion, useInView } from "framer-motion";
import { useRef, type ReactNode } from "react";
import {
  Star,
  Github,
  ExternalLink,
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
  year: string;
  description: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projects: Project[] = [
  {
    title: "StockPredict AI",
    tagline:
      "Full-stack ML platform that predicts, explains, and tracks S&P 100 stocks daily",
    featured: true,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025 – Present",
    description:
      "An end-to-end stock prediction system that runs a fully automated daily pipeline — fetching market data, training LightGBM models, generating price forecasts for 1-day, 7-day, and 30-day horizons, and writing plain-English explanations powered by Google Gemini. Everything is served through a real-time Next.js dashboard with live WebSocket prices, TradingView charts, and interactive heatmaps.",
    highlights: [
      "Automated daily pipeline via GitHub Actions: data ingestion, model training, predictions, and AI explanations — zero manual intervention",
      "50+ engineered features per stock including price technicals, macro indicators, insider trades, short interest, and multi-source sentiment",
      "Sentiment analysis from 10+ sources (Finnhub, RSS, Reddit, Seeking Alpha) scored by FinBERT, RoBERTa, and VADER NLP models",
      "SHAP-based explainability breaks down each prediction into the exact features that drove it, then Gemini writes a stock-specific briefing",
      "Gemini model auto-fallback chain (Pro → Flash → Flash-Lite) with per-model rate tracking to maximize free-tier API usage",
      "Real-time WebSocket price streaming, TradingView advanced charts, market heatmaps, and an economic calendar",
      "Prediction history tracking with model evaluation and drift monitoring to measure accuracy over time",
      "Data retention policy automatically cleans up old documents across all MongoDB collections",
    ],
    metrics: [
      { icon: <BarChart3 size={14} />, label: "Stocks", value: "100" },
      { icon: <Layers size={14} />, label: "Horizons", value: "3" },
      { icon: <Cpu size={14} />, label: "Features", value: "50+" },
      { icon: <Calendar size={14} />, label: "Pipeline", value: "Daily" },
      { icon: <Sparkles size={14} />, label: "Insights", value: "AI-powered" },
    ],
    tech: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "FastAPI",
      "LightGBM",
      "SHAP",
      "MongoDB",
      "Redis",
      "WebSocket",
      "Tailwind",
      "GitHub Actions",
    ],
    liveUrl: "https://stock-predict-ai.vercel.app",
    githubUrl: "https://github.com/Yogesh-VG0/Stock_Predict_Ai",
  },
  {
    title: "ExpenseVision",
    tagline:
      "AI-powered expense tracker with receipt scanning and spending insights",
    featured: false,
    status: "Production",
    statusColor: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
    year: "2025",
    description:
      "A full-stack expense management app that lets you snap or upload a receipt, automatically reads it with OCR, extracts the amount and vendor using AI, and categorizes it with a classifier that learns from your habits. Interactive Chart.js dashboards break down spending by category, month, and day — plus an AI coach gives personalized tips on your budget.",
    highlights: [
      "Dual OCR pipeline: Veryfi cloud API for production speed, Tesseract local fallback so receipt scanning always works offline",
      "AI-powered receipt parsing via DeepSeek R1 extracts amount, vendor, date, and category from raw OCR text",
      "ML keyword classifier trained on your data — auto-categorization gets smarter the more you use it",
      "AI spending insights: a DeepSeek-powered finance coach analyzes your transactions and gives actionable advice",
      "Interactive Chart.js dashboards: category breakdown, monthly trends, and daily spending patterns",
      "Drag-and-drop upload, CSV export, date/category filters, dark/light theme, and mobile-friendly sidebar",
    ],
    tech: [
      "Flask",
      "Python",
      "JavaScript",
      "SQLite",
      "PostgreSQL",
      "Chart.js",
      "Tesseract OCR",
      "Veryfi API",
      "DeepSeek R1",
    ],
    liveUrl: "https://expensevision-ip5u.onrender.com",
    githubUrl: "https://github.com/Yogesh-VG0/ExpenseVision",
  },
  {
    title: "WeatherWise",
    tagline:
      "Command-line weather reports with styled HTML output — CS50P final project",
    featured: false,
    status: "Open Source",
    statusColor: "text-sky-400 bg-sky-500/10 border-sky-500/20",
    year: "2025",
    description:
      "A Python CLI app that fetches live weather data from OpenWeatherMap and generates a clean, styled HTML report you can open in any browser. Built as a CS50P final project with input validation and full test coverage.",
    highlights: [
      "Live weather data from OpenWeatherMap with city search and error handling",
      "Generates a styled HTML report you can save and share",
      "Input validation for graceful handling of typos and bad queries",
      "Fully tested with automated unit tests",
    ],
    tech: ["Python", "OpenWeatherMap API", "HTML/CSS", "unittest"],
    githubUrl: "https://github.com/Yogesh-VG0/weather-dashboard",
  },
];

/* ------------------------------------------------------------------ */
/*  Unified project card                                               */
/* ------------------------------------------------------------------ */
const ProjectCard = ({
  project,
  variant,
}: {
  project: Project;
  variant: "featured" | "standard";
}) => {
  const isFeatured = variant === "featured";

  return (
    <motion.div
      variants={fadeUp}
      className={`group relative rounded-2xl border overflow-hidden transition-all duration-500 p-5 sm:p-7 md:p-9 ${
        isFeatured
          ? "bg-card/60 border-primary/15 hover:border-primary/35 hover:shadow-2xl hover:shadow-primary/5"
          : "bg-card/40 border-border/30 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/3"
      }`}
    >
      {/* Ambient glow */}
      <div
        className={`absolute -top-24 -right-24 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isFeatured ? "w-48 h-48 bg-primary/5" : "w-32 h-32 bg-primary/4"
        }`}
      />
      <div
        className={`absolute -bottom-24 -left-24 rounded-full blur-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
          isFeatured ? "w-48 h-48 bg-primary/3" : "w-32 h-32 bg-primary/3"
        }`}
      />

      {/* Featured ribbon */}
      {isFeatured && (
        <div className="absolute -top-px -right-px">
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
          {project.metrics.map((m) => (
            <div
              key={m.label}
              className="flex items-center gap-1.5 text-xs font-mono px-2.5 py-1.5 rounded-lg bg-background/50 border border-border/20 text-muted-foreground/70"
            >
              <span className="text-primary/70">{m.icon}</span>
              <span className="font-semibold text-foreground/80">
                {m.value}
              </span>
              <span className="text-muted-foreground/50">{m.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Highlights — always fully visible */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5 mb-2">
        {project.highlights.map((h) => (
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
