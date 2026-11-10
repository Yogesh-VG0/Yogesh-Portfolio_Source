import type { ReactNode } from "react";
import { useCountryDetection } from "@/hooks/use-country-detection";
import { VisitorRegionContext } from "@/hooks/use-visitor-region";

export default function VisitorRegionProvider({ children }: { children: ReactNode }) {
  const detection = useCountryDetection();
  return <VisitorRegionContext.Provider value={detection}>{children}</VisitorRegionContext.Provider>;
}
