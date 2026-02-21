import * as React from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";

// PDF in public/ is served at root (or base URL when deployed)
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
const RESUME_PATH = `${BASE}/Yogesh_Resume.pdf`.replace(/\/+/g, "/");

const PDF_WORKER_URL = "https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js";

const Resume = () => {
  const isMobile = useIsMobile();

  return (
    <div className="resume-page min-h-screen w-full max-w-full overflow-x-hidden bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <motion.header
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 shrink-0 bg-background/80 backdrop-blur-xl border-b border-border/40"
      >
        <div className="w-full max-w-full flex items-center justify-between h-14 sm:h-16 px-3 sm:px-4 md:px-6">
          <motion.div variants={fadeUp} className="min-w-0">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} className="shrink-0" />
              <span className="truncate">Back to Portfolio</span>
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} className="shrink-0 flex items-center gap-2">
            {/* Open in new tab: desktop only (mobile can't embed PDF; we show in-page viewer instead) */}
            <motion.a
              href={RESUME_PATH}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={tapScale}
              className="hidden md:inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl border border-border/60 bg-card/30 backdrop-blur-md text-foreground font-medium text-sm hover:border-primary/40 transition-colors"
            >
              <ExternalLink size={15} />
              <span className="hidden sm:inline">Open in new tab</span>
            </motion.a>
            <motion.a
              href={RESUME_PATH}
              download="Yogesh_Vadivel_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 px-3 py-2 sm:px-4 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-shadow"
            >
              <Download size={15} />
              Download PDF
            </motion.a>
          </motion.div>
        </div>
      </motion.header>

      {/* Desktop: iframe. Mobile: PDF.js viewer (canvas) so PDF is viewable in-page */}
      <main className="flex-1 flex flex-col min-w-0 w-full min-h-0">
        <div className="flex-1 w-full max-w-full min-w-0 min-h-0 px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6 flex flex-col">
          <div className="resume-viewer-wrapper flex-1 w-full max-w-full min-h-0 rounded-none sm:rounded-xl border-0 sm:border border-border/30 bg-muted/30 overflow-hidden shadow-none sm:shadow-lg flex flex-col">
            {!isMobile ? (
              <>
                <iframe
                  title="Yogesh Vadivel Resume"
                  src={RESUME_PATH}
                  className="w-full flex-1 min-h-[calc(100vh-6rem)] sm:min-h-[80vh] border-0"
                  style={{ minHeight: "calc(100vh - 6rem)" }}
                />
                <p className="sr-only">
                  If the resume does not display,{" "}
                  <a href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
                    open the PDF in a new tab
                  </a>{" "}
                  or use the Download button above.
                </p>
              </>
            ) : (
              <MobilePdfViewer />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

/** Mobile-only PDF viewer using PDF.js (canvas). PageWidth = fit to container width so full page is visible left-to-right. */
function MobilePdfViewer() {
  const [Core, setCore] = React.useState<typeof import("@react-pdf-viewer/core") | null>(null);

  React.useEffect(() => {
    let cancelled = false;
    Promise.all([
      import("@react-pdf-viewer/core"),
      import("@react-pdf-viewer/core/lib/styles/index.css"),
    ]).then(([core]) => {
      if (cancelled) return;
      setCore(core);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  if (!Core) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] text-muted-foreground">
        <p className="text-sm">Loading resume…</p>
      </div>
    );
  }

  const { Worker, Viewer, SpecialZoomLevel } = Core;
  return (
    <div className="flex-1 min-h-0 flex flex-col w-full overflow-hidden resume-mobile-pdf">
      <Worker workerUrl={PDF_WORKER_URL}>
        <Viewer fileUrl={RESUME_PATH} defaultScale={SpecialZoomLevel.PageWidth} />
      </Worker>
    </div>
  );
}

export default Resume;
