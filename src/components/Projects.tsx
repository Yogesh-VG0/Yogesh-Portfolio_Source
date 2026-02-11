import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Star, Play, ExternalLink, Github } from "lucide-react";
import TiltCard from "./TiltCard";

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
      "Expense tracking web app with receipt OCR (Veryfi API), persistent Supabase DB, and responsive dashboards. Deployed on Render.",
    highlights: [
      "Receipt OCR via Veryfi API (line items → description)",
      "Supabase PostgreSQL for persistent storage",
      "Secure auth, analytics with Chart.js",
      "Responsive layout, AED currency, CSV export",
    ],
    tech: ["Flask", "JavaScript", "HTML/CSS", "Chart.js", "Supabase", "Veryfi API", "Render"],
    liveUrl: "https://expensevision-jt5v.onrender.com",
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
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider">Projects</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-10">Featured work</h3>

          <div className="space-y-6">
            {projects.map((project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <TiltCard
                  className={`glass-card rounded-xl p-6 md:p-8 group hover:border-primary/30 transition-colors ${
                    project.featured ? "glow" : ""
                  }`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 text-xs font-mono text-primary">
                            <Star size={12} fill="currentColor" />
                            Featured
                          </span>
                        )}
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-foreground">
                        {project.title}
                      </h4>
                    </div>
                    
                    {/* Project Links */}
                    <div className="flex items-center gap-3">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1"
                          title="View Live Demo"
                        >
                          <ExternalLink size={16} />
                          <span className="text-xs font-mono hidden sm:inline">Live</span>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          title="View Source Code"
                        >
                          <Github size={16} />
                          <span className="text-xs font-mono hidden sm:inline">Code</span>
                        </a>
                      )}
                      {project.videoUrl && (
                        <a
                          href={project.videoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1"
                          title="Watch Demo"
                        >
                          <Play size={16} />
                          <span className="text-xs font-mono hidden sm:inline">Demo</span>
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-muted-foreground mb-5 leading-relaxed">
                    {project.description}
                  </p>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                    {project.highlights.map((h) => (
                      <li
                        key={h}
                        className="text-sm text-muted-foreground flex items-start gap-2"
                      >
                        <span className="text-primary mt-1.5 block w-1 h-1 rounded-full bg-primary flex-shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
