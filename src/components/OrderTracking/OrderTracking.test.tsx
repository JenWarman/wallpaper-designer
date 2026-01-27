import { afterEach, describe, expect, test, vi } from "vitest";
import { OrderTracking } from "./OrderTracking";
import {
  cleanup,
  render,
  screen,
} from "@testing-library/react";
import {
  fetchDesignsByUserId,
  fetchProgressStatusByDesign,
} from "../../supabase/supabase";


vi.mock("../../supabase/supabase", () => ({
  fetchProgressStatusByDesign: vi.fn(),
  fetchDesignsByUserId: vi.fn(),
}));

vi.mock("../PatternDesign/PatternDesign", () => ({
  PatternDesign: () => <div>PatternDesign</div>,
}));

Object.defineProperty(window, "location", {
    writable: true,
    value: {href: "http://localhost/order-tracking?url"}
})

const mockDesigns = {data: [
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
]};

const mockProgressStatus = [
  {
    id: 1,
    design: "url",
    status: "ordered",
    user_id: "user-1",
    created_at: "2026-01-21T17:18:30.553478+00:00",
  },
  {
    id: 1,
    design: "url",
    status: "production",
    user_id: "user-1",
    created_at: "2026-01-21T17:18:50.553478+00:00",
  },
];

describe("OrderTracking", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(<OrderTracking />);
    expect(screen.getByTestId("orderTracking")).toBeInTheDocument();
  });
  test("it renders the PatternDesign component", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({ mockDesigns });
    (fetchProgressStatusByDesign as any).mockResolvedValue({
      status: mockProgressStatus,
    });

    render(<OrderTracking />);

    expect(await screen.findByText("PatternDesign")).toBeInTheDocument();
  });
  test("it renders all progress status for a design url", async () => {
    (fetchDesignsByUserId as any).mockResolvedValue({ mockDesigns });
    (fetchProgressStatusByDesign as any).mockResolvedValue({
      status: mockProgressStatus,
    });

    render(<OrderTracking />);

      expect( await screen.findByText(/Order/)).toBeInTheDocument()
      expect( await screen.findByText(/Our/)).toBeInTheDocument()
  });
});


