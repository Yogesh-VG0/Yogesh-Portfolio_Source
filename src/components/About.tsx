import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Code2, GraduationCap } from "lucide-react";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/motion";
import SectionHeader from "./SectionHeader";

const highlights = [
  { icon: <MapPin size={18} />, label: "Dubai, UAE" },
  { icon: <Briefcase size={18} />, label: "Full-Stack Developer" },
  { icon: <Code2 size={18} />, label: "React · Python · Node" },
  { icon: <GraduationCap size={18} />, label: "CS (Manipal University)" },
];

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          ref={ref}
          variants={staggerContainer()}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <SectionHeader label="About" title="A bit about me" />

          {/* Quick stats pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {highlights.map((h) => (
              <motion.span
                key={h.label}
                variants={scaleUp}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-sm text-muted-foreground"
              >
                <span className="text-primary">{h.icon}</span>
                {h.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio text */}
          <motion.div variants={fadeUp} className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
            <p>
              I'm a Full-Stack Developer who loves building things that work end-to-end —
              from data pipelines that process 100 stocks daily to polished React
              dashboards that make complex data feel simple. My sweet spot is where
              engineering meets product thinking.
            </p>
            <p>
              With hands-on experience in remote, agile teams and a CS degree from
              Manipal University Dubai, I've shipped production apps using React,
              Python, Node.js, and machine learning. I'm always picking up new
              tools — recently diving deeper into AI/ML and real-time systems.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
