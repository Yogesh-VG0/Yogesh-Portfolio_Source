import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Link, useNavigate } from "react-router-dom";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import RouteScroll from "@/components/RouteScroll";

function Navigation() {
  const navigate = useNavigate();
  return <><RouteScroll /><main><h1>Page title</h1>
    <Link to="/projects/">Projects</Link><Link to="/#contact">Contact</Link>
    <Link to="/#%E0%A4%A">Malformed fragment</Link>
    <button onClick={() => navigate(-1)}>Back</button>
    <section id="contact"><h2>Get in touch</h2></section>
  </main></>;
}

beforeEach(() => {
  vi.spyOn(window, "scrollTo").mockImplementation(() => {});
  Object.defineProperty(HTMLElement.prototype, "scrollIntoView", { configurable: true, value: vi.fn() });
});
afterEach(() => { cleanup(); vi.restoreAllMocks(); });

it("opens each new page at the top and focuses its heading", () => {
  render(<MemoryRouter><Navigation /></MemoryRouter>);
  fireEvent.click(screen.getByRole("link", { name: "Projects" }));
  expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "instant" });
  expect(screen.getByRole("heading", { name: "Page title" })).toHaveFocus();
  vi.mocked(window.scrollTo).mockClear();
  fireEvent.click(screen.getByRole("link", { name: "Projects" }));
  expect(window.scrollTo).toHaveBeenCalledOnce();
});

it("restores the previous page position when the visitor goes back", () => {
  render(<MemoryRouter><Navigation /></MemoryRouter>);
  vi.spyOn(window, "scrollY", "get").mockReturnValue(1200);
  fireEvent.scroll(window);
  fireEvent.click(screen.getByRole("link", { name: "Projects" }));
  fireEvent.click(screen.getByRole("button", { name: "Back" }));
  expect(window.scrollTo).toHaveBeenLastCalledWith({ left: 0, top: 1200, behavior: "instant" });
});

it("reaches and focuses a section, including on initial fragment entry", () => {
  render(<MemoryRouter initialEntries={["/#contact"]}><Navigation /></MemoryRouter>);
  expect(document.getElementById("contact")!.scrollIntoView).toHaveBeenCalledWith({ behavior: "instant", block: "start" });
  fireEvent.click(screen.getByRole("link", { name: "Contact" }));
  expect(screen.getByRole("heading", { name: "Get in touch" })).toHaveFocus();
});

it("handles malformed fragments without crashing or querying unsafe selectors", () => {
  render(<MemoryRouter><Navigation /></MemoryRouter>);
  fireEvent.click(screen.getByRole("link", { name: "Malformed fragment" }));
  expect(window.scrollTo).toHaveBeenLastCalledWith({ top: 0, left: 0, behavior: "instant" });
});
