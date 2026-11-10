import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, cloneElement, useEffect } from "react";
import { MapPin, Briefcase, Code2, GraduationCap } from "lucide-react";
import { fadeUp, staggerContainer, scaleUp } from "@/lib/motion";
import SectionHeader from "./SectionHeader";
import { useTheme } from "next-themes";
import { GitHubCalendar } from "react-github-calendar";
import type { Activity } from "react-github-calendar";
import { useIsMobile } from "@/hooks/use-mobile";

const highlights = [
  { icon: <MapPin size={18} />, label: "Dubai, UAE" },
  { icon: <Briefcase size={18} />, label: "Full-Stack Developer" },
  { icon: <Code2 size={18} />, label: "React · Python · Node" },
  { icon: <GraduationCap size={18} />, label: "CS (Manipal University)" },
];

/** Format a date string like "Mon, Jan 15" */
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

const About = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const isMobile = useIsMobile();
  const [calendarMounted, setCalendarMounted] = useState(false);
  useEffect(() => { setCalendarMounted(true); }, []);

  // Interactive tooltip state
  const [selectedActivity, setSelectedActivity] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlockClick = useCallback((activity: Activity) => {
    return (e: React.MouseEvent) => {
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      setSelectedActivity({
        date: activity.date,
        count: activity.count,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };
  }, []);

  // Close tooltip when clicking outside
  const handleContainerClick = useCallback(() => {
    setSelectedActivity(null);
  }, []);

  const prepareCalendar = useCallback((calendar: HTMLElement | null) => {
    if (!calendar) return;
    const scroller = calendar.querySelector<HTMLElement>(".react-activity-calendar__scroll-container");
    if (scroller) {
      scroller.tabIndex = 0;
      scroller.setAttribute("role", "region");
      scroller.setAttribute("aria-label", "GitHub contribution calendar, scroll horizontally to explore the full year");
      scroller.scrollLeft = scroller.scrollWidth;
    }
    const graph = calendar.querySelector(".react-activity-calendar__calendar");
    graph?.setAttribute("role", "img");
    graph?.setAttribute("aria-label", "Daily GitHub contributions over the last year");
  }, []);

  useEffect(() => {
    if (!selectedActivity) return;

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Node)) return;

      if (!containerRef.current?.contains(target)) {
        setSelectedActivity(null);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedActivity(null);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedActivity]);

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
          <motion.div variants={fadeUp} className="grid grid-cols-1 min-[380px]:grid-cols-2 gap-3 mb-8 sm:flex sm:flex-wrap">
            {highlights.map((h) => (
              <motion.span
                key={h.label}
                variants={scaleUp}
                className="inline-flex min-w-0 items-center gap-2 px-3 py-3 rounded-xl sm:rounded-full border border-border/50 bg-card/40 backdrop-blur-sm text-[13px] leading-relaxed sm:text-sm text-foreground/76"
              >
                <span className="shrink-0 text-primary" aria-hidden="true">{h.icon}</span>
                {h.label}
              </motion.span>
            ))}
          </motion.div>

          {/* Bio text */}
          <motion.div variants={fadeUp} className="space-y-5 text-foreground/82 leading-7 text-base md:text-lg md:leading-relaxed">
            <p>
              I'm a full-stack developer based in Dubai with a background in Computer Science from Manipal University Dubai.
              I've built and deployed applications using React, Python, and Node.js, including a stock analytics platform
              for 75 US companies and an expense tracker with AI receipt scanning.
            </p>
            <p>
              My work spans the full stack: designing APIs with FastAPI and Express, working with PostgreSQL and MongoDB,
              setting up CI/CD with GitHub Actions, and deploying apps to Vercel and Render. At TechMagic Technologies,
              I also built WordPress and Elementor websites, implemented technical SEO, and managed cPanel deployments.
              I enjoy building systems that are reliable, explainable, and actually useful.
            </p>
          </motion.div>

          {/* GitHub Contribution Graph */}
          <motion.div variants={fadeUp} className="mt-10">
            <div
              ref={containerRef}
              className="relative rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-4 sm:p-5"
              onClick={handleContainerClick}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold">GitHub activity</h3>
                <a href="https://github.com/Yogesh-VG0" target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline-offset-4 hover:underline">View on GitHub</a>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-foreground/65 lg:hidden">Swipe the chart to explore the full year.</p>
              <div className="github-calendar min-w-0" onScrollCapture={() => setSelectedActivity(null)}>
                  {calendarMounted ? <GitHubCalendar
                    ref={prepareCalendar}
                    username="Yogesh-VG0"
                    errorMessage="GitHub activity is unavailable right now. You can still view it on GitHub."
                    blockSize={11}
                    blockMargin={3}
                    fontSize={12}
                    style={{ width: "100%" }}
                    showColorLegend={!isMobile}
                    renderColorLegend={(block) => cloneElement(block, { "aria-hidden": true })}
                    colorScheme={isDark ? "dark" : "light"}
                    renderBlock={(block, activity) =>
                      cloneElement(block, {
                        onClick: handleBlockClick(activity as unknown as Activity),
                        style: {
                          ...block.props.style,
                          cursor: "pointer",
                        },
                      })
                    }
                    theme={
                      isDark
                        ? { dark: ["#111", "#0d3868", "#1a5fb4", "#3b82f6", "#60a5fa"] }
                        : { light: ["#eef2ff", "#c7d2fe", "#93c5fd", "#60a5fa", "#2563eb"] }
                    }
                  /> : <div className="h-40" aria-label="GitHub contribution calendar loading" />}
              </div>

              {/* Interactive tooltip — rendered outside overflow container to avoid clipping */}
              {selectedActivity && (
                <div
                  role="tooltip"
                  className="absolute z-20 px-3 py-2 rounded-lg text-xs font-mono shadow-lg border pointer-events-none
                    w-60 max-w-[calc(100%-1rem)] leading-relaxed bg-card border-border/50 text-foreground"
                  style={{
                    left: Math.max(8, Math.min(selectedActivity.x - 120, (containerRef.current?.clientWidth ?? 300) - 248)),
                    top: Math.max(12, selectedActivity.y - 64),
                  }}
                >
                  <span className="font-bold text-primary">{selectedActivity.count}</span>
                  {" "}contribution{selectedActivity.count !== 1 ? "s" : ""} on{" "}
                  <span className="text-foreground/70">{formatDate(selectedActivity.date)}</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
