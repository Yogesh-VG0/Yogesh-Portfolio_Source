import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import ResumePreviewBoundary from "@/components/ResumePreviewBoundary";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("keeps a useful fallback when the PDF viewer chunk fails", () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  function FailedViewer(): never { throw new Error("Viewer download unavailable"); }
  const expectedFailure = (event: ErrorEvent) => {
    if (event.error?.message === "Viewer download unavailable") event.preventDefault();
  };
  window.addEventListener("error", expectedFailure);
  try { render(<ResumePreviewBoundary><FailedViewer /></ResumePreviewBoundary>); }
  finally { window.removeEventListener("error", expectedFailure); }
  expect(screen.getByRole("alert")).toHaveTextContent("open or download the PDF above");
  expect(screen.getByRole("button", { name: "Reload viewer" })).toBeInTheDocument();
});
