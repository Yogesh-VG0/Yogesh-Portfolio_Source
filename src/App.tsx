import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import SeoMetadata from "./components/SeoMetadata";
import Resume from "./pages/Resume";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import VisitorRegionProvider from "./components/VisitorRegionProvider";
import ProjectsIndex from "./pages/ProjectsIndex";
import RouteScroll from "./components/RouteScroll";
import { MotionConfig } from "framer-motion";
const StarsBackground = lazy(() => import("./components/StarsBackground"));
const ClickSpark = lazy(() => import("./components/ClickSpark"));
const CursorGlow = lazy(() => import("./components/CursorGlow"));

const Decorations = () => {
  const { pathname } = useLocation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  if (!mounted || pathname.replace(/\/+$/, "") === "/resume") return null;
  return <Suspense fallback={null}><StarsBackground /><ClickSpark /><CursorGlow /></Suspense>;
};

export const AppShell = ({ children }: { children: ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="system" storageKey="portfolio-theme" enableSystem disableTransitionOnChange>
    <MotionConfig reducedMotion="user"><VisitorRegionProvider><TooltipProvider>
      <Sonner />
      {children}
    </TooltipProvider></VisitorRegionProvider></MotionConfig>
  </ThemeProvider>
);

export const SiteRoutes = () => (
  <>
    <Decorations />
    <SeoMetadata />
    <RouteScroll />
    {/* Keep prerendered routes synchronous: system-theme updates must not interrupt
        hydration while a route chunk downloads. Heavy PDF and effects stay lazy. */}
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/resume" element={<Resume />} />
      <Route path="/projects" element={<ProjectsIndex />} />
      <Route path="/projects/:slug" element={<ProjectDetail />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </>
);

const App = () => <AppShell><BrowserRouter><SiteRoutes /></BrowserRouter></AppShell>;

export default App;
