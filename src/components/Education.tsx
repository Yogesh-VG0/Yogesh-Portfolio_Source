import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider">Education</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-10">Education & Certifications</h3>

          <div className="space-y-6">
            <div className="glass-card rounded-xl p-6 md:p-8 flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <GraduationCap size={18} className="text-primary" />
              </div>
              <div>
                <h4 className="text-lg font-bold text-foreground">
                  Bachelor's in Computer Science
                </h4>
                <p className="text-sm text-muted-foreground">
                  Manipal Academy of Higher Education, Dubai
                </p>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <Award size={18} className="text-primary" />
                </div>
                <h4 className="text-lg font-bold text-foreground mt-1">Certifications</h4>
              </div>
              <ul className="ml-14 space-y-2">
                {[
                  "CS50X — Introduction to Computer Science (Harvard)",
                  "CS50P — Introduction to Programming with Python (Harvard)",
                  "AWS Cloud Practitioner Essentials",
                ].map((cert) => (
                  <li
                    key={cert}
                    className="text-sm text-muted-foreground flex items-start gap-2"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary mt-2 flex-shrink-0" />
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
