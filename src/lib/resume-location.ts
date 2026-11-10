import type { ResumeRegion } from "@/data/resumes";

const CACHE_KEY = "portfolio:resume-country:v1";
const CACHE_TTL = 30 * 60 * 1000;
export const COUNTRY_ENDPOINT = "https://get.geojs.io/v1/ip/country.json";
export const COUNTRY_TIMEOUT = 4000;

const isCountryCode = (value: unknown): value is string =>
  typeof value === "string" && /^[A-Z]{2}$/.test(value) && value !== "XX";

export const regionForCountry = (country: string): ResumeRegion =>
  country === "IN" ? "india" : "uae";

export function readCachedCountry(): string | null {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) ?? "null");
    const age = Date.now() - cached?.timestamp;
    return isCountryCode(cached?.country) && age >= 0 && age < CACHE_TTL
      ? cached.country
      : null;
  } catch {
    return null;
  }
}

/** Country only: never request device location or store a visitor's IP address. */
export async function detectCountry(signal: AbortSignal): Promise<string> {
  const response = await fetch(COUNTRY_ENDPOINT, {
    signal,
    credentials: "omit",
    referrerPolicy: "no-referrer",
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Country lookup unavailable");
  const data: unknown = await response.json();
  if (signal.aborted) throw new DOMException("Aborted", "AbortError");
  if (!data || typeof data !== "object" || !("country" in data) || !isCountryCode(data.country)) {
    throw new Error("Country lookup returned an invalid country");
  }
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ country: data.country, timestamp: Date.now() }));
  } catch {
    // Location selection still works when browser storage is disabled.
  }
  return data.country;
}
