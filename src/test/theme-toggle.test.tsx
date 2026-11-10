import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ThemeToggle from "@/components/ThemeToggle";

const themeState = vi.hoisted(() => ({ theme: "system", resolvedTheme: "light", setTheme: vi.fn() }));
vi.mock("next-themes", () => ({ useTheme: () => themeState }));

afterEach(() => { cleanup(); vi.clearAllMocks(); });

describe("system theme toggle", () => {
  it.each([["light", "dark"], ["dark", "light"]])("switches from resolved system %s to %s", (systemTheme, nextTheme) => {
    themeState.resolvedTheme = systemTheme;
    render(<ThemeToggle />);
    fireEvent.click(screen.getByRole("button", { name: `Switch to ${nextTheme} mode` }));
    expect(themeState.setTheme).toHaveBeenCalledWith(nextTheme);
  });
});
