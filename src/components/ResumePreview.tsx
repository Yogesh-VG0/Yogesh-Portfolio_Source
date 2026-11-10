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
    const container = containerRef.current;
    if (status !== "ready" || !container) return;
    // GemBox currently renders its page field without an accessible name.
    // Keep this small adapter scoped to the viewer, including rebuilt toolbars.
    const labelPageField = () => {
      container.querySelectorAll<HTMLInputElement>("input.gembox-page-input").forEach(input => {
        if (!input.getAttribute("aria-label") && !input.getAttribute("aria-labelledby") && !input.labels?.length) {
          input.setAttribute("aria-label", "Page number");
        }
      });
    };
    labelPageField();
    const observer = new MutationObserver(labelPageField);
    observer.observe(container, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [status]);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setStatus("loading");
    // Serialize changes so rapid region switches cannot show an older PDF.
    const frame = requestAnimationFrame(() => {
      queueRef.current = queueRef.current.catch(() => {}).then(async () => {
        if (!active || !containerRef.current) return;
        // Fetch before mounting: the viewer's automatic zoom can otherwise run
        // against an empty document while a PDF is still downloading.
        const response = await fetch(path, { signal: controller.signal });
        if (!response.ok) throw new Error("Resume download failed");
        const document = await response.arrayBuffer();
        if (!active || !containerRef.current) return;
        if (!viewerRef.current) {
          viewerRef.current = GemBoxPdfViewer.create({
            container: containerRef.current,
            initialDocument: document,
            ui: { toolbar: {
              openButton: { isVisible: false },
              signatureButton: { isVisible: false },
              freeText: { isVisible: false },
              handDrawing: { isVisible: false },
              image: { isVisible: false },
            } },
          });
          await viewerRef.current;
        } else {
          const viewer = await viewerRef.current;
          if (!active) return;
          await viewer.open(document);
        }
        if (active && containerRef.current) {
          const viewer = await viewerRef.current;
          // Start narrow screens at page width so the name and right column
          // are visible immediately. Visitors can still zoom in to read.
          viewer.features.zoom.zoomLevel = containerRef.current.clientWidth < 768 ? "pageWidth" : "automatic";
          setStatus("ready");
        }
      }).catch(() => {
        if (active) setStatus("error");
      });
    });
    return () => {
      active = false;
      controller.abort();
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
