import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import VisitorRegionProvider from "@/components/VisitorRegionProvider";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Resume from "@/pages/Resume";

vi.mock("react-github-calendar", async () => {
  const { forwardRef } = await import("react");
  return { GitHubCalendar: forwardRef(() => null) };
});
vi.mock("@/components/ResumePreview", () => ({ default: ({ path }: { path: string }) => <div data-testid="preview">{path}</div> }));
vi.mock("@/hooks/use-mobile", () => ({ useIsMobile: () => true }));
vi.mock("framer-motion", async () => ({ ...await vi.importActual("framer-motion"), useInView: () => true }));

beforeEach(() => { sessionStorage.clear(); });
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.restoreAllMocks(); });

function renderProfile() {
  return render(<VisitorRegionProvider><MemoryRouter><Routes>
    <Route path="/" element={<><Hero /><About /></>} />
    <Route path="/resume/" element={<Resume />} />
  </Routes></MemoryRouter></VisitorRegionProvider>);
}

describe("shared regional profile", () => {
  it.each([
    ["IN", "Madurai, Tamil Nadu, India", "Madurai, Tamil Nadu, India", "India"],
    ["AE", "Dubai, UAE", "Dubai", "UAE"],
    ["US", "Dubai, UAE", "Dubai", "UAE"],
    ["GB", "Dubai, UAE", "Dubai", "UAE"],
  ])("keeps hero, About, and resume consistent for %s with one lookup", async (country, label, city, filename) => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ country }) });
    vi.stubGlobal("fetch", fetchMock);
    // Sharing must work even when the browser cannot cache the country.
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => { throw new Error("blocked"); });
    renderProfile();
    expect(await screen.findByText(`Open to opportunities · ${label}`)).toBeInTheDocument();
    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`based in ${city}`)).closest("p")).toHaveTextContent("B.Tech. in Computer Science and Engineering from Manipal Academy of Higher Education, Dubai");
    fireEvent.click(screen.getByRole("link", { name: "Resume" }));
    expect(await screen.findByTestId("preview")).toHaveTextContent(`Resume_${filename}.pdf`);
    expect(screen.getByRole("link", { name: "Download PDF" })).toHaveAttribute("download", `Yogesh_Vadivel_Resume_${filename}.pdf`);
    fireEvent.click(screen.getByRole("link", { name: "Back to home" }));
    expect(await screen.findByText(`Open to opportunities · ${label}`)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("uses neutral profile wording while pending and updates all sections together", async () => {
    let resolve!: (value: unknown) => void;
    vi.stubGlobal("fetch", vi.fn(() => new Promise(done => { resolve = done; })));
    renderProfile();
    expect(screen.getByText("Open to opportunities · India & UAE")).toBeInTheDocument();
    expect(screen.queryByText(/based in Dubai|based in Madurai/)).not.toBeInTheDocument();
    await act(async () => { resolve({ ok: true, json: async () => ({ country: "IN" }) }); });
    expect(screen.getByText("Madurai, Tamil Nadu, India")).toBeInTheDocument();
    expect(screen.getByText(/based in Madurai/)).toBeInTheDocument();
  });

  it("shares a stable UAE fallback across navigation after a failed lookup", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("offline"));
    vi.stubGlobal("fetch", fetchMock);
    renderProfile();
    await waitFor(() => expect(screen.getByText("Open to opportunities · Dubai, UAE")).toBeInTheDocument());
    fireEvent.click(screen.getByRole("link", { name: "Resume" }));
    expect(await screen.findByTestId("preview")).toHaveTextContent("Resume_UAE.pdf");
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
