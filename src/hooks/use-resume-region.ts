import { useEffect, useState } from "react";
import { COUNTRY_TIMEOUT, detectCountry, readCachedCountry, regionForCountry } from "@/lib/resume-location";

type Detection = { country: string | null; status: "loading" | "detected" | "fallback" };

export function useResumeRegion() {
  const [detection, setDetection] = useState<Detection>({ country: null, status: "loading" });

  useEffect(() => {
    const cached = readCachedCountry();
    if (cached) {
      setDetection({ country: cached, status: "detected" });
      return;
    }

    const controller = new AbortController();
    let active = true;
    setDetection({ country: null, status: "loading" });
    const timeout = window.setTimeout(() => controller.abort(), COUNTRY_TIMEOUT);
    detectCountry(controller.signal)
      .then((country) => {
        if (active) setDetection({ country, status: "detected" });
      })
      .catch(() => {
        if (active) setDetection({ country: null, status: "fallback" });
      })
      .finally(() => window.clearTimeout(timeout));

    return () => {
      active = false;
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, []);

  return {
    region: detection.country ? regionForCountry(detection.country) : "uae" as const,
    status: detection.status,
  };
}
