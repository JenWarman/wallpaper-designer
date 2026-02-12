import { beforeEach, describe, expect, test, vi } from "vitest";
import { Admin } from "./Admin";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";
import { insertProgressStatus } from "../../supabase/supabase";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

vi.mock("../../hooks/useStatusToSearchDesigns");
vi.mock("../../supabase/supabase");

const mockUseStatusToSearchDesigns =
  useStatusToSearchDesigns as unknown as vi.mock;

describe("Admin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    cleanup();

    mockUseStatusToSearchDesigns.mockReturnValue({
      filteredDesigns: [
        {
          design_url: "design-1",
          created_at: "2026-01-01",
        },
        {
          design_url: "design-2",
          created_at: "2026-01-02",
        },
      ],
    });
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });
  test("it renders the component", () => {
    render(<Admin />);
    expect(screen.getByTestId("admin")).toBeInTheDocument();
  });
  test("it updates order status when Update cta is clicked", async () => {
    render(<Admin />);

    const orderDropDown = screen.getByLabelText("Select an order");
    const updateCta = screen.getByRole("button", { name: /update/i });

    fireEvent.change(orderDropDown, {
      target: { value: "design-1" },
    });

    fireEvent.click(updateCta);

    await waitFor(() => {
      expect(insertProgressStatus).toHaveBeenCalledWith(
        "design-1",
        "production",
      );
    });
  });
});
