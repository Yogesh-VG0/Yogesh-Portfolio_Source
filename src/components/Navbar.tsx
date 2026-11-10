import { useState, useEffect, useRef, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { Link } from "react-router-dom";

const MotionLink = motion.create(Link);

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const activeSectionRef = useRef("");
  const navVisible = useScrollDirection(10);

  /* ---- Scroll listener: glass effect only (lightweight) ---- */
  const handleScroll = useCallback(() => {
    const isScrolled = window.scrollY > 20;
    setScrolled((prev) => (prev === isScrolled ? prev : isScrolled));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  /* ---- IntersectionObserver for active section detection ---- */
  useEffect(() => {
    const sectionIds = navLinks.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (activeSectionRef.current !== id) {
              activeSectionRef.current = id;
              setActiveSection(id);
            }
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );

    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  /* ---- Lock body scroll when mobile menu open ---- */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.querySelector<HTMLAnchorElement>("#mobile-menu a")?.focus();
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        document.querySelector<HTMLButtonElement>('[aria-controls="mobile-menu"]')?.focus();
      }
      if (event.key === "Tab") {
        const controls = [...document.querySelectorAll<HTMLElement>('#mobile-menu a, nav[aria-label="Main navigation"] a, nav[aria-label="Main navigation"] button')].filter(element => element.getClientRects().length > 0);
        const first = controls[0];
        const last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileOpen]);

  return (
    <>
      {/* Mobile menu — full-screen overlay, rendered OUTSIDE nav so z-index works */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[90] overflow-y-auto bg-background backdrop-blur-2xl md:hidden"
            id="mobile-menu"
          >
            <div className="flex min-h-full flex-col items-center justify-center gap-5 px-4 pb-6 pt-20 sm:gap-8" role="navigation" aria-label="Mobile navigation">
              {navLinks.map((link, i) => (
                <MotionLink
                  key={link.href}
                  to={`/${link.href}`}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                  className={`text-2xl font-semibold transition-colors ${
                    activeSection === link.href.slice(1)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </MotionLink>
              ))}
              <MotionLink to="/resume/" onClick={() => setMobileOpen(false)} className="inline-flex min-h-11 items-center text-2xl font-semibold text-primary">Resume</MotionLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav
        aria-label="Main navigation"
        className={`fixed top-0 left-0 right-0 z-[95] transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border/40 shadow-sm"
            : mobileOpen
              ? "bg-transparent"
              : "bg-background/40 backdrop-blur-md md:bg-transparent md:backdrop-blur-none"
        }`}
        style={{
          transform: navVisible || mobileOpen ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), background-color 0.3s, backdrop-filter 0.3s, border-color 0.3s, box-shadow 0.3s",
        }}
      >
        <div className="container mx-auto flex items-center justify-between h-16 px-4 sm:px-6">
          {/* Logo */}
          <Link
            to="/"
            onClick={() => setMobileOpen(false)}
            aria-label="YV. — Yogesh Vadivel home"
            className="inline-flex min-h-11 min-w-11 items-center text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors focus-visible:outline-primary"
          >
            YV<span className="text-primary">.</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.slice(1);
              return (
                <Link
                  key={link.href}
                  to={`/${link.href}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? "text-primary"
                      : "text-foreground/72 hover:text-foreground"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-lg bg-primary/10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link to="/resume/" className="inline-flex min-h-11 items-center px-3 text-sm font-medium text-primary">Resume</Link>
            <div className="ml-3">
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="w-11 h-11 flex items-center justify-center rounded-lg text-foreground hover:bg-secondary/80 transition-colors"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
