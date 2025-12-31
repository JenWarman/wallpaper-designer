import { describe, expect, test, vi } from "vitest";
import { getUserSession } from "../supabase";
import supabase from "../supabaseClient";

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      getSession: vi.fn(),
    },
  },
}));

describe("getUserSession", () => {
  test("successfully gets session data", async () => {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: {
        session: {
          user: { id: "user-1", user_metadata: { username: "MrTest" } },
        },
      },
      error: null,
    });

    const result = await getUserSession();

    expect(result).toEqual({
      success: true,
      user_id: "user-1",
      username: "MrTest",
    });
  });
  test("it returns an error when session does not exist", async () => {
    const mockError = new Error("Session error");
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: null,
      error: mockError,
    });

    const result = await getUserSession();

    expect(result).toEqual({ success: false, error: mockError });
  });
});
