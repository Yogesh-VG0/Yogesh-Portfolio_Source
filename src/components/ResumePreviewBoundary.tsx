import { Component, type ReactNode } from "react";

export default class ResumePreviewBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    if (!this.state.failed) return this.props.children;
    return <div role="alert" className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="max-w-sm text-sm leading-7 text-foreground/80">The PDF viewer couldn't load. You can still open or download the PDF above.</p>
      <button type="button" onClick={() => window.location.reload()} className="min-h-11 rounded-lg border border-border/60 px-4 text-sm font-medium hover:border-primary/60">Reload viewer</button>
    </div>;
  }
}
