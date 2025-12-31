import { describe, expect, test, vi } from "vitest";
import { fetchProgressStatusByDesign } from "../supabase";
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

describe("fetchProgressStatusByDesign", () => {
    test("successfully returns progress status with a valid design url", async () => {
        const mockProgressData = {
            id: 1, 
            user_id,
            design: "DESIGN-1",
            status: "ordered"
        }
        vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: { id: user_id},
      },
      error: null,
    });
    const eqMock = vi
      .fn()
      .mockResolvedValue({ data: mockProgressData, error: null });

    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

      vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchProgressStatusByDesign("DESIGN-1")

    expect(result?.success).toBe(true)
    expect(result?.status).toEqual(mockProgressData)
    expect(selectMock).toHaveBeenCalledWith("*")
    expect(eqMock).toHaveBeenCalledWith("design", "DESIGN-1")
    })
    test("it returns failure when design url is invalid", async () => {
        const error = new Error("Query Failed.");

    const eqMock = vi.fn().mockResolvedValue({ data: null, error });

    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchProgressStatusByDesign("NO DESIGN");

    expect(result?.success).toBe(false);
    expect(result?.error).toBe(error);
    })
})