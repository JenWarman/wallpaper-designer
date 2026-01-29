import { afterEach, describe, expect, test, vi } from "vitest";
import { Archive } from "./Archive";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import useStatusToSearchDesigns from "../../hooks/useStatusToSearchDesigns";


vi.mock("../../hooks/useStatusToSearchDesigns", () => ({
  default: vi.fn(),
}));

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

vi.mock("../ArchiveModal/ArchiveModal", () => ({
  ArchiveModal: ({ onClose }: any) => (
    <div data-testid="modalArchive" aria-label="close" onClick={onClose}>
      ArchiveModal
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

    expect(await screen.findByText("PatternDesign")).toBeInTheDocument();
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

    await user.click(await screen.findByText("PatternDesign"));

    expect(screen.getByTestId("modalArchive")).toBeInTheDocument();
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

    await user.click(await screen.findByText("PatternDesign"));
    await user.click(screen.getByLabelText("close"));
    expect(screen.queryByTestId("modalArchive")).not.toBeInTheDocument();
  });
});
