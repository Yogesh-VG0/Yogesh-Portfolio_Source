import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { fadeUp, staggerContainer, tapScale } from "@/lib/motion";

const NotFound = () => {
  return (
    <div className="flex min-h-screen items-center justify-center text-foreground relative z-[1]">
      <motion.div
        className="text-center px-4"
        variants={staggerContainer(0.1)}
        initial="hidden"
        animate="visible"
      >
        <motion.p variants={fadeUp} className="text-sm font-mono text-primary mb-4 tracking-wider uppercase">
          404 — Page not found
        </motion.p>
        <motion.h1 variants={fadeUp} className="text-6xl sm:text-8xl font-extrabold tracking-tight mb-4">
          <span className="text-gradient">4</span>0<span className="text-gradient">4</span>
        </motion.h1>
        <motion.p variants={fadeUp} className="text-lg text-muted-foreground mb-8 max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link to="/">
            <motion.span
              whileHover={{ scale: 1.04 }}
              whileTap={tapScale}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-shadow"
            >
              <ArrowLeft size={16} />
              Back to Portfolio
            </motion.span>
          </Link>
        </motion.div>
        <motion.p variants={fadeUp} className="mt-8 text-xs text-muted-foreground/40 font-mono">
          YV<span className="text-primary">.</span>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default NotFound;
