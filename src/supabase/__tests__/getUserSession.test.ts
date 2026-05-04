import { describe, expect, test, vi } from "vitest";
import { getUserSession } from "../supabase";
import supabase from "../supabaseClient";

import type { Session } from "@supabase/supabase-js";

const mockSession: Session = {
  access_token: "token",
  refresh_token: "refresh",
  expires_in: 3600,
  token_type: "bearer",
  user: {
    id: "user-1",
    aud: "authenticated",
    created_at: new Date().toISOString(),
    app_metadata: {},
    user_metadata: { username: "MrTest" },
  },
};

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
  data: { session: mockSession },
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
    vi.mocked(supabase.auth.getSession).mockResolvedValue({ data: { session: null }, error: null });

    const result = await getUserSession();

    expect(result).toEqual({ success: false, error: mockError });
  });
});
