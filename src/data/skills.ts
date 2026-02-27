export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "Frontend", skills: ["React.js", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "Flask", "FastAPI"] },
  { title: "Databases", skills: ["MongoDB", "SQL"] },
  { title: "AI & Data", skills: ["Machine Learning", "OCR", "Real-time Data", "Analytics Dashboards"] },
  { title: "Tools", skills: ["Git", "REST APIs", "WebSockets"] },
];
