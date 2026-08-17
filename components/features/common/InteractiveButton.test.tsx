import { cleanup, render, screen } from "@testing-library/react";
import InteractiveButton from "./InteractiveButton";
import { describe, it, expect, vi, afterEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
afterEach(() => {
  cleanup();
});
describe("InteractiveButton", () => {
  it("renders the provided name", () => {
    render(<InteractiveButton name="test" onClick={() => {}} />);
    const button = screen.getByRole("button", { name: "test" });
    expect(button).toBeInTheDocument();
  });
  it("calls onClick when clicked", async () => {
    const handleClick = vi.fn();
    render(<InteractiveButton name="test" onClick={handleClick} />);
    const button = screen.getByRole("button", { name: "test" });
    await userEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
