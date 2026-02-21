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
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* Top bar */}
      <motion.header
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/40"
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
        <div className="flex-1 container mx-auto max-w-5xl px-2 sm:px-4 py-4 sm:py-6 flex flex-col">
          <div className="flex-1 rounded-xl border border-border/30 bg-card/30 overflow-hidden shadow-lg min-h-[70vh] sm:min-h-[80vh]">
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
              <Viewer
                fileUrl={RESUME_PATH}
                renderError={() => (
                  <div className="flex flex-col items-center justify-center gap-4 min-h-[70vh] sm:min-h-[80vh] p-8 text-center text-muted-foreground">
                    <FileWarning size={48} className="opacity-60" />
                    <p>Could not load the PDF. You can still download the resume.</p>
                    <motion.a
                      href={RESUME_PATH}
                      download="Yogesh_Vadivel_Resume.pdf"
                      whileHover={{ scale: 1.04 }}
                      whileTap={tapScale}
                      className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-primary text-primary-foreground font-semibold"
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
