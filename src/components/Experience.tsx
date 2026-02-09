import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider">Experience</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-10">Where I've worked</h3>

          <div className="glass-card rounded-xl p-6 md:p-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Briefcase size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Full-Stack Developer Intern
                </h4>
                <p className="text-sm text-primary font-mono mb-1">SmallCap.Ai · Remote, London</p>
                <ul className="mt-4 space-y-2">
                  {[
                    "Built production dashboards used by admins and end users",
                    "Integrated REST APIs to connect frontend with backend services",
                    "Improved UI/UX and overall application performance",
                    "Collaborated in agile workflows with cross-functional teams",
                  ].map((point) => (
                    <li
                      key={point}
                      className="text-sm text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
