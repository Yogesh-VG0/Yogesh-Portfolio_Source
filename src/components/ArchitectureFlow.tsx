import { ArrowDown, ArrowRight } from "lucide-react";

export default function ArchitectureFlow({ steps, title }: { steps: { title: string; detail: string }[]; title: string }) {
  return <figure className="mb-6 sm:ml-10" aria-label={`${title} architecture flow`}>
    <ol className="grid gap-3 lg:grid-cols-4">
      {steps.map((step, index) => <li key={step.title} className="relative flex flex-col gap-2 rounded-xl border border-primary/20 bg-primary/[0.04] p-4 lg:mr-3">
        <span className="text-xs font-mono text-primary" aria-hidden="true">0{index + 1}</span>
        <span className="text-sm font-semibold">{step.title}</span>
        <span className="text-xs leading-6 text-foreground/75">{step.detail}</span>
        {index < steps.length - 1 && <><ArrowDown size={16} aria-hidden="true" className="absolute -bottom-3 left-1/2 z-10 rounded-full bg-background text-primary lg:hidden" /><ArrowRight size={16} aria-hidden="true" className="absolute -right-5 top-1/2 z-10 hidden rounded-full bg-background text-primary lg:block" /></>}
      </li>)}
    </ol>
    <figcaption className="mt-3 text-xs leading-6 text-foreground/65">The main data flow; the implementation notes below explain each layer.</figcaption>
  </figure>;
}
