import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden w-full relative z-[1]">
      {/* Skip-to-content for keyboard a11y */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-primary focus:text-primary-foreground focus:text-sm focus:font-medium"
      >
        Skip to content
      </a>
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <div className="section-separator"><About /></div>
        <div className="section-separator"><Skills /></div>
        <Projects />
        <div className="section-separator"><Experience /></div>
        <div className="section-separator"><Education /></div>
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
