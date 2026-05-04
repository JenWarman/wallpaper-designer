import { describe, expect, test, vi } from "vitest";
import { fetchProgressStatusByUserId } from "../supabase";
import supabase from "../supabaseClient";
import type { User } from "@supabase/supabase-js";

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

const user_id = "user-1";

const mockUser: User = {
  id: user_id,
  aud: "authenticated",
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
};

describe("fetchProgressStatusByUserId", () => {
  test("successfully returns progress status for logged-in user", async () => {
    const mockProgressData = [
      {
        id: 1,
        user_id,
        design: "DESIGN-1",
        status: "ordered",
      },
    ];

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: { id: user_id } as User,
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

    const result = await fetchProgressStatusByUserId();

    expect(result?.success).toBe(true);
    expect(result?.status).toEqual(mockProgressData);
    expect(selectMock).toHaveBeenCalledWith("*");
    expect(eqMock).toHaveBeenCalledWith("user_id", user_id);
  });

  test("returns failure when query errors", async () => {
    const error = new Error("Query failed");

    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: mockUser,
      },
      error: null,
    });

    const eqMock = vi.fn().mockResolvedValue({ data: null, error });

    const selectMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      select: selectMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await fetchProgressStatusByUserId();

    expect(result?.success).toBe(false);
    expect(result?.error).toBe(error);
  });
});