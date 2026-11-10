import { motion, useInView } from "framer-motion";
import { lazy, Suspense, useRef } from "react";
import { MapPin, Briefcase, Code2, GraduationCap } from "lucide-react";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/motion";
import SectionHeader from "./SectionHeader";
import GitHubActivityFallback from "./GitHubActivityFallback";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import { locations } from "@/data/locations";
import { education } from "@/data/profile";

const GitHubActivity = lazy(() => import("./GitHubActivity"));
const highlights = [
  { icon: <Briefcase size={18} />, label: "Full-Stack Developer" },
  { icon: <Code2 size={18} />, label: "React · Python · Node" },
  { icon: <GraduationCap size={18} />, label: "B.Tech. · Computer Science" },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { region, status } = useVisitorRegion();
  const location = status === "loading" ? null : locations[region];
  const profileHighlights = [{ icon: <MapPin size={18} />, label: location?.label ?? "India & UAE" }, ...highlights];
  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto max-w-4xl">
        <motion.div ref={ref} variants={staggerContainer()} initial="hidden" animate={inView ? "visible" : "hidden"}>
          <SectionHeader label="About" title="A bit about me" />
          <motion.div variants={fadeUp} className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 mb-8 sm:flex sm:flex-wrap">
            {profileHighlights.map((h, index) => <motion.span key={index} variants={scaleUp} data-nosnippet={index === 0 ? "" : undefined} className="inline-flex min-w-0 items-center gap-2 px-3 py-3 rounded-xl sm:rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-[13px] leading-relaxed sm:text-sm text-foreground/76">
              <span className="shrink-0 text-primary" aria-hidden="true">{h.icon}</span>{h.label}
            </motion.span>)}
          </motion.div>
          <motion.div variants={fadeUp} className="space-y-5 text-foreground/82 leading-7 text-base md:text-lg md:leading-relaxed">
            <p>I'm a full-stack developer{location && <span data-nosnippet> based in {location.basedIn}</span>} with a {education.degree} from {education.institution}. I've built and deployed applications using React, Python, and Node.js, including a stock analytics platform for 75 US companies and an expense tracker with AI receipt scanning.</p>
            <p>I work on APIs with FastAPI and Express, databases with PostgreSQL and MongoDB, and deployments with GitHub Actions, Vercel, and Render. At TechMagic Technologies, I also built WordPress and Elementor websites, worked on technical SEO, and deployed updates through cPanel.</p>
          </motion.div>
          <motion.div variants={fadeUp} className="mt-10 min-h-60">
            {inView ? <Suspense fallback={<GitHubActivityFallback />}><GitHubActivity /></Suspense> : <GitHubActivityFallback />}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
