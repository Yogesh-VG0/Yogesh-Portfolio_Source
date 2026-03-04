import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { GemBoxPdfViewer } from "@gembox/pdfviewer";
import "@gembox/pdfviewer/dist/es/pdfviewer.css";

GemBoxPdfViewer.setLicense("FREE-LIMITED-KEY");

const RESUME_PATH = "/Yogesh_Resume.pdf";

const Resume = () => {
  const headerVisible = useScrollDirection(10);
  const viewerRef = useRef<HTMLDivElement>(null);
  const [viewerHeight, setViewerHeight] = useState<number>(0);
  const initialized = useRef(false);

  useEffect(() => {
    document.title = "Resume — Yogesh Vadivel";
    return () => {
      document.title = "Yogesh Vadivel — Full-Stack Developer";
    };
  }, []);

  // Calculate available height after header renders
  useEffect(() => {
    function updateHeight() {
      // 64px = header height (h-16)
      const h = window.innerHeight - 64;
      setViewerHeight(h > 200 ? h : window.innerHeight);
    }
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  // Initialize GemBox PDF Viewer once container is mounted AND has real dimensions
  useEffect(() => {
    if (!viewerRef.current || viewerHeight === 0 || initialized.current) return;

    // Use requestAnimationFrame to ensure the browser has painted
    // the container with its final dimensions before GemBox reads them
    requestAnimationFrame(() => {
      if (!viewerRef.current || initialized.current) return;
      initialized.current = true;
      GemBoxPdfViewer.create({
        container: viewerRef.current,
        initialDocument: RESUME_PATH,
      });
    });
  }, [viewerHeight]);

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

      {/* PDF viewer — GemBox renders natively on all devices */}
      <main className="flex-1 flex flex-col relative z-[50]">
        <div
          ref={viewerRef}
          className="bg-white dark:bg-neutral-900"
          style={{
            width: "100%",
            height: viewerHeight > 0 ? `${viewerHeight}px` : "calc(100vh - 64px)",
          }}
        />
      </main>
    </div>
  );
};

export default Resume;
