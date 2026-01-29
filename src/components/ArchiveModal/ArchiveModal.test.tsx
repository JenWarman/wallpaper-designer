import { afterEach, describe, expect, test, vi } from "vitest";
import { ArchiveModal } from "./ArchiveModal";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  deleteDesignByUserId,
  updateProgressStatusByDesign,
} from "../../supabase/supabase";

const mockNavigate = vi.fn();
const mockOnClose = vi.fn();

vi.mock("../../supabase/supabase", () => ({
  updateProgressStatusByDesign: vi.fn(),
  deleteDesignByUserId: vi.fn(),
}));

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

vi.mock("../Cta/Cta", () => ({
  Cta: ({ label, ctaFunction, ariaLabel }: any) => (
    <button onClick={ctaFunction} aria-label={ariaLabel}>{label}</button>
  ),
}));

const mockDesign = {
  theme: "floral",
  motif: "rose",
  scale: "large",
  colour: "blue",
  repeat: "tile",
};

describe("ArchiveModal", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );
    expect(screen.getByTestId("modalArchive")).toBeInTheDocument();
  });
  test("it renders modal content", () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );

    expect(screen.getByText("PatternDesign")).toBeInTheDocument();
  });
  test("onClose function is called when close button is clicked", async () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByTestId("modalClose"));

    expect(mockOnClose).toHaveBeenCalled();
  });
  test("edit Cta navigates to the DesignForm", async () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("edit your design"));
    expect(mockNavigate).toHaveBeenCalledWith("/design?url");
  });
  test("restore Cta calls updateProgressStatusByDesign", async () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("restore your design"));

    expect(updateProgressStatusByDesign).toHaveBeenCalledWith(
      "url",
      "archived",
      "saved",
    );

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/saved-designs");
    });
  });
  test("inital delete Cta shows delete confirmation", async () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("delete your design"));

    expect(screen.getByText("Are you sure you want to delete this design?")).toBeInTheDocument()
  });
  test("confirm delete Cta calls updateProgressStatusByDesign", async () => {
    render(
      <ArchiveModal url="url" design={mockDesign} onClose={mockOnClose} />,
    );

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("delete your design"));
    await user.click(screen.getByLabelText("confirm delete"));

    expect(deleteDesignByUserId).toHaveBeenCalledWith("url");
  });
});
