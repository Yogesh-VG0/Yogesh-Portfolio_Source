import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar } from "lucide-react";
import { fadeUp, staggerContainer, slideInLeft } from "@/lib/motion";

const experiences = [
  {
    role: "Full-Stack Developer Intern",
    company: "SmallCap.Ai",
    location: "Remote, London",
    period: "2024",
    points: [
      "Built production dashboards used by admins and end users",
      "Integrated REST APIs to connect frontend with backend services",
      "Improved UI/UX and overall application performance",
      "Collaborated in agile workflows with cross-functional teams",
    ],
  },
];

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-12">
            <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">Experience</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Where I've worked</h2>
            <div className="section-ornament" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-5 top-0 bottom-0 w-px bg-border/60 hidden sm:block" />

            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company}
                variants={slideInLeft}
                className="relative sm:pl-14 mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary hidden sm:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                <div className="glass-card-hover rounded-2xl p-6 md:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-foreground">{exp.role}</h3>
                      <p className="text-sm text-primary font-mono">{exp.company} · {exp.location}</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-secondary/60 px-3 py-1 rounded-full border border-border/30 self-start">
                      <Calendar size={12} />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2.5">
                    {exp.points.map((point) => (
                      <li key={point} className="text-sm text-muted-foreground flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
