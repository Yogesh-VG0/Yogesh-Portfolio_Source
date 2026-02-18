import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";

const RESUME_PATH = "/Yogesh_Resume.pdf";

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
            <object
              data={RESUME_PATH}
              type="application/pdf"
              className="w-full h-full min-h-[70vh] sm:min-h-[80vh]"
            >
              {/* Fallback for browsers / mobile that can't embed PDF */}
              <div className="flex flex-col items-center justify-center gap-6 p-8 text-center min-h-[50vh]">
                <p className="text-muted-foreground text-sm max-w-md">
                  Your browser doesn't support embedded PDFs. Use the button
                  below to view or download the resume.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={RESUME_PATH}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold shadow-lg shadow-primary/15"
                  >
                    Open PDF
                  </a>
                  <a
                    href={RESUME_PATH}
                    download="Yogesh_Vadivel_Resume.pdf"
                    className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-secondary/60 text-muted-foreground text-sm font-medium border border-border/30 hover:text-foreground hover:bg-secondary/80 transition-colors"
                  >
                    <Download size={14} />
                    Download
                  </a>
                </div>
              </div>
            </object>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Resume;
