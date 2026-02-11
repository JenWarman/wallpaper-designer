import { afterEach, describe, expect, test, vi } from "vitest";
import { Modal } from "./Modal";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockOnClose = vi.fn();
const mockMainCta = vi.fn();
const mockSecondaryCta = vi.fn();
const mockTertiaryCta = vi.fn();
const mockConfirmDelete = vi.fn();
const mockCancelDelete = vi.fn();

const defaultProps = {
  url: "url",
  onClose: mockOnClose,
  mainCtaFunction: mockMainCta,
  mainCtaLabel: "order",
  secondaryCtaFunction: mockSecondaryCta,
  secondaryCtaLabel: "edit",
  tertiaryCtaFunction: mockTertiaryCta,
  tertiaryCtaLabel: "archive",
};

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

vi.mock("../Cta/Cta", () => ({
  Cta: ({ label, ctaFunction, ariaLabel, dataTestId }: any) => (
    <button onClick={ctaFunction} aria-label={ariaLabel} data-testid={dataTestId}>{label}</button>
  ),
}));

const mockDesign = {
  theme: "floral",
  motif: "rose",
  scale: "large",
  colour: "blue",
  repeat: "tile",
};

describe("Modal", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(<Modal {...defaultProps} />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  test("it renders PatternDesign", () => {
    render(<Modal {...defaultProps} />);

    expect(screen.getByText("PatternDesign")).toBeInTheDocument();
  });
  test("onClose function is called when close button is clicked", async () => {
    render(<Modal {...defaultProps} />);

    const user = userEvent.setup();

    await user.click(screen.getByTestId("modalClose"));

    expect(mockOnClose).toHaveBeenCalled();
  });
  test("it calls mainCtaFunction when main cta is clicked", async () => {
    render(<Modal {...defaultProps} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("order your design"));
    expect(mockMainCta).toHaveBeenCalled();
  });
  test("it calls secondaryCtaFunction when secondary cta is clicked", async () => {
    render(<Modal {...defaultProps} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("edit your design"));
    expect(mockSecondaryCta).toHaveBeenCalled();
  });
  test("it calls tertiaryCtaFunction when tertiary cta is clicked", async () => {
    render(<Modal {...defaultProps} />);

    const user = userEvent.setup();

    await user.click(screen.getByLabelText("archive your design"));
    expect(mockTertiaryCta).toHaveBeenCalled();
  });
  test("it renders delete confirmation when confirmDelete is true", async() => {
    render(
      <Modal
        {...defaultProps}
        confirmDelete
        onConfirmDelete={mockConfirmDelete}
        onCancelDelete={mockCancelDelete}
      />,
    );
    const user = userEvent.setup();

    await user.click(screen.getByLabelText("confirm delete"));
    expect(mockConfirmDelete).toHaveBeenCalled()

    await user.click(screen.getByLabelText("cancel deletion"));
    expect(mockCancelDelete).toHaveBeenCalled()
  });
});
