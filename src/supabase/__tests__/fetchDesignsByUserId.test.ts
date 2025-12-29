import { describe, expect, test, vi } from "vitest";
import { fetchDesignsByUserId } from "../supabase";
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

describe("fetchDesignsByUserId", () => {
    test("it successfully fetches user's designs by user_id", async () => {
        const mockDesignData = [
      {
        id: 1,
        user_id,
        design_url: "design-1"
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
      .mockResolvedValue({ data: mockDesignData, error: null });
    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchDesignsByUserId();

    expect(result?.success).toBe(true);
    expect(result?.data).toEqual(mockDesignData);
    expect(selectMock).toHaveBeenCalledWith("*");
    expect(eqMock).toHaveBeenCalledWith("user_id", user_id);
    })
    test("it returns failure when there is a query error", async () => {
    const error = new Error("Query Failed.");

    const eqMock = vi.fn().mockResolvedValue({ data: null, error });

    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchDesignsByUserId();

    expect(result?.success).toBe(false);
    expect(result?.error).toBe(error);
  });
})