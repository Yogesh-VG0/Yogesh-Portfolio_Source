import { useRef, useState, useCallback, cloneElement, useEffect } from "react";
import { useTheme } from "next-themes";
import { GitHubCalendar, type Activity } from "react-github-calendar";
import { useIsMobile } from "@/hooks/use-mobile";

/** Format a date string like "Mon, Jan 15" */
const formatDate = (dateStr: string) => {
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });
};

export default function GitHubActivity() {
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
            <div
              ref={containerRef}
              className="relative rounded-2xl border border-border/30 bg-card/30 backdrop-blur-sm p-4 sm:p-5"
              onClick={handleContainerClick}
            >
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-base font-semibold">GitHub activity</h3>
                <a href="https://github.com/Yogesh-VG0" target="_blank" rel="noopener noreferrer" className="text-sm text-primary underline-offset-4 hover:underline">View on GitHub</a>
              </div>
              <p className="mb-3 text-xs leading-relaxed text-foreground/65 lg:hidden">Scroll or swipe the chart to explore the full year.</p>
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
  );
}
