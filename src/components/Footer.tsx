import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { tapScale } from "@/lib/motion";

const socials = [
  { icon: <Github size={16} />, href: "https://github.com/Yogesh-VG0", label: "GitHub" },
  { icon: <Linkedin size={16} />, href: "https://www.linkedin.com/in/yogesh-vadivel-a287a6269/", label: "LinkedIn" },
  { icon: <Mail size={16} />, href: "mailto:yogeshvadivel456@gmail.com", label: "Email" },
];

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-border/40 py-10 px-4">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <span className="text-sm font-semibold text-foreground">
            YV<span className="text-primary">.</span>
          </span>
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Yogesh Vadivel
          </p>
        </div>

        {/* Social icons */}
        <div className="flex items-center gap-3">
          {socials.map((s) => (
            <motion.a
              key={s.href}
              href={s.href}
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1 }}
              whileTap={tapScale}
              className="w-9 h-9 rounded-lg bg-secondary/60 border border-border/30 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Back to top + built with */}
        <div className="flex items-center gap-4">
          <p className="text-xs text-muted-foreground/60 font-mono hidden sm:block">
            React + Tailwind
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={tapScale}
            className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
