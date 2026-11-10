import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { ArrowLeft } from "lucide-react";

export default function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className="sticky top-0 z-50 shrink-0 border-b border-border/40 bg-background/95 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between gap-3 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3 sm:gap-4">
          <Link to="/" aria-label="YV. — Yogesh Vadivel portfolio" className="hidden min-h-11 items-center text-lg font-bold tracking-tight text-foreground transition-colors hover:text-primary md:inline-flex">
            YV<span className="text-primary">.</span>
          </Link>
          <span className="hidden h-5 w-px bg-border md:block" aria-hidden="true" />
          <Link to="/" className="inline-flex min-h-11 shrink-0 items-center gap-1.5 text-xs font-medium text-foreground/80 transition-colors hover:text-primary sm:text-sm">
            <ArrowLeft size={15} aria-hidden="true" />Back to home
          </Link>
          <h1 className="sr-only truncate text-sm font-semibold text-foreground sm:not-sr-only sm:border-l sm:border-border sm:pl-4 sm:text-base">{title}</h1>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {children}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
