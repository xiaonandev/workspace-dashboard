import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import WorkspaceFilters from "./WorkspaceFilters";
import userEvent from "@testing-library/user-event";

afterEach(() => {
  cleanup();
});
const { pushMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
}));
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: pushMock,
    replace: vi.fn(),
  }),

  useSearchParams: () => new URLSearchParams(),
}));
describe("WorkspaceFilters", () => {
  it("changes URL when type is selected", async () => {
    const user = userEvent.setup();
    render(<WorkspaceFilters />);

    const typeFilter = screen.getByRole("combobox", {
      name: "type",
    });
    await user.selectOptions(typeFilter, "Desk");

    expect(pushMock).toHaveBeenCalledWith("/workspaces?type=Desk");
  });
});
