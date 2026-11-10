export type ResumeRegion = "india" | "uae";

export const resumes = {
  india: {
    label: "India",
    path: "/resumes/Yogesh_Vadivel_Resume_India.pdf",
    filename: "Yogesh_Vadivel_Resume_India.pdf",
  },
  uae: {
    label: "UAE / International",
    path: "/resumes/Yogesh_Vadivel_Resume_UAE.pdf",
    filename: "Yogesh_Vadivel_Resume_UAE.pdf",
  },
} satisfies Record<ResumeRegion, { label: string; path: string; filename: string }>;
