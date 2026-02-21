import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Briefcase, Code2, Coffee } from "lucide-react";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/motion";

const highlights = [
  { icon: <MapPin size={18} />, label: "Dubai, UAE" },
  { icon: <Briefcase size={18} />, label: "Full-Stack Dev" },
  { icon: <Code2 size={18} />, label: "React · Python · Node" },
  { icon: <Coffee size={18} />, label: "Always Learning" },
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
          {/* Section header */}
          <motion.div variants={fadeUp} className="mb-10">
            <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">About</p>
            <h2 className="text-3xl md:text-4xl font-bold mb-3">A bit about me</h2>
            <div className="section-ornament" />
          </motion.div>

          {/* Quick stats pills */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-8">
            {highlights.map((h, i) => (
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
              Motivated Junior Full-Stack Developer with hands-on experience building
              dashboards, analytics platforms, and real-world web applications. I'm
              comfortable working with APIs, databases, and modern frontend frameworks.
            </p>
            <p>
              Experienced in remote, agile environments and continuously learning new
              technologies. I enjoy turning complex problems into clean, intuitive
              interfaces that make an impact.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
