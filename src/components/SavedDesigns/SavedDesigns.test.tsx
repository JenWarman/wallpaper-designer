import { afterEach, describe, expect, test, vi } from "vitest";
import { SavedDesigns } from "./SavedDesigns";
import { cleanup, render, screen } from "@testing-library/react";
import { fetchDesignsByUserId } from "../../supabase/supabase";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";

vi.mock("../../supabase/supabase", () => ({
  fetchDesignsByUserId: vi.fn(),
}));

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

const mockDesigns = [
  {
    id: 1,
    design_url: "url",
    design_data: {
      theme: "floral",
      motif: "rose",
      scale: "large",
      colour: "blue",
      repeat: "tile",
    },
    created_at: "",
    status: true,
    user_id: "user-1",
  },
];

describe("SavedDesigns", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(<SavedDesigns />);

    expect(screen.getByTestId("savedDesigns")).toBeInTheDocument();
  });
  test("it fetchs and shows saved designs", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({ data: mockDesigns });

    render(<SavedDesigns />);

    expect(await screen.findByText("PatternDesign")).toBeInTheDocument();
  });
  test("Modal opens when a card is clicked", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({ data: mockDesigns });

    render(
      <MemoryRouter>
        <SavedDesigns />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.click(await screen.findByText("PatternDesign"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  test("close button closes modal", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({ data: mockDesigns });

    render(
      <MemoryRouter>
        <SavedDesigns />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.click(await screen.findByText("PatternDesign"));
    await user.click(screen.getByLabelText("close"))
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument()
  })
});
