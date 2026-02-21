import * as React from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { useIsMobile } from "@/hooks/use-mobile";

// PDF in public/ is served at root (or base URL when deployed)
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
const RESUME_PATH = `${BASE}/Yogesh_Resume.pdf`.replace(/\/+/g, "/");

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

      {/* Desktop: direct PDF iframe. Mobile: Google Docs viewer iframe (reliable on mobile, no glitches) */}
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
              <GooglePdfViewer />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

/** Mobile: Google Docs viewer iframe. If the doc shows blank (Google slow), reload iframe. */
function GooglePdfViewer() {
  const iframeRef = React.useRef<HTMLIFrameElement>(null);
  const intervalRef = React.useRef<ReturnType<typeof setInterval> | null>(null);
  const [viewerSrc, setViewerSrc] = React.useState<string>("");

  React.useEffect(() => {
    const fullPdfUrl = `${window.location.origin}${RESUME_PATH}`;
    setViewerSrc(
      `https://docs.google.com/gview?url=${encodeURIComponent(fullPdfUrl)}&embedded=true`
    );
  }, []);

  const clearCheckingInterval = React.useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const onIframeLoad = React.useCallback(() => {
    clearCheckingInterval();
  }, [clearCheckingInterval]);

  React.useEffect(() => {
    if (!viewerSrc) return;

    intervalRef.current = setInterval(() => {
      try {
        const iframe = iframeRef.current;
        if (!iframe?.contentWindow?.document?.body) return;
        // Google sometimes returns blank (204); reload iframe to retry
        if (iframe.contentWindow.document.body.innerHTML === "") {
          iframe.src = viewerSrc;
        }
      } catch {
        // CORS: we can't read cross-origin content. Doc has loaded, stop checking.
        clearCheckingInterval();
      }
    }, 4000);

    return clearCheckingInterval;
  }, [viewerSrc, clearCheckingInterval]);

  if (!viewerSrc) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-[60vh] text-muted-foreground text-sm">
        Loading…
      </div>
    );
  }

  return (
    <iframe
      ref={iframeRef}
      title="Yogesh Vadivel Resume"
      src={viewerSrc}
      className="w-full flex-1 min-h-[calc(100vh-6rem)] border-0"
      style={{ minHeight: "calc(100vh - 6rem)" }}
      onLoad={onIframeLoad}
    />
  );
}

export default Resume;
