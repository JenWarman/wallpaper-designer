import { beforeEach, describe, expect, test, vi } from "vitest";
import { updateOrderByUserId } from "../supabase";
import supabase from "../supabaseClient";

vi.mock("../supabaseClient", () => ({
 default: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

const user_id = "user-1";

beforeEach(() => {
  vi.clearAllMocks();
});

describe("updateOrderByUserId", () => {
  test("it successfully inserts order into order table using user_id", async () => {
      vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: { id: user_id},
      },
      error: null,
    });

    const insertMock = vi.fn().mockResolvedValue({
      data: [{ id: "user-1", quantity: 4, price: 350.79 }],
      error: null,
    });

    vi.mocked(supabase.from).mockReturnValue({
      insert: insertMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await updateOrderByUserId(4, 350.79);
    expect(result?.success).toBe(true);
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        quantity: 4,
        price: 350.79,
      })
    );
    expect(result?.orders).toBeDefined();
  });
  test("it returns failure when user_id is invalid", async () => {
    const insertMock = vi.fn().mockResolvedValue({
      data: null,
      error: new Error("Query Failure"),
    });

     vi.mocked(supabase.from).mockReturnValue({
      insert: insertMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await updateOrderByUserId(4, 350.99);

    expect(result?.success).toBe(false);
    expect(insertMock).toHaveBeenCalled()
    expect(supabase.from).toHaveBeenCalledWith("orders")
  })
});
