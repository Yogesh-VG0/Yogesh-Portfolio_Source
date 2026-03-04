import { useEffect, useState, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft, RefreshCw, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";

const RESUME_PATH = "/Yogesh_Resume.pdf";
const RESUME_FULL_URL = "https://yogeshv.me/Yogesh_Resume.pdf";

/**
 * Detect devices that cannot render a PDF natively inside an <iframe>.
 * This includes phones AND tablets (Samsung Tab, iPad, etc.).
 * We check multiple signals to cover edge cases:
 *  - `navigator.maxTouchPoints > 0` catches modern touch devices
 *  - UA-string regex catches older Android/iOS/Samsung browsers
 *  - `navigator.platform` catches iPads running desktop-mode Safari
 */
function isTouchDevice(): boolean {
  if (typeof navigator === "undefined") return false;

  // Touch-points check (works on modern browsers, including iPad Safari)
  if (navigator.maxTouchPoints > 0) return true;

  // UA-based fallback for older browsers
  const ua = navigator.userAgent || "";
  if (/Android|iPhone|iPad|iPod|webOS|BlackBerry|IEMobile|Opera Mini|Samsung/i.test(ua)) return true;

  // iPad running desktop user-agent (Safari 13+)
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 0) return true;

  return false;
}

/** Build the viewer URL, adding a cache-bust to prevent blank-on-refresh */
function buildViewerUrl(): string {
  const bust = Date.now();
  return `https://docs.google.com/viewer?url=${encodeURIComponent(RESUME_FULL_URL)}&embedded=true&t=${bust}`;
}

const Resume = () => {
  const headerVisible = useScrollDirection(10);
  const needsExternalViewer = isTouchDevice();

  const [iframeSrc, setIframeSrc] = useState(() =>
    needsExternalViewer ? buildViewerUrl() : RESUME_PATH
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  // When the iframe fires onLoad, clear the loading state.
  // Google Docs viewer fires onLoad even when it shows a blank page,
  // so we also run a timeout-based check.
  const handleLoad = useCallback(() => {
    setLoading(false);
    setError(false);
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  // Auto-retry: if the iframe hasn't loaded within 8 seconds on touch
  // devices, the Google Docs viewer probably returned blank → retry.
  useEffect(() => {
    if (!needsExternalViewer) return;

    timerRef.current = setTimeout(() => {
      if (loading) {
        // Force a reload with a new cache-bust param
        setIframeSrc(buildViewerUrl());
        setLoading(true);
      }
    }, 8000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [iframeSrc, loading, needsExternalViewer]);

  // Manual retry
  const handleRetry = useCallback(() => {
    setLoading(true);
    setError(false);
    setIframeSrc(needsExternalViewer ? buildViewerUrl() : RESUME_PATH);
  }, [needsExternalViewer]);

  useEffect(() => {
    document.title = "Resume — Yogesh Vadivel";
    return () => {
      document.title = "Yogesh Vadivel — Full-Stack Developer";
    };
  }, []);

  return (
    <div className="min-h-screen text-foreground flex flex-col relative z-[1]">
      {/* Top bar */}
      <motion.header
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
        style={{
          transform: headerVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div className="container mx-auto max-w-6xl flex items-center justify-between h-16 px-4 sm:px-6">
          <motion.div variants={fadeUp}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </Link>
          </motion.div>

          <motion.div variants={fadeUp}>
            <motion.a
              href={RESUME_PATH}
              download="Yogesh_Vadivel_Resume.pdf"
              whileHover={{ scale: 1.04 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/15 hover:shadow-primary/25 transition-shadow"
            >
              <Download size={15} />
              Download PDF
            </motion.a>
          </motion.div>
        </div>
      </motion.header>

      {/* PDF viewer */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col px-0 sm:container sm:mx-auto sm:max-w-5xl sm:px-4 py-0 sm:py-6">
          <div className="relative flex-1 sm:rounded-xl sm:border sm:border-border/30 bg-card/30 overflow-hidden sm:shadow-lg">
            {/* Loading / error overlay */}
            {(loading || error) && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-background/80 backdrop-blur-sm">
                {error ? (
                  <>
                    <p className="text-sm text-muted-foreground">Failed to load resume.</p>
                    <button
                      onClick={handleRetry}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground text-sm font-semibold"
                    >
                      <RefreshCw size={15} />
                      Retry
                    </button>
                  </>
                ) : (
                  <>
                    <Loader2 size={28} className="animate-spin text-primary" />
                    <p className="text-sm text-muted-foreground">Loading resume…</p>
                  </>
                )}
              </div>
            )}

            <iframe
              ref={iframeRef}
              key={iframeSrc}
              src={iframeSrc}
              title="Yogesh Vadivel Resume"
              onLoad={handleLoad}
              onError={() => { setLoading(false); setError(true); }}
              allow="autoplay"
              sandbox="allow-scripts allow-same-origin allow-popups"
              className="w-full border-0"
              style={{ height: "calc(100vh - 4rem)" }}
            />
          </div>

          {/* Fallback links */}
          <div className="flex flex-wrap items-center justify-center gap-3 py-4 px-4">
            <p className="text-sm text-muted-foreground/60">
              Can't see the PDF?
            </p>
            <a
              href={RESUME_PATH}
              download="Yogesh_Vadivel_Resume.pdf"
              className="text-sm text-primary hover:underline"
            >
              Download it directly
            </a>
            {needsExternalViewer && (
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
              >
                <RefreshCw size={13} />
                Reload viewer
              </button>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
