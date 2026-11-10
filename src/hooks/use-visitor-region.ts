import { createContext, useContext } from "react";
import type { useCountryDetection } from "./use-country-detection";

export const VisitorRegionContext = createContext<ReturnType<typeof useCountryDetection> | null>(null);

/** One country result for the profile, availability badge, and resume. */
export function useVisitorRegion() {
  const region = useContext(VisitorRegionContext);
  if (!region) throw new Error("useVisitorRegion requires VisitorRegionProvider");
  return region;
}
