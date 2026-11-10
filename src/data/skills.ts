export interface SkillGroup {
  title: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  { title: "Languages", skills: ["TypeScript", "JavaScript", "Python", "SQL"] },
  { title: "Frontend", skills: ["React.js", "Next.js", "Tailwind", "WordPress"] },
  { title: "Backend & APIs", skills: ["Node.js", "Express.js", "FastAPI", "REST APIs", "WebSockets"] },
  { title: "Databases", skills: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { title: "ML & AI", skills: ["Machine Learning", "LightGBM", "SHAP", "OCR", "LLM Integration"] },
  { title: "DevOps & Tools", skills: ["Git", "Linux", "GitHub Actions", "Vercel", "Vitest", "Playwright"] },
];
