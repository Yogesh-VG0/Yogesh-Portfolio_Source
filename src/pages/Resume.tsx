import { motion } from "framer-motion";
import { Download, ArrowLeft, FileWarning } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

// PDF in public/ is served at root (or base URL when deployed)
const BASE = (import.meta.env.BASE_URL || "/").replace(/\/$/, "") || "";
const RESUME_PATH = `${BASE}/Yogesh_Resume.pdf`.replace(/\/+/g, "/");

const Resume = () => {
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

          <motion.div variants={fadeUp} className="shrink-0">
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

      {/* PDF viewer - full width, no horizontal scroll */}
      <main className="flex-1 flex flex-col min-w-0 w-full">
        <div className="flex-1 w-full max-w-full min-w-0 px-2 sm:px-3 md:px-4 py-3 sm:py-4 md:py-6">
          <div className="resume-viewer-wrapper w-full max-w-full min-w-0 flex-1 rounded-none sm:rounded-xl border-0 sm:border border-border/30 bg-background overflow-hidden shadow-none sm:shadow-lg min-h-[calc(100vh-5rem)] sm:min-h-[80vh]">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={RESUME_PATH}
                renderError={() => (
                  <div className="flex flex-col items-center justify-center gap-4 min-h-[60vh] sm:min-h-[70vh] p-6 sm:p-8 text-center text-muted-foreground">
                    <FileWarning size={40} className="opacity-60 sm:w-12 sm:h-12" />
                    <p className="text-sm sm:text-base">Could not load the PDF. You can still download the resume.</p>
                    <motion.a
                      href={RESUME_PATH}
                      download="Yogesh_Vadivel_Resume.pdf"
                      whileHover={{ scale: 1.04 }}
                      whileTap={tapScale}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm"
                    >
                      <Download size={18} />
                      Download Resume
                    </motion.a>
                  </div>
                )}
              />
            </Worker>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
