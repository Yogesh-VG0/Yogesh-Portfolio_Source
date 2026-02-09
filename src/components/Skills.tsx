import { motion, useInView } from "framer-motion";
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
  Boxes
} from "lucide-react";

// Skill icons mapping
const skillIcons: Record<string, React.ReactNode> = {
  "React.js": <Code2 size={14} />,
  "Next.js": <Boxes size={14} />,
  "TypeScript": <FileCode size={14} />,
  "JavaScript": <FileJson size={14} />,
  "HTML": <Globe size={14} />,
  "CSS": <Layout size={14} />,
  "Tailwind": <Zap size={14} />,
  "Node.js": <Server size={14} />,
  "Express.js": <Server size={14} />,
  "Flask": <Cpu size={14} />,
  "FastAPI": <Zap size={14} />,
  "MongoDB": <Database size={14} />,
  "SQL": <Database size={14} />,
  "Machine Learning": <Brain size={14} />,
  "OCR": <ScanLine size={14} />,
  "Real-time Data": <Radio size={14} />,
  "Analytics Dashboards": <BarChart3 size={14} />,
  "Git": <GitBranch size={14} />,
  "REST APIs": <Globe size={14} />,
  "WebSockets": <Radio size={14} />,
};

// Category icons
const categoryIcons: Record<string, React.ReactNode> = {
  "Frontend": <Layout size={20} />,
  "Backend": <Server size={20} />,
  "Databases": <Database size={20} />,
  "AI & Data": <Brain size={20} />,
  "Tools": <Wrench size={20} />,
};

// Category colors
const categoryColors: Record<string, string> = {
  "Frontend": "from-blue-500/20 to-cyan-500/20 border-blue-500/30",
  "Backend": "from-green-500/20 to-emerald-500/20 border-green-500/30",
  "Databases": "from-orange-500/20 to-amber-500/20 border-orange-500/30",
  "AI & Data": "from-purple-500/20 to-pink-500/20 border-purple-500/30",
  "Tools": "from-slate-500/20 to-zinc-500/20 border-slate-500/30",
};

const categoryIconColors: Record<string, string> = {
  "Frontend": "text-blue-400",
  "Backend": "text-green-400",
  "Databases": "text-orange-400",
  "AI & Data": "text-purple-400",
  "Tools": "text-slate-400",
};

const skillGroups = [
  {
    title: "Frontend",
    skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express.js", "Flask", "FastAPI"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "SQL"],
  },
  {
    title: "AI & Data",
    skills: ["Machine Learning", "OCR", "Real-time Data", "Analytics Dashboards"],
  },
  {
    title: "Tools",
    skills: ["Git", "REST APIs", "WebSockets"],
  },
];

const Skills = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider">Skills</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-10">Technologies I work with</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ 
                  duration: 0.5, 
                  delay: groupIndex * 0.1,
                  type: "spring",
                  stiffness: 100,
                }}
                className={`relative overflow-hidden rounded-xl p-6 bg-gradient-to-br ${categoryColors[group.title]} border backdrop-blur-sm hover:-translate-y-1 transition-transform duration-300`}
              >
                {/* Background glow effect */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />
                
                {/* Header with icon */}
                <div className="flex items-center gap-3 mb-5">
                  <div 
                    className={`w-10 h-10 rounded-lg bg-background/50 flex items-center justify-center ${categoryIconColors[group.title]} transition-transform duration-300 group-hover:scale-110`}
                  >
                    {categoryIcons[group.title]}
                  </div>
                  <h4 className="text-base font-semibold text-foreground">{group.title}</h4>
                </div>

                {/* Skills grid */}
                <div className="flex flex-wrap gap-2">
                  {group.skills.map((skill, skillIndex) => (
                    <motion.span
                      key={skill}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: groupIndex * 0.1 + skillIndex * 0.05 + 0.2 
                      }}
                      className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-2 rounded-lg bg-background/60 text-foreground border border-border/50 cursor-default transition-all duration-200 hover:scale-105 hover:border-primary/50 hover:bg-primary/10"
                    >
                      <span className="text-primary">{skillIcons[skill]}</span>
                      {skill}
                    </motion.span>
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

export default Skills;
