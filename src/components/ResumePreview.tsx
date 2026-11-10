import { useEffect, useRef, useState } from "react";
import { GemBoxPdfViewer } from "@gembox/pdfviewer";
import { FileText, Loader2 } from "lucide-react";
import "@gembox/pdfviewer/dist/es/pdfviewer.css";

GemBoxPdfViewer.setLicense("FREE-LIMITED-KEY");

export default function ResumePreview({ path, label }: { path: string; label: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<Promise<GemBoxPdfViewer> | null>(null);
  const queueRef = useRef<Promise<void>>(Promise.resolve());
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    setStatus("loading");
    // Serialize changes so rapid region switches cannot show an older PDF.
    const frame = requestAnimationFrame(() => {
      queueRef.current = queueRef.current.catch(() => {}).then(async () => {
        if (!active || !containerRef.current) return;
        if (!viewerRef.current) {
          viewerRef.current = GemBoxPdfViewer.create({ container: containerRef.current });
        }
        const viewer = await viewerRef.current;
        if (!active) return;
        await viewer.open(path);
        if (active) setStatus("ready");
      }).catch(() => {
        if (active) setStatus("error");
      });
    });
    return () => {
      active = false;
      cancelAnimationFrame(frame);
    };
  }, [path]);

  return (
    <section aria-label={`${label} resume preview`} aria-busy={status === "loading"} className="relative h-full min-h-0 bg-secondary/30">
      <div ref={containerRef} className={`absolute inset-0 bg-white ${status === "ready" ? "visible" : "invisible"}`} />
      {status !== "ready" && (
        <div role="status" className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-6 text-center">
          {status === "loading" ? <Loader2 size={24} className="animate-spin text-primary" aria-hidden="true" /> : <FileText size={28} className="text-primary" aria-hidden="true" />}
          <p className="text-sm text-foreground/75">
            {status === "loading" ? "Loading resume preview…" : "The preview couldn't load. You can still open or download the PDF above."}
          </p>
        </div>
      )}
    </section>
  );
}
