import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import SeoMetadata from "./components/SeoMetadata";

const Resume = lazy(() => import("./pages/Resume"));
const NotFound = lazy(() => import("./pages/NotFound"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
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
    <TooltipProvider>
      <Sonner />
      {children}
    </TooltipProvider>
  </ThemeProvider>
);

export const SiteRoutes = () => (
  <>
    <Decorations />
    <SeoMetadata />
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </>
);

const App = () => <AppShell><BrowserRouter><SiteRoutes /></BrowserRouter></AppShell>;

export default App;
