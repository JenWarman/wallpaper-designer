import { afterEach, describe, expect, test, vi } from "vitest";
import { Order } from "./Order";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { updateOrderByUserId } from "../../supabase/supabase";

const mockOrderData = {
  price: 350,
  quantity: 4,
  design: {
    theme: "floral",
    motif: "rose",
    scale: "small",
    colour: "pink",
    repeat: "tile",
  },
};

const mockDesignUrl = "url";

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

vi.mock("../../supabase/supabase", () => ({
  updateOrderByUserId: vi.fn(),
}));

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Order", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <Order order={mockOrderData} designUrl={mockDesignUrl} />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("order")).toBeInTheDocument();
  });
  test("it renders the PatternDesign component", () => {
    render(
      <MemoryRouter>
        <Order order={mockOrderData} designUrl={mockDesignUrl} />
      </MemoryRouter>,
    );

    expect(screen.getByText("PatternDesign")).toBeInTheDocument();
  });
  test("Order Cta calls updateOrderByUserId", async () => {
    render(
      <MemoryRouter>
        <Order order={mockOrderData} designUrl={mockDesignUrl} />
      </MemoryRouter>,
    );

    const orderCta = screen.getByText("Order");
    fireEvent.click(orderCta);

    expect(updateOrderByUserId).toHaveBeenCalledWith(
      mockOrderData.quantity,
      mockOrderData.price,
      mockDesignUrl,
    );

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/your-orders");
    });
  });
  test("Cancel Cta navigates back to your designs page", async () => {
    render(
      <MemoryRouter>
        <Order order={mockOrderData} designUrl={mockDesignUrl} />
      </MemoryRouter>,
    );

    const orderCta = screen.getByText("Cancel");
    fireEvent.click(orderCta);

    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/saved-designs");
    });
  })
});
