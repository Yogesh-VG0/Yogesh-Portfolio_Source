import { motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { tapScale } from "@/lib/motion";
import { socials } from "@/data/socials";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const scrollToTop = () => navigate(pathname);

  return (
    <footer className="border-t border-border/40 py-10 px-4">
      <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Brand */}
        <div className="flex flex-col items-center sm:items-start gap-1">
          <Link to="/" aria-label="YV. — Yogesh Vadivel home" className="inline-flex min-h-11 items-center text-sm font-semibold text-foreground hover:text-primary">
            YV<span className="text-primary">.</span>
          </Link>
          <p className="text-xs text-foreground/70">
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
              className="w-11 h-11 rounded-lg bg-secondary/60 border border-border/30 flex items-center justify-center text-foreground/70 hover:text-primary hover:border-primary/30 transition-colors"
              aria-label={s.label}
            >
              {s.icon}
            </motion.a>
          ))}
        </div>

        {/* Back to top + built with */}
        <div className="flex items-center gap-4">
          <nav aria-label="Footer" className="flex items-center gap-4 text-sm text-foreground/75"><Link to="/projects/" className="inline-flex min-h-11 items-center hover:text-primary">Projects</Link><Link to="/resume/" className="inline-flex min-h-11 items-center hover:text-primary">Resume</Link><Link to="/#contact" className="inline-flex min-h-11 items-center hover:text-primary">Contact</Link></nav>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={tapScale}
            className="w-11 h-11 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary hover:bg-primary/20 transition-colors"
            aria-label="Back to top"
          >
            <ArrowUp size={16} />
          </motion.button>
        </div>
      </div>
      <div className="container mx-auto mt-6 max-w-5xl text-xs leading-6 text-foreground/65" data-nosnippet>
        <details><summary className="inline-flex min-h-11 cursor-pointer items-center underline underline-offset-4">Privacy</summary>
          <p className="mt-2 max-w-3xl">GeoJS uses your IP address to return your country for automatic profile and resume selection. This site stores only the country code and timestamp in session storage for 30 minutes; it never requests device location. Your theme choice is saved in your browser. Contact submissions are sent through EmailJS. Cloudflare Web Analytics measures visits on the production site.</p>
        </details>
      </div>
    </footer>
  );
};

export default Footer;
