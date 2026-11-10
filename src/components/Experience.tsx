import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { staggerContainer, slideInLeft } from "@/lib/motion";
import { experiences } from "@/data/experience";
import SectionHeader from "./SectionHeader";

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
          <SectionHeader label="Experience" title="Where I've worked" />

          {/* Timeline */}
          <ol className="relative before:absolute before:left-5 before:inset-y-0 before:w-px before:bg-border/60 before:hidden sm:before:block">
            {experiences.map((exp) => (
              <motion.li
                key={exp.company}
                variants={slideInLeft}
                className="relative sm:pl-14 mb-8 last:mb-0"
              >
                {/* Timeline dot */}
                <div className="absolute left-3 top-1 w-5 h-5 rounded-full bg-primary/20 border-2 border-primary hidden sm:flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>

                <article className="rounded-2xl border border-border/50 bg-card/40 p-5 sm:p-6 md:p-8">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 mb-5">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold leading-snug text-foreground">{exp.role}</h3>
                      <p className="mt-1 text-sm text-primary font-medium">{exp.company}</p>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-foreground/65"><MapPin size={12} aria-hidden="true" />{exp.location}</p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-1.5 text-xs font-mono text-foreground/72 bg-secondary/60 px-3 py-1.5 rounded-full border border-border/30 self-start">
                      <Calendar size={12} aria-hidden="true" />
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-4 sm:space-y-2.5">
                    {exp.points.map((point) => (
                      <li key={point} className="text-[15px] leading-7 sm:text-sm sm:leading-relaxed text-foreground/80 flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 border-t border-border/40 pt-4 text-xs leading-relaxed text-foreground/65">{exp.skills.join(" · ")}</p>
                </article>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
