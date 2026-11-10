import { lazy, Suspense, useState } from "react";
import { Link } from "react-router-dom";
import { Download, ArrowUpRight, FileText, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { resumes } from "@/data/resumes";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import { locations } from "@/data/locations";
import { education } from "@/data/profile";
import { experiences } from "@/data/experience";
import { skillGroups } from "@/data/skills";
import { projects } from "@/data/projects";

const ResumePreview = lazy(() => import("@/components/ResumePreview"));

export default function Resume() {
  const { region, status } = useVisitorRegion();
  const [previewOpen, setPreviewOpen] = useState(false);
  const resume = resumes[region];
  const loading = status === "loading";
  return <div className="relative z-[1] min-h-screen bg-background text-foreground">
    <PageHeader title="Resume">
      <a href={loading ? undefined : resume.path} target="_blank" rel="noopener noreferrer" aria-disabled={loading} aria-label="Open PDF" title="Open PDF in a new tab" className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-border/60 px-3 text-sm font-medium transition-colors hover:border-primary/60 ${loading ? "pointer-events-none opacity-50" : ""}`}>
        <span className="hidden sm:inline">Open PDF</span><ArrowUpRight size={16} aria-hidden="true" />
      </a>
      <a href={loading ? undefined : resume.path} download={resume.filename} aria-disabled={loading} aria-label="Download PDF" title="Download PDF" className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${loading ? "pointer-events-none opacity-50" : ""}`}>
        <Download size={16} aria-hidden="true" /><span className="hidden sm:inline">Download PDF</span>
      </a>
    </PageHeader>
    <main className="container mx-auto max-w-4xl px-4 py-10 sm:px-6 sm:py-14">
      <div className="flex flex-wrap items-start justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Yogesh Vadivel</h2>
          <p className="mt-3 text-lg font-medium text-primary">Full-Stack Developer</p>
          <p className="mt-2 min-h-7 text-sm leading-7 text-foreground/75"><span data-nosnippet>{loading ? "India & UAE" : locations[region].label}</span></p>
        </div>
        <button type="button" disabled={loading} aria-expanded={previewOpen} aria-controls="resume-pdf-preview" onClick={() => setPreviewOpen(open => !open)} className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-border/60 px-4 text-sm font-medium hover:border-primary/60 disabled:opacity-50">
          {previewOpen ? <X size={16} aria-hidden="true" /> : <FileText size={16} aria-hidden="true" />}{previewOpen ? "Close preview" : "Preview PDF"}
        </button>
      </div>
      <p className="mt-6 max-w-2xl text-base leading-8 text-foreground/80">I build and deploy web applications with React, Next.js, Python, and Node.js, with experience in APIs, databases, AI integrations, WordPress, and technical SEO.</p>
      {previewOpen && !loading && <div id="resume-pdf-preview" className="mt-8 h-[80svh] min-h-[480px] overflow-hidden rounded-xl border border-border/50">
        <Suspense fallback={<div role="status" className="flex h-full items-center justify-center text-sm text-foreground/75">Loading preview…</div>}><ResumePreview path={resume.path} label={resume.label} /></Suspense>
      </div>}
      <noscript><p className="mt-6 text-sm leading-7">Enable JavaScript to open the PDF automatically selected for your country. The resume summary is available below.</p></noscript>
      <section className="mt-10 border-t border-border/50 pt-8" aria-labelledby="resume-experience">
        <h2 id="resume-experience" className="text-xl font-bold">Experience</h2>
        <div className="mt-6 space-y-8">{experiences.map(experience => <article key={experience.company}>
          <h3 className="text-lg font-semibold">{experience.role}</h3>
          <p className="mt-1 text-sm font-medium text-primary">{experience.company}</p>
          <p className="mt-2 text-sm leading-7 text-foreground/70">{experience.period} · {experience.location}</p>
          <ul className="mt-3 list-disc space-y-3 pl-5 text-[15px] leading-7 text-foreground/80">{experience.points.map(point => <li key={point}>{point}</li>)}</ul>
        </article>)}</div>
      </section>
      <section className="mt-10 border-t border-border/50 pt-8" aria-labelledby="resume-skills">
        <h2 id="resume-skills" className="text-xl font-bold">Technical skills</h2>
        <dl className="mt-5 grid gap-5 sm:grid-cols-2">{skillGroups.map(group => <div key={group.title}><dt className="text-sm font-semibold">{group.title}</dt><dd className="mt-2 text-[15px] leading-7 text-foreground/80">{group.skills.join(", ")}</dd></div>)}</dl>
      </section>
      <section className="mt-10 border-t border-border/50 pt-8" aria-labelledby="resume-education">
        <h2 id="resume-education" className="text-xl font-bold">Education</h2>
        <h3 className="mt-5 text-lg font-semibold">{education.degree}</h3>
        <p className="mt-2 text-base leading-7 text-foreground/80">{education.institution}</p>
        <p className="mt-2 text-sm text-foreground/70">{education.period}</p>
      </section>
      <section className="mt-10 border-t border-border/50 pt-8" aria-labelledby="resume-projects">
        <h2 id="resume-projects" className="text-xl font-bold">Selected projects</h2>
        <ul className="mt-5 space-y-5">{projects.map(project => <li key={project.slug}>
          <Link to={`/projects/${project.slug}/`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-primary">{project.title}<ArrowUpRight size={16} aria-hidden="true" /></Link>
          <p className="text-[15px] leading-7 text-foreground/80">{project.cardDescription}</p>
        </li>)}</ul>
      </section>
      <div className="mt-10 flex flex-wrap gap-5 border-t border-border/50 pt-7 text-sm"><Link to="/projects/" className="inline-flex min-h-11 items-center text-primary">All projects</Link><a href="/#contact" className="inline-flex min-h-11 items-center text-primary">Contact Yogesh</a></div>
    </main>
  </div>;
}
