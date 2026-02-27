import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Award } from "lucide-react";
import { fadeUp, staggerContainer, hoverLift } from "@/lib/motion";
import SectionHeader from "./SectionHeader";

const certifications = [
  { name: "CS50X — Introduction to Computer Science", issuer: "Harvard", year: "2024" },
  { name: "CS50P — Introduction to Programming with Python", issuer: "Harvard", year: "2024" },
  { name: "AWS Cloud Practitioner Essentials", issuer: "AWS", year: "2024" },
];

const Education = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="education" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          variants={staggerContainer(0.1)}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader label="Education" title="Education & Certifications" />

          <div className="grid gap-5 md:grid-cols-2">
            {/* Degree card */}
            <motion.div variants={fadeUp} whileHover={hoverLift} className="glass-card-hover rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={20} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">Bachelor's in Computer Science</h3>
                  <p className="text-sm text-muted-foreground mt-1">Manipal Academy of Higher Education, Dubai</p>
                  <p className="text-xs font-mono text-muted-foreground/60 mt-0.5">2022 – 2026</p>
                </div>
              </div>
            </motion.div>

            {/* Certifications card */}
            <motion.div variants={fadeUp} whileHover={hoverLift} className="glass-card-hover rounded-2xl p-6 md:p-8">
              <div className="flex items-start gap-4 mb-5">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Award size={20} className="text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mt-1.5">Certifications</h3>
              </div>
              <ul className="space-y-3 pl-1">
                {certifications.map((cert) => (
                  <li key={cert.name} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                    <span>
                      {cert.name}
                      <span className="text-xs text-primary/70 ml-1">({cert.issuer}, {cert.year})</span>
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;
