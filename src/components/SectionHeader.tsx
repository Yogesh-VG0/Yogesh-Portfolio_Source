import { motion } from "framer-motion";
import { fadeUp } from "@/lib/motion";

interface SectionHeaderProps {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}

const SectionHeader = ({ label, title, description, align = "left" }: SectionHeaderProps) => {
  const isCenter = align === "center";

  return (
    <motion.div variants={fadeUp} className={`mb-12 ${isCenter ? "text-center" : ""}`}>
      <p className="text-sm font-mono text-primary mb-2 tracking-wider uppercase">{label}</p>
      <h2 className="text-3xl md:text-4xl font-bold mb-3">{title}</h2>
      <div
        className={`w-12 h-[2px] bg-gradient-to-r from-primary to-transparent rounded-full ${
          isCenter ? "mx-auto" : ""
        }`}
      />
      {description && (
        <p className={`text-muted-foreground mt-4 ${isCenter ? "max-w-2xl mx-auto" : "max-w-lg"}`}>
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
