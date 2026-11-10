import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import ProjectDetailPage from "@/pages/ProjectDetail";

afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("resets a long gallery before navigating to a shorter related case study", () => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  render(<MemoryRouter initialEntries={["/projects/verdict-games/"]}><Routes><Route path="/projects/:slug/" element={<ProjectDetailPage />} /></Routes></MemoryRouter>);
  fireEvent.click(screen.getByRole("button", { name: "Admin dashboard with game management and audit log" }));
  fireEvent.click(screen.getByRole("link", { name: /ExpenseVision/ }));
  expect(screen.getByRole("heading", { name: "ExpenseVision" })).toBeInTheDocument();
  const image = screen.getByRole("button", { name: "Click to enlarge image" }).querySelector("img");
  expect(image).toHaveAttribute("src", "/expensevision_img/landing_page.webp");
});
