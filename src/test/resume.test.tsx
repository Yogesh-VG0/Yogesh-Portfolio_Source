import { act, cleanup, fireEvent, render, renderHook, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Resume from "@/pages/Resume";
import { useVisitorRegion } from "@/hooks/use-visitor-region";
import VisitorRegionProvider from "@/components/VisitorRegionProvider";
import { COUNTRY_TIMEOUT, detectCountry, readCachedCountry, regionForCountry } from "@/lib/resume-location";

vi.mock("@/components/ResumePreview", () => ({
  default: ({ path }: { path: string }) => <div data-testid="pdf-preview">{path}</div>,
}));

const response = (country: unknown, ok = true) => ({ ok, json: async () => ({ country }) });

beforeEach(() => {
  sessionStorage.clear();
});

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

function renderResume(entry = "/resume") {
  return render(<VisitorRegionProvider><MemoryRouter initialEntries={[entry]}><Resume /></MemoryRouter></VisitorRegionProvider>);
}

async function openPreview() {
  await waitFor(() => expect(screen.getByRole("button", { name: "Preview PDF" })).not.toBeDisabled());
  fireEvent.click(screen.getByRole("button", { name: "Preview PDF" }));
}

describe("country lookup", () => {
  it.each(["AE", "US", "GB", "SG", "DE"])("selects UAE for %s", (country) => {
    expect(regionForCountry(country)).toBe("uae");
  });

  it("selects India only for IN", () => {
    expect(regionForCountry("IN")).toBe("india");
  });

  it("caches only the country and expiration timestamp", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response("IN"));
    vi.stubGlobal("fetch", fetchMock);
    await detectCountry(new AbortController().signal);
    expect(readCachedCountry()).toBe("IN");
    expect(JSON.parse(sessionStorage.getItem(sessionStorage.key(0)!)!)).toEqual({ country: "IN", timestamp: expect.any(Number) });
    expect(fetchMock).toHaveBeenCalledWith(expect.stringContaining("country.json"), expect.objectContaining({ credentials: "omit", referrerPolicy: "no-referrer" }));
    vi.spyOn(Date, "now").mockReturnValue(Date.now() + 31 * 60 * 1000);
    expect(readCachedCountry()).toBeNull();
  });

  it.each([null, "", "India", "XX", "in", 12])("rejects malformed country %s", async (country) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response(country)));
    await expect(detectCountry(new AbortController().signal)).rejects.toThrow();
    expect(readCachedCountry()).toBeNull();
  });

  it("works when browser storage is blocked", async () => {
    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response("IN")));
    expect(readCachedCountry()).toBeNull();
    await expect(detectCountry(new AbortController().signal)).resolves.toBe("IN");
  });
});

describe("resume page", () => {
  it.each([["IN", "India"], ["AE", "UAE"], ["US", "UAE"]])("uses the correct preview and download for %s", async (country, filename) => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response(country)));
    renderResume();
    expect(screen.getByRole("link", { name: "Back to home" })).toHaveAttribute("href", "/");
    await waitFor(() => expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("download", `Yogesh_Vadivel_Resume_${filename}.pdf`));
    await openPreview();
    expect(await screen.findByTestId("pdf-preview")).toHaveTextContent(`Resume_${filename}.pdf`);
  });

  it("does not offer a download until automatic selection finishes", () => {
    vi.stubGlobal("fetch", vi.fn(() => new Promise(() => {})));
    renderResume();
    expect(screen.getByText("Download PDF").closest("a")).not.toHaveAttribute("href");
    expect(screen.getByText("Download PDF").closest("a")).toHaveAttribute("aria-disabled", "true");
  });

  it.each([["india", "US", "UAE"], ["uae", "IN", "India"]])("ignores legacy %s overrides and selects by country", async (region, country, filename) => {
    const fetchMock = vi.fn().mockResolvedValue(response(country));
    vi.stubGlobal("fetch", fetchMock);
    renderResume(`/resume?region=${region}`);
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    await openPreview();
    expect(await screen.findByTestId("pdf-preview")).toHaveTextContent(`Resume_${filename}.pdf`);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("keeps the page free of version controls and country-selection messages", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response("IN"));
    vi.stubGlobal("fetch", fetchMock);
    renderResume();
    await openPreview();
    await screen.findByTestId("pdf-preview");
    expect(screen.queryByRole("combobox")).not.toBeInTheDocument();
    expect(screen.queryByText(/Selected for your country|switch below|Version|Automatic/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("download", "Yogesh_Vadivel_Resume_India.pdf");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("automatically falls back to UAE when the service is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(response("IN", false)));
    renderResume();
    await openPreview();
    expect(await screen.findByTestId("pdf-preview")).toHaveTextContent("Resume_UAE.pdf");
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("download", "Yogesh_Vadivel_Resume_UAE.pdf");
  });

  it("bounds a stalled lookup and automatically falls back", async () => {
    vi.useFakeTimers();
    vi.stubGlobal("fetch", vi.fn((_url, { signal }) => new Promise((_resolve, reject) => {
      signal.addEventListener("abort", () => reject(new DOMException("Aborted", "AbortError")));
    })));
    const { result } = renderHook(() => useVisitorRegion(), { wrapper: VisitorRegionProvider });
    await act(async () => { await vi.advanceTimersByTimeAsync(COUNTRY_TIMEOUT); });
    expect(result.current.status).toBe("fallback");
    expect(result.current.region).toBe("uae");
  });

  it("reuses a cached country without another lookup", async () => {
    const fetchMock = vi.fn().mockResolvedValue(response("IN"));
    vi.stubGlobal("fetch", fetchMock);
    await detectCountry(new AbortController().signal);
    fetchMock.mockClear();
    const { result } = renderHook(() => useVisitorRegion(), { wrapper: VisitorRegionProvider });
    expect(result.current.region).toBe("india");
    expect(result.current.status).toBe("detected");
    expect(fetchMock).not.toHaveBeenCalled();
  });
});
