import { describe, expect, test, vi } from "vitest";
import supabase from "../supabaseClient";
import { fetchOrderByUserId } from "../supabase";

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

const user_id = "user-1";

describe("fetchOrderByUserId", () => {
  test("it successfully fetchs order data by the user_id", async () => {
    const mockOrderData = [
      {
        id: 1,
        user_id,
        quantity: 5,
        price: 475.99,
      },
    ];

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: { id: user_id},
      },
      error: null,
    });

    const eqMock = vi
      .fn()
      .mockResolvedValue({ data: mockOrderData, error: null });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchOrderByUserId();

    expect(result?.success).toBe(true);
    expect(result?.data).toEqual(mockOrderData);
    expect(selectMock).toHaveBeenCalledWith("*");
    expect(eqMock).toHaveBeenCalledWith("user_id", user_id);
  });
  test("it returns failure when there is a query error", async () => {
    const error = new Error("Query Failed.");

    const eqMock = vi.fn().mockResolvedValue({ data: null, error });

    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchOrderByUserId();

    expect(result?.success).toBe(false);
    expect(result?.error).toBe(error);
  });
});
