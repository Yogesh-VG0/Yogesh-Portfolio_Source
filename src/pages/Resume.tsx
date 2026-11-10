import { lazy, Suspense } from "react";
import { Download, ArrowUpRight, Loader2 } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import ResumePreviewBoundary from "@/components/ResumePreviewBoundary";
import { resumes } from "@/data/resumes";
import { useVisitorRegion } from "@/hooks/use-visitor-region";

const ResumePreview = lazy(() => import("@/components/ResumePreview"));

const Resume = () => {
  const { region, status } = useVisitorRegion();
  const resume = resumes[region];
  const loading = status === "loading";

  return (
    <div className="relative z-[1] flex h-dvh min-h-[240px] flex-col bg-background text-foreground">
      <PageHeader title="Resume">
        <a href={loading ? undefined : resume.path} target="_blank" rel="noopener noreferrer" aria-disabled={loading} aria-label="Open PDF" title="Open PDF in a new tab" className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border border-border/60 px-3 text-sm font-medium transition-colors hover:border-primary/60 ${loading ? "pointer-events-none opacity-50" : ""}`}>
          <span className="hidden sm:inline">Open PDF</span><ArrowUpRight size={16} aria-hidden="true" />
        </a>
        <a href={loading ? undefined : resume.path} download={resume.filename} aria-disabled={loading} aria-label="Download PDF" title="Download PDF" className={`inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg bg-primary px-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 ${loading ? "pointer-events-none opacity-50" : ""}`}>
          <Download size={16} aria-hidden="true" /><span className="hidden sm:inline">Download PDF</span>
        </a>
      </PageHeader>
      <main className="min-h-0 flex-1">
        {loading ? (
          <div role="status" className="resume-loading flex h-full items-center justify-center gap-3 text-sm text-foreground/75">
            <Loader2 size={18} className="animate-spin text-primary" aria-hidden="true" /> Loading resume…
          </div>
        ) : (
          <ResumePreviewBoundary key={resume.path}><Suspense fallback={<div role="status" className="flex h-full items-center justify-center text-sm text-foreground/75">Loading preview…</div>}>
            <ResumePreview path={resume.path} label={resume.label} />
          </Suspense></ResumePreviewBoundary>
        )}
        <noscript><p className="p-6 text-center">Enable JavaScript to load the resume selected for your country.</p></noscript>
      </main>
    </div>
  );
};

export default Resume;
