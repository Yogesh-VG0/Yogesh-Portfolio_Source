import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Layout,
  Server,
  Database,
  Brain,
  Wrench,
  Code2,
  FileJson,
  Globe,
  Cpu,
  GitBranch,
  Zap,
  ScanLine,
  Radio,
  FileCode,
  Terminal,
  Cloud,
  Sparkles,
  TrendingUp,
  Search,
  Workflow,
} from "lucide-react";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/motion";
import { skillGroups } from "@/data/skills";
import SectionHeader from "./SectionHeader";
import { useIsMobile } from "@/hooks/use-mobile";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const skillIcons: Record<string, React.ReactNode> = {
  "TypeScript": <FileCode size={15} />,
  "JavaScript": <FileJson size={15} />,
  "Python": <Cpu size={15} />,
  "React.js": <Code2 size={15} />,
  "Next.js": <Globe size={15} />,
  "Tailwind": <Zap size={15} />,
  "HTML": <Globe size={15} />,
  "CSS": <Layout size={15} />,
  "Node.js": <Server size={15} />,
  "Express.js": <FileCode size={15} />,
  "FastAPI": <Zap size={15} />,
  "Flask": <Cpu size={15} />,
  "REST APIs": <Globe size={15} />,
  "WebSockets": <Radio size={15} />,
  "PostgreSQL": <Database size={15} />,
  "MongoDB": <Database size={15} />,
  "SQL": <Database size={15} />,
  "SQLite": <Database size={15} />,
  "Machine Learning": <Brain size={15} />,
  "LightGBM": <TrendingUp size={15} />,
  "SHAP": <Search size={15} />,
  "OCR": <ScanLine size={15} />,
  "LLM Integration": <Sparkles size={15} />,
  "Git": <GitBranch size={15} />,
  "Linux": <Terminal size={15} />,
  "GitHub Actions": <Workflow size={15} />,
  "Vercel": <Cloud size={15} />,
  "Render": <Cloud size={15} />,
};

const categoryMeta: Record<string, {
  icon: React.ReactNode;
  color: string;
  glowFrom: string;
  glowTo: string;
  iconBg: string;
  borderGlow: string;
}> = {
  Languages: {
    icon: <FileCode size={22} />,
    color: "text-amber-400",
    glowFrom: "from-amber-500/20",
    glowTo: "to-yellow-500/20",
    iconBg: "bg-amber-500/15 shadow-amber-500/20",
    borderGlow: "hover:shadow-amber-500/15",
  },
  Frontend: {
    icon: <Layout size={22} />,
    color: "text-blue-400",
    glowFrom: "from-blue-500/20",
    glowTo: "to-cyan-500/20",
    iconBg: "bg-blue-500/15 shadow-blue-500/20",
    borderGlow: "hover:shadow-blue-500/15",
  },
  "Backend & APIs": {
    icon: <Server size={22} />,
    color: "text-emerald-400",
    glowFrom: "from-emerald-500/20",
    glowTo: "to-green-500/20",
    iconBg: "bg-emerald-500/15 shadow-emerald-500/20",
    borderGlow: "hover:shadow-emerald-500/15",
  },
  Databases: {
    icon: <Database size={22} />,
    color: "text-orange-400",
    glowFrom: "from-orange-500/20",
    glowTo: "to-amber-500/20",
    iconBg: "bg-orange-500/15 shadow-orange-500/20",
    borderGlow: "hover:shadow-orange-500/15",
  },
  "ML & AI": {
    icon: <Brain size={22} />,
    color: "text-purple-400",
    glowFrom: "from-purple-500/20",
    glowTo: "to-pink-500/20",
    iconBg: "bg-purple-500/15 shadow-purple-500/20",
    borderGlow: "hover:shadow-purple-500/15",
  },
  "DevOps & Tools": {
    icon: <Wrench size={22} />,
    color: "text-sky-400",
    glowFrom: "from-sky-500/20",
    glowTo: "to-indigo-500/20",
    iconBg: "bg-sky-500/15 shadow-sky-500/20",
    borderGlow: "hover:shadow-sky-500/15",
  },
};



/* ------------------------------------------------------------------ */
/*  Skill Card (spotlight effect like Projects)                         */
/* ------------------------------------------------------------------ */
interface SkillCardProps {
  group: { title: string; skills: string[] };
  meta: (typeof categoryMeta)[string];
  inView: boolean;
  isMobile: boolean;
}

const SkillCard = ({ group, meta, inView, isMobile }: SkillCardProps) => {
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
      onMouseMove={isMobile ? undefined : handleMouseMove}
      onMouseLeave={isMobile ? undefined : handleMouseLeave}
      whileTap={isMobile ? { scale: 0.98 } : undefined}
      className={`group relative overflow-hidden rounded-2xl border h-full transition-all duration-500
        bg-card/60 border-border/30 hover:border-primary/20 hover:shadow-xl ${meta.borderGlow}`}
    >
      {/* Cursor-following spotlight (desktop only) */}
      {!isMobile && (
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
          style={{
            opacity: spotlight.visible ? 1 : 0,
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, hsl(217 91% 60% / 0.06), transparent 40%)`,
          }}
        />
      )}

      {/* Floating corner glow */}
      <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br ${meta.glowFrom} ${meta.glowTo} pointer-events-none`} />

      <div className="relative p-6 h-full flex flex-col min-h-[14rem]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <motion.div
            className={`w-11 h-11 rounded-xl ${meta.iconBg} shadow-lg flex items-center justify-center ${meta.color}`}
            whileHover={isMobile ? undefined : { rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
          >
            {meta.icon}
          </motion.div>
          <div>
            <h3 className="text-base font-bold text-foreground">{group.title}</h3>
            <p className="text-[11px] font-mono text-muted-foreground/60">
              {group.skills.length} {group.skills.length === 1 ? "skill" : "skills"}
            </p>
          </div>
        </div>

        {/* Skill chips */}
        <motion.div
          className="flex flex-wrap gap-2 relative z-10"
          variants={staggerContainer(0.04)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {group.skills.map((skill) => (
            <motion.span
              key={skill}
              variants={scaleUp}
              whileHover={isMobile ? undefined : {
                scale: 1.08,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border cursor-default transition-all duration-300
                bg-background/40 text-foreground border-border/30
                hover:border-primary/40 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/5
                active:scale-95`}
            >
              <span className={`${meta.color}`}>
                {skillIcons[skill]}
              </span>
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isMobile = useIsMobile();

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto max-w-6xl relative">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader label="Skills" title="Technologies I work with" align="center" />

          {/* 3x2 grid on desktop, 2-col on tablet, 1-col on mobile */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
            {skillGroups.map((group) => {
              const meta = categoryMeta[group.title];
              return (
                <SkillCard
                  key={group.title}
                  group={group}
                  meta={meta}
                  inView={inView}
                  isMobile={isMobile}
                />
              );
            })}
          </div>

          {/* Total skills count */}
          <motion.p
            variants={fadeUp}
            className="text-center mt-10 text-sm text-muted-foreground/50 font-mono"
          >
            {skillGroups.reduce((acc, g) => acc + g.skills.length, 0)}+ technologies & counting
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
