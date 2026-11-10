import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import About from "@/components/About";

const viewport = vi.hoisted(() => ({ mobile: false }));
vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => viewport.mobile }));
vi.mock("@/hooks/use-visitor-region", () => ({ useVisitorRegion: () => ({ region: "uae", status: "detected" }) }));
vi.mock("next-themes", () => ({ useTheme: () => ({ resolvedTheme: "light" }) }));
vi.mock("framer-motion", async () => ({ ...await vi.importActual("framer-motion"), useInView: () => true }));

beforeEach(() => {
  vi.stubGlobal("CSS", { ...globalThis.CSS, supports: () => true });
  // Most activity is older than six months: mobile must still include it.
  vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({ contributions: [
      { date: "2026-01-01", count: 1200, level: 4 },
      { date: "2026-11-10", count: 68, level: 2 },
    ] }),
  }));
});

afterEach(() => { cleanup(); vi.unstubAllGlobals(); });

describe("GitHub activity", () => {
  it.each([false, true])("preserves the full-year contribution total with mobile=%s", async (mobile) => {
    viewport.mobile = mobile;
    const { container } = render(<About />);
    expect(await screen.findByText("1268 contributions in the last year")).toBeInTheDocument();
    expect(container.querySelector('[data-date="2026-01-01"]')).toBeInTheDocument();
    expect(container.querySelector('[data-date="2026-11-10"]')).toBeInTheDocument();
    expect(screen.getByRole("region", { name: /scroll horizontally/ })).toHaveAttribute("tabindex", "0");
    expect(screen.getByRole("img", { name: "Daily GitHub contributions over the last year" })).toBeInTheDocument();
  });

  it("provides a direct profile link and mobile scroll guidance", async () => {
    viewport.mobile = true;
    render(<About />);
    await screen.findByText("1268 contributions in the last year");
    expect(screen.getByText("Swipe the chart to explore the full year.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View on GitHub" })).toHaveAttribute("href", "https://github.com/Yogesh-VG0");
    expect(screen.queryByText("Less")).not.toBeInTheDocument();
  });

  it("keeps the profile link available when the activity service fails", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("offline"));
    render(<About />);
    expect(await screen.findByText("GitHub activity is unavailable right now. You can still view it on GitHub.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View on GitHub" })).toHaveAttribute("href", "https://github.com/Yogesh-VG0");
  });
});
