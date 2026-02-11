import { afterEach, describe, expect, test, vi } from "vitest";
import { Archive } from "./Archive";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";


vi.mock("../../hooks/useStatusToSearchDesigns", () => ({
  default: vi.fn(),
}));

vi.mock("../Card/Card", () => ({
  Card: ({handleClick}: any) => (
    <button onClick={handleClick}>Card</button>
  )
}))

vi.mock("../Modal/Modal", () => ({
  Modal: ({ onClose }: any) => (
    <div data-testid="modal">
     <button aria-label="close modal" onClick={onClose}>Close</button>
    </div>
  ),
}));

const mockDesigns = [
  {
    design_url: "url",
    design_data: {
      theme: "floral",
      motif: "rose",
      scale: "large",
      colour: "blue",
      repeat: "tile",
    },
    id: 1,
    user_id: "user-1",
    created_at: "",
  },
];

describe("SavedDesigns", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    vi.mocked(useStatusToSearchDesigns).mockReturnValue({
      filteredDesigns: [],
    });
    render(
      <MemoryRouter>
        <Archive />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("archive")).toBeInTheDocument();
  });
  test("it shows saved designs", async () => {
    vi.mocked(useStatusToSearchDesigns).mockReturnValue({
      filteredDesigns: mockDesigns,
    });

    render(
      <MemoryRouter>
        <Archive />
      </MemoryRouter>,
    );

    expect(await screen.getByText("Card")).toBeInTheDocument();
  });
  test("Modal opens when a card is clicked", async () => {
    vi.mocked(useStatusToSearchDesigns).mockReturnValue({
      filteredDesigns: mockDesigns,
    });

    render(
      <MemoryRouter>
        <Archive />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.click(await screen.getByText("Card"));

    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  test("close button closes modal", async () => {
    vi.mocked(useStatusToSearchDesigns).mockReturnValue({
      filteredDesigns: mockDesigns,
    });

    render(
      <MemoryRouter>
        <Archive />
      </MemoryRouter>,
    );

    const user = userEvent.setup();

    await user.click(await screen.getByText("Card"));
    await user.click(screen.getByLabelText("close modal"));
    expect(screen.queryByTestId("modal")).not.toBeInTheDocument();
  });
});
