import { act, cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ResumePreview from "@/components/ResumePreview";

const { openDocument, createViewer } = vi.hoisted(() => ({ openDocument: vi.fn(), createViewer: vi.fn() }));
vi.mock("@gembox/pdfviewer", () => ({
  GemBoxPdfViewer: { setLicense: vi.fn(), create: createViewer },
}));

beforeEach(() => {
  openDocument.mockReset().mockResolvedValue(undefined);
  createViewer.mockReset().mockResolvedValue({ open: openDocument });
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => window.setTimeout(() => callback(0), 0));
  vi.stubGlobal("cancelAnimationFrame", (id: number) => window.clearTimeout(id));
});

afterEach(() => {
  cleanup();
  vi.unstubAllGlobals();
});

describe("PDF preview lifecycle", () => {
  it("serializes rapid switches and finishes with the latest document", async () => {
    let finishFirst: () => void;
    openDocument.mockImplementationOnce(() => new Promise<void>((resolve) => { finishFirst = resolve; }));
    const { rerender } = render(<ResumePreview path="india.pdf" label="India" />);
    await waitFor(() => expect(openDocument).toHaveBeenCalledWith("india.pdf"));
    rerender(<ResumePreview path="uae.pdf" label="UAE" />);
    expect(openDocument).toHaveBeenCalledTimes(1);
    await act(async () => { finishFirst(); });
    await waitFor(() => expect(openDocument).toHaveBeenLastCalledWith("uae.pdf"));
    await waitFor(() => expect(screen.getByRole("region", { name: "UAE resume preview" })).toHaveAttribute("aria-busy", "false"));
    expect(createViewer).toHaveBeenCalledTimes(1);
  });

  it("reports failed previews while directing visitors to the PDF actions", async () => {
    openDocument.mockRejectedValueOnce(new Error("PDF unavailable"));
    render(<ResumePreview path="india.pdf" label="India" />);
    expect(await screen.findByText(/preview couldn't load/)).toHaveTextContent("open or download the PDF above");
  });

  it("does not open another document after unmounting during initialization", async () => {
    let initialize: (value: unknown) => void;
    createViewer.mockImplementationOnce(() => new Promise((resolve) => { initialize = resolve; }));
    const { unmount } = render(<ResumePreview path="india.pdf" label="India" />);
    await waitFor(() => expect(createViewer).toHaveBeenCalledTimes(1));
    unmount();
    await act(async () => { initialize({ open: openDocument }); });
    expect(openDocument).not.toHaveBeenCalled();
  });
});
