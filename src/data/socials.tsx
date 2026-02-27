import { Mail, Github, Linkedin } from "lucide-react";
import type { ReactNode } from "react";

export interface Social {
  icon: ReactNode;
  label: string;
  href: string;
  ariaLabel: string;
}

export const socials: Social[] = [
  {
    icon: <Mail size={18} />,
    label: "yogeshvadivel456@gmail.com",
    href: "mailto:yogeshvadivel456@gmail.com",
    ariaLabel: "Email",
  },
  {
    icon: <Github size={18} />,
    label: "github.com/Yogesh-VG0",
    href: "https://github.com/Yogesh-VG0",
    ariaLabel: "GitHub",
  },
  {
    icon: <Linkedin size={18} />,
    label: "linkedin.com/in/yogesh-vadivel",
    href: "https://www.linkedin.com/in/yogesh-vadivel-a287a6269/",
    ariaLabel: "LinkedIn",
  },
];
