import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
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
  BarChart3,
  ScanLine,
  Radio,
  FileCode,
  Boxes,
} from "lucide-react";
import { fadeUp, scaleUp, staggerContainer } from "@/lib/motion";

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */
const skillIcons: Record<string, React.ReactNode> = {
  "React.js": <Code2 size={15} />,
  "Next.js": <Boxes size={15} />,
  "TypeScript": <FileCode size={15} />,
  "JavaScript": <FileJson size={15} />,
  "HTML": <Globe size={15} />,
  "CSS": <Layout size={15} />,
  "Tailwind": <Zap size={15} />,
  "Node.js": <Server size={15} />,
  "Express.js": <Server size={15} />,
  "Flask": <Cpu size={15} />,
  "FastAPI": <Zap size={15} />,
  "MongoDB": <Database size={15} />,
  "SQL": <Database size={15} />,
  "Machine Learning": <Brain size={15} />,
  "OCR": <ScanLine size={15} />,
  "Real-time Data": <Radio size={15} />,
  "Analytics Dashboards": <BarChart3 size={15} />,
  "Git": <GitBranch size={15} />,
  "REST APIs": <Globe size={15} />,
  "WebSockets": <Radio size={15} />,
};

const categoryMeta: Record<string, {
  icon: React.ReactNode;
  color: string;
  glowFrom: string;
  glowTo: string;
  iconBg: string;
  borderGlow: string;
}> = {
  Frontend: {
    icon: <Layout size={22} />,
    color: "text-blue-400",
    glowFrom: "from-blue-500/20",
    glowTo: "to-cyan-500/20",
    iconBg: "bg-blue-500/15 shadow-blue-500/20",
    borderGlow: "hover:shadow-blue-500/15",
  },
  Backend: {
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
  "AI & Data": {
    icon: <Brain size={22} />,
    color: "text-purple-400",
    glowFrom: "from-purple-500/20",
    glowTo: "to-pink-500/20",
    iconBg: "bg-purple-500/15 shadow-purple-500/20",
    borderGlow: "hover:shadow-purple-500/15",
  },
  Tools: {
    icon: <Wrench size={22} />,
    color: "text-sky-400",
    glowFrom: "from-sky-500/20",
    glowTo: "to-indigo-500/20",
    iconBg: "bg-sky-500/15 shadow-sky-500/20",
    borderGlow: "hover:shadow-sky-500/15",
  },
};

const skillGroups = [
  { title: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "Flask", "FastAPI"] },
  { title: "Databases", skills: ["MongoDB", "SQL"] },
  { title: "AI & Data", skills: ["Machine Learning", "OCR", "Real-time Data", "Analytics Dashboards"] },
  { title: "Tools", skills: ["Git", "REST APIs", "WebSockets"] },
];

/* ------------------------------------------------------------------ */
/*  3D Tilt Card (inline for Skills)                                   */
/* ------------------------------------------------------------------ */
interface TiltSkillCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltSkillCard = ({ children, className = "" }: TiltSkillCardProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Softer spring: lower stiffness + higher damping = no oscillation on leave
  const springCfg = { stiffness: 150, damping: 20, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springCfg);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springCfg);

  // Smooth scale on hover via spring
  const hoverScale = useSpring(1, springCfg);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseEnter = () => {
    hoverScale.set(1.02);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    hoverScale.set(1);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        scale: hoverScale,
        transformStyle: "preserve-3d",
        perspective: 800,
        willChange: "transform",
      }}
      className={className}
    >
      <div style={{ transform: "translateZ(16px)", transformStyle: "preserve-3d" }}>
        {children}
      </div>
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Skill Card                                                         */
/* ------------------------------------------------------------------ */
interface SkillCardProps {
  group: { title: string; skills: string[] };
  meta: (typeof categoryMeta)[string];
  inView: boolean;
}

const SkillCard = ({ group, meta, inView }: SkillCardProps) => (
  <motion.div variants={fadeUp} className="h-full">
    <TiltSkillCard
      className="group relative overflow-hidden rounded-2xl p-[1px] h-full"
    >
      {/* Animated gradient border */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${meta.glowFrom} ${meta.glowTo} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-border/30 to-border/10" />

      {/* Card body — shadow on the visible card, not the 3D wrapper */}
      <div className={`relative rounded-2xl bg-card/80 backdrop-blur-xl p-6 h-full flex flex-col min-h-[14rem] transition-shadow duration-500 group-hover:shadow-2xl ${meta.borderGlow}`}>
        {/* Floating corner glow */}
        <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br ${meta.glowFrom} ${meta.glowTo} pointer-events-none`} />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6 relative z-10">
          <motion.div
            className={`w-11 h-11 rounded-xl ${meta.iconBg} shadow-lg flex items-center justify-center ${meta.color}`}
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.5 }}
            style={{ transform: "translateZ(12px)" }}
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
              whileHover={{
                scale: 1.08,
                y: -2,
                transition: { type: "spring", stiffness: 400, damping: 15 },
              }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg border cursor-default transition-all duration-300
                bg-background/40 text-foreground border-border/30
                hover:border-primary/40 hover:bg-primary/10 hover:shadow-md hover:shadow-primary/5
                active:scale-95`}
              style={{ transform: "translateZ(4px)" }}
            >
              <span className={`${meta.color} transition-transform duration-200 group-hover:rotate-12`}>
                {skillIcons[skill]}
              </span>
              {skill}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </TiltSkillCard>
  </motion.div>
);

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="skills" className="section-padding relative overflow-hidden">
      {/* Ambient background orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="text-center mb-14">
            <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">Skills</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Technologies I work with
            </h2>
            <div className="mx-auto w-16 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
          </motion.div>

          {/* Responsive grid — 6-col on lg for precise centering */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5 lg:gap-6">
            {skillGroups.map((group, idx) => {
              const meta = categoryMeta[group.title];
              // lg: top 3 → span 2 each; bottom 2 → span 2, offset to center
              const lgSpan =
                idx < 3
                  ? "lg:col-span-2"
                  : idx === 3
                    ? "lg:col-span-2 lg:col-start-2"
                    : "lg:col-span-2 lg:col-start-4";
              // sm: 5th card centers via spanning full width with constrained max-w
              const smCenter =
                idx === 4
                  ? "sm:col-span-2 sm:max-w-[calc(50%-0.625rem)] sm:justify-self-center lg:col-span-2 lg:max-w-none"
                  : "";
              return (
                <div key={group.title} className={`${lgSpan} ${smCenter}`}>
                  <SkillCard group={group} meta={meta} inView={inView} />
                </div>
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
