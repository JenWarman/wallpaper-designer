import { afterEach, describe, expect, test, vi } from "vitest";
import { Modal } from "./Modal";
import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
const mockOnClose = vi.fn();
const mockDelete = vi.fn()

vi.mock("react-router", () => ({
  useNavigate: () => mockNavigate,
}));

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

vi.mock("../Cta/Cta", () => ({
  Cta: ({ label, ctaFunction }: any) => (
    <button onClick={ctaFunction}>{label}</button>
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
    render(<Modal url="url" design={mockDesign} onClose={mockOnClose} />);
    expect(screen.getByTestId("modal")).toBeInTheDocument();
  });
  test("it renders modal content", () => {
    render(<Modal url="url" design={mockDesign} onClose={mockOnClose} />);

    expect(screen.getByText("PatternDesign")).toBeInTheDocument()
  })
  test("onClose function is called when close button is clicked", async () => {
    render(<Modal url="url" design={mockDesign} onClose={mockOnClose} />);

    const user = userEvent.setup()
    
    await user.click(screen.getByTestId("modalClose"))

    expect(mockOnClose).toHaveBeenCalled()
  })
  test("edit Cta navigates to the DesignForm", async ()=> {
    render(<Modal url="url" design={mockDesign} onClose={mockOnClose} />);

    const user = userEvent.setup()
    
    await user.click(screen.getByLabelText("edit your design"))
    expect(mockNavigate).toHaveBeenCalledWith("/design?url")
  })
  test("order Cta navigates to the OrderForm", async ()=> {
    render(<Modal url="url" design={mockDesign} onClose={mockOnClose} />);

    const user = userEvent.setup()
    
    await user.click(screen.getByLabelText("order your design"))
    expect(mockNavigate).toHaveBeenCalledWith("/order?url")
  })
});
