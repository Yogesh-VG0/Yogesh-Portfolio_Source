import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Play, ExternalLink, Github, ArrowUpRight } from "lucide-react";
import { fadeUp, staggerContainer, hoverLift, tapScale } from "@/lib/motion";

const projects = [
  {
    title: "StockPredict AI",
    featured: true,
    description:
      "A full-stack stock analytics and prediction platform for S&P 100 companies with interactive charts and ML-powered forecasting.",
    highlights: [
      "Interactive TradingView charts",
      "Real-time market data via WebSockets",
      "ML models: LSTM, XGBoost, LightGBM",
      "Clean dashboard UI with animations",
    ],
    tech: ["Next.js", "React", "TypeScript", "Node.js", "FastAPI", "MongoDB", "Tailwind"],
    liveUrl: "https://stock-predict-ai.vercel.app",
    githubUrl: "https://github.com/Yogesh-VG0/Stock_Predict_Ai",
  },
  {
    title: "ExpenseVision",
    featured: false,
    description:
      "Expense tracking web app with OCR-based receipt scanning and analytics dashboards.",
    highlights: [
      "OCR-based receipt extraction",
      "Secure authentication",
      "Expense analytics with charts",
    ],
    tech: ["Flask", "JavaScript", "HTML/CSS", "Chart.js", "Tesseract OCR"],
    liveUrl: "https://expensevision-ip5u.onrender.com",
    githubUrl: "https://github.com/Yogesh-VG0/ExpenseVision",
  },
  {
    title: "WeatherWise",
    featured: false,
    description:
      "A command-line weather application built as a CS50P final project. Fetches real-time weather data from the OpenWeatherMap API and displays it in a clean terminal output, with optional styled HTML report generation.",
    highlights: [
      "Real-time weather data via OpenWeatherMap API",
      "Input validation with regex",
      "Styled HTML report generation",
      "Testable code with unittest.mock",
    ],
    tech: ["Python", "OpenWeatherMap API", "HTML/CSS", "unittest"],
    githubUrl: "https://github.com/Yogesh-VG0/weather-dashboard",
  },
];

const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

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

          <div className="space-y-6">
            {projects.map((project) => (
              <motion.div
                key={project.title}
                variants={fadeUp}
                whileHover={hoverLift}
                className={`group relative rounded-2xl border backdrop-blur-sm p-6 md:p-8 transition-all duration-300 ${
                  project.featured
                    ? "bg-card/60 border-primary/20 glow-sm hover:border-primary/40 hover:shadow-xl"
                    : "bg-card/40 border-border/40 hover:border-primary/25 hover:shadow-lg"
                }`}
              >
                {/* Featured ribbon */}
                {project.featured && (
                  <div className="absolute -top-px -right-px">
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-bl-xl rounded-tr-2xl bg-primary/10 border-b border-l border-primary/20 text-xs font-mono text-primary">
                      <Star size={11} fill="currentColor" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Top row: title + links */}
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>

                  <div className="flex items-center gap-2 ml-4 flex-shrink-0">
                    {project.liveUrl && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={tapScale}
                        className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
                        title="View Live"
                        aria-label={`Live demo of ${project.title}`}
                      >
                        <ArrowUpRight size={15} />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        whileTap={tapScale}
                        className="w-8 h-8 rounded-lg bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                        title="Source Code"
                        aria-label={`GitHub repo of ${project.title}`}
                      >
                        <Github size={15} />
                      </motion.a>
                    )}
                  </div>
                </div>

                <p className="text-muted-foreground mb-5 leading-relaxed text-sm md:text-base">
                  {project.description}
                </p>

                {/* Highlights */}
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 mb-6">
                  {project.highlights.map((h) => (
                    <li key={h} className="text-sm text-muted-foreground flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                      {h}
                    </li>
                  ))}
                </ul>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary/60 text-muted-foreground border border-border/30"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
