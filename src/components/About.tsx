import { motion, useInView } from "framer-motion";
import { useRef, useState, useCallback, cloneElement } from "react";
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

/** Keep only the latest N months of contribution data */
const filterLastMonths = (data: Activity[], months: number): Activity[] => {
  const today = new Date();
  const cutoff = new Date(today.getFullYear(), today.getMonth() - months, today.getDate());
  const cutoffStr = cutoff.toISOString().slice(0, 10);
  return data.filter((d) => d.date >= cutoffStr);
};

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

  // Interactive tooltip state
  const [selectedActivity, setSelectedActivity] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleBlockClick = useCallback((activity: Activity) => {
    return (e: React.MouseEvent | React.TouchEvent) => {
      e.stopPropagation();
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;

      let clientX: number, clientY: number;
      if ("changedTouches" in e && e.changedTouches.length) {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      } else {
        return;
      }

      setSelectedActivity({
        date: activity.date,
        count: activity.count,
        x: clientX - rect.left,
        y: clientY - rect.top,
      });
    };
  }, []);

  // Close tooltip when clicking outside
  const handleContainerClick = useCallback(() => {
    setSelectedActivity(null);
  }, []);

  // On mobile show only ~5 months of data
  const transformData = useCallback(
    (data: Activity[]) => (isMobile ? filterLastMonths(data, 6) : data),
    [isMobile]
  );

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
              I'm a full-stack developer based in Dubai with a background in Computer Science from Manipal University Dubai.
              I've built and deployed production applications using React, Python, and Node, including a machine learning
              pipeline that processes 100+ S&P stocks daily and presents the results through an interactive dashboard.
            </p>
            <p>
              My work spans the full stack: designing APIs with FastAPI and Express, working with PostgreSQL and MongoDB,
              setting up CI/CD with GitHub Actions, and deploying apps to Vercel and Render.
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
              <div className="mb-3">
                <h3 className="text-sm font-semibold">GitHub activity</h3>
              </div>
              <div className="overflow-x-auto scrollbar-hide sm:flex sm:justify-center">
                <div className="w-full sm:w-auto">
                  <GitHubCalendar
                    username="Yogesh-VG0"
                    blockSize={isMobile ? 10 : 11}
                    blockMargin={isMobile ? 2 : 3}
                    fontSize={11}
                    colorScheme={isDark ? "dark" : "light"}
                    transformData={transformData}
                    renderBlock={(block, activity) =>
                      cloneElement(block, {
                        onClick: handleBlockClick(activity as unknown as Activity),
                        onTouchEnd: handleBlockClick(activity as unknown as Activity),
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
                  />
                </div>
              </div>

              {/* Interactive tooltip — rendered outside overflow container to avoid clipping */}
              {selectedActivity && (
                <div
                  className="absolute z-20 px-3 py-2 rounded-lg text-xs font-mono shadow-lg border pointer-events-none
                    bg-card border-border/50 text-foreground"
                  style={{
                    left: Math.min(
                      Math.max(8, selectedActivity.x),
                      (containerRef.current?.clientWidth ?? 300) - 160
                    ),
                    top: selectedActivity.y - 50,
                    minWidth: 140,
                  }}
                >
                  <span className="font-bold text-primary">{selectedActivity.count}</span>
                  {" "}contribution{selectedActivity.count !== 1 ? "s" : ""} on{" "}
                  <span className="text-muted-foreground">{formatDate(selectedActivity.date)}</span>
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
