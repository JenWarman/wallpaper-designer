import { afterEach, describe, expect, test, vi } from "vitest";
import { PlacedOrders } from "./PlacedOrders";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter} from "react-router";
import { fetchDesignsByUserId, fetchOrderByUserId } from "../../supabase/supabase";
import userEvent from "@testing-library/user-event";

vi.mock("../../supabase/supabase", () => ({
  fetchOrderByUserId: vi.fn(),
  fetchDesignsByUserId: vi.fn()
}));

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

const mockNavigate = vi.fn()

vi.mock("react-router", async () => {
  const actual = await vi.importActual<typeof import("react-router")>("react-router")
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
});

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

const mockOrders = [
  {
    id:1,
    design: "url",
    created_at: "some date"
  }
]

describe("PlacedOrders", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <PlacedOrders />
      </MemoryRouter>,
    );

    expect(screen.getByTestId("placedOrders")).toBeInTheDocument();
  });
  test("it renders the PatternDesign component", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({data: mockDesigns});
    (fetchOrderByUserId as any).mockResolvedValue({data: mockOrders});
    render(
      <MemoryRouter>
        <PlacedOrders />
      </MemoryRouter>,
    );

    expect(await screen.findByText("PatternDesign")).toBeInTheDocument();
  });
  test("onClick navigates to order-tracking page", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({data: mockDesigns});
    (fetchOrderByUserId as any).mockResolvedValue({data: mockOrders});
     const user = userEvent.setup()
    render(
      <MemoryRouter>
        <PlacedOrders />
      </MemoryRouter>,
    );

   await user.click(await screen.findByText("PatternDesign"))
    expect(mockNavigate).toHaveBeenCalledWith("/order-tracking?url")
  })
});

