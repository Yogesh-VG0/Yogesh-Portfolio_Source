import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import Contact from "@/components/Contact";
import emailjs from "@emailjs/browser";

vi.mock("@emailjs/browser", () => ({ default: { sendForm: vi.fn() } }));
vi.mock("framer-motion", async () => ({ ...await vi.importActual("framer-motion"), useInView: () => true }));
beforeEach(() => { vi.mocked(emailjs.sendForm).mockReset().mockResolvedValue({ status: 200, text: "OK" }); });
afterEach(cleanup);

function completeForm() {
  fireEvent.change(screen.getByRole("textbox", { name: "Name" }), { target: { value: "Test Visitor" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Email" }), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByRole("textbox", { name: "Message" }), { target: { value: "An intentional test message for the mocked sender." } });
}

describe("contact form protections", () => {
  it("validates fields before invoking the sender", () => {
    render(<Contact />);
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(screen.getByText("Name is required")).toBeInTheDocument();
    expect(screen.getByText("Email is required")).toBeInTheDocument();
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });
  it("ignores a filled honeypot", () => {
    render(<Contact />);
    completeForm();
    fireEvent.change(document.getElementById("contact-website")!, { target: { value: "https://spam.example" } });
    fireEvent.click(screen.getByRole("button", { name: "Send Message" }));
    expect(emailjs.sendForm).not.toHaveBeenCalled();
  });
  it("prevents duplicate submissions while a message is in flight", () => {
    vi.mocked(emailjs.sendForm).mockImplementationOnce(() => new Promise(() => {}));
    const { container } = render(<Contact />);
    completeForm();
    fireEvent.submit(container.querySelector("form")!);
    fireEvent.submit(container.querySelector("form")!);
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  });
  it("reports sender errors and enforces a retry cooldown", async () => {
    vi.mocked(emailjs.sendForm).mockRejectedValueOnce(new Error("offline"));
    const { container } = render(<Contact />);
    completeForm();
    fireEvent.submit(container.querySelector("form")!);
    expect(await screen.findByRole("alert")).toHaveTextContent("Try again or email me directly");
    fireEvent.submit(container.querySelector("form")!);
    await waitFor(() => expect(screen.getByRole("alert")).toHaveTextContent("Please wait 30 seconds"));
    expect(emailjs.sendForm).toHaveBeenCalledTimes(1);
  });
});
