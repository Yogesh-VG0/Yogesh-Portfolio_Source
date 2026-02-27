import { useEffect } from "react";
import { motion } from "framer-motion";
import { Download, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";

const RESUME_PATH = "/Yogesh_Resume.pdf";

const Resume = () => {
  useEffect(() => {
    document.title = "Resume — Yogesh Vadivel";
    return () => { document.title = "Yogesh Vadivel — Full-Stack Developer"; };
  }, []);

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

      {/* PDF viewer — simplified to iframe (removes react-pdf-viewer bundle) */}
      <main className="flex-1 flex flex-col">
        <div className="flex-1 container mx-auto max-w-5xl px-2 sm:px-4 py-4 sm:py-6 flex flex-col">
          <div className="flex-1 rounded-xl border border-border/30 bg-card/30 overflow-hidden shadow-lg min-h-[70vh] sm:min-h-[80vh]">
            <iframe
              src={RESUME_PATH}
              title="Yogesh Vadivel Resume"
              className="w-full h-full min-h-[70vh] sm:min-h-[80vh]"
            />
          </div>
          {/* Fallback for browsers that don't render PDF inline */}
          <p className="text-center text-sm text-muted-foreground/60 mt-4">
            Can't see the PDF?{" "}
            <a href={RESUME_PATH} download="Yogesh_Vadivel_Resume.pdf" className="text-primary hover:underline">
              Download it directly
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Resume;
