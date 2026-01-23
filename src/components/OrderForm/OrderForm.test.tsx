import { afterEach, describe, expect, test, vi } from "vitest";
import { OrderForm } from "./OrderForm";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

vi.mock("../Order/Order", () => ({
  Order: () => <div>Order</div>,
}));

vi.mock("../../supabase/supabase", () => ({
    fetchDesignsByUserId: vi.fn(() => Promise.resolve({
        data: [
            {
                design_url: "url",
                design_data: {
                    theme: "floral",
                    motif: "rose",
                    scale: "small",
                    colour: "pink",
                    repeat: "tile"
                }
            }
        ]
    }))
}))

vi.mock("../../utils/forms/formValidation", () => ({
    validateMeasurement: () => "Invalid measurement"
}))

describe("OrderForm", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(<OrderForm />);
    expect(screen.getByTestId("orderForm")).toBeInTheDocument();
  });
  test("it renders the PatternDesign component", () => {
    render(<OrderForm />);

    expect(screen.getByText("PatternDesign")).toBeInTheDocument();
  });
  test("it updates width and height when input value changes", () => {
    render(<OrderForm/>)
    const width = screen.getByLabelText(/width of wall/)
    fireEvent.change(width, {target: {value: "450"}})
    expect(width).toHaveValue(450)

    const height = screen.getByLabelText(/height of wall/)
    fireEvent.change(height, {target: {value: "250"}})
    expect(height).toHaveValue(250)
  })
  test("validation error is shown onBlur", () => {
    render(<OrderForm/>)

    const width = screen.getByLabelText(/width of wall/)
    fireEvent.blur(width)
    expect(screen.getByText("Invalid measurement")).toBeInTheDocument()
  })
  test("does not render Order component initially", () => {
    render(<OrderForm/>)
    expect(screen.queryByText("Order")).not.toBeInTheDocument()
  })
});
