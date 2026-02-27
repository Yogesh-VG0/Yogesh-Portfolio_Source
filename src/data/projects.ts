import type { ReactNode } from "react";

export interface ProjectMetric {
  icon: ReactNode;
  label: string;
  value: string;
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  featured: boolean;
  status: "Production" | "In Progress" | "Open Source" | "Archived";
  statusColor: string;
  year: string;
  description: string;
  highlights: string[];
  metrics?: ProjectMetric[];
  tech: string[];
  image?: string;
  gallery?: ProjectGalleryImage[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: {
    problem: string;
    approach: string;
    architecture: string;
    architectureCards?: { label: string; detail: string; icon?: string }[];
    howItWorks?: { title: string; description: string }[];
    challenges: string[];
    results: string;
  };
}

export { projects } from "./projectEntries";
