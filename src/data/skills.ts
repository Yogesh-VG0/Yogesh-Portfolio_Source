export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["TypeScript", "JavaScript", "Python"] },
  { title: "Frontend", skills: ["React.js", "Next.js", "Tailwind", "HTML", "CSS"] },
  { title: "Backend & APIs", skills: ["Node.js", "Express.js", "FastAPI", "Flask", "REST APIs", "WebSockets"] },
  { title: "Databases", skills: ["PostgreSQL", "MongoDB", "SQL", "SQLite"] },
  { title: "ML & AI", skills: ["Machine Learning", "LightGBM", "SHAP", "OCR", "LLM Integration"] },
  { title: "DevOps & Tools", skills: ["Git", "Linux", "GitHub Actions", "Vercel", "Render"] },
];
