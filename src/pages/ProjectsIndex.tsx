import { Link } from "react-router-dom";
import { ArrowUpRight, Github, Mail } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";
import { screenshotSources } from "@/lib/images";

export default function ProjectsIndex() {
  return <div className="relative z-[1] min-h-screen">
    <PageHeader title="Projects"><Link to="/resume/" className="inline-flex min-h-11 items-center text-sm text-primary">Resume</Link><Link to="/#contact" aria-label="Contact Yogesh" title="Contact" className="inline-flex min-h-11 min-w-11 items-center justify-center text-foreground/80 hover:text-primary"><Mail size={18} aria-hidden="true" /></Link></PageHeader>
    <main className="container mx-auto max-w-5xl px-4 py-12 sm:px-6 sm:py-20">
      <p className="text-xs font-mono uppercase tracking-widest text-primary">Built by Yogesh Vadivel</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Projects I've built</h2>
      <p className="mt-5 max-w-2xl text-base leading-8 text-foreground/80">Three web apps, with live demos, source code, and a look at how each one works.</p>
      <div className="mt-12 divide-y divide-border/50">
        {projects.map(project => <article key={project.slug} className="grid gap-6 py-9 first:pt-0 md:grid-cols-[0.9fr_1.1fr] md:gap-10">
          <Link to={`/projects/${project.slug}/`} className="block self-start overflow-hidden rounded-xl border border-border/40" aria-label={`View ${project.title}`}>
            <img src={project.image} {...screenshotSources(project.image!, "(max-width: 768px) calc(100vw - 32px), 400px")} alt={`${project.title} application preview`} loading="lazy" width="1920" height="1200" className="aspect-[16/10] w-full object-cover transition-transform duration-300 hover:scale-[1.02]" />
          </Link>
          <div>
            <p className="text-xs font-mono text-primary">{project.year} · Full-stack development</p>
            <h3 className="mt-2 text-2xl font-bold"><Link to={`/projects/${project.slug}/`} className="hover:text-primary">{project.title}</Link></h3>
            <p className="mt-3 text-base leading-7 text-foreground/80">{project.cardDescription}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
              <Link to={`/projects/${project.slug}/`} className="inline-flex min-h-11 items-center gap-1 font-semibold text-primary">View project<ArrowUpRight size={16} aria-hidden="true" /></Link>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">Live app ↗</a>
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} source code`} className="inline-flex min-h-11 min-w-11 items-center justify-center text-foreground/70"><Github size={18} /></a>
            </div>
          </div>
        </article>)}
      </div>
      <div className="mt-8 border-t border-border/40 pt-8"><Link to="/#contact" className="inline-flex min-h-12 items-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground">Get in touch</Link></div>
    </main>
    <Footer />
  </div>;
}
