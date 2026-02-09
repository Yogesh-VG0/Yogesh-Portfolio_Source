import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-3xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-sm font-mono text-primary mb-3 tracking-wider">About</h2>
          <h3 className="text-3xl md:text-4xl font-bold mb-6">A bit about me</h3>
          <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
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
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
