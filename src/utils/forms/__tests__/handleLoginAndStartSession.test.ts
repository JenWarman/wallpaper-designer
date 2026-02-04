import { beforeEach, describe, expect, test, vi } from "vitest";

vi.mock("../../../supabase/supabase", () => ({
  loginAndStartSession: vi.fn(),
}));

import { loginAndStartSession } from "../../../supabase/supabase";
import { handleLoginAndStartSession } from "../handleLoginAndStartSession.ts";
import type { AuthError, User } from "@supabase/supabase-js";

describe("handleLoginAndStartSession", () => {
     beforeEach(() => {
    vi.clearAllMocks();
  });
  test("it returns a welcome message when login successful", async () => {
    vi.mocked(loginAndStartSession).mockResolvedValue({ success: true, user: {} as User});

    const formData = new FormData();
    formData.append("email", "test@test.com");
    formData.append("password", "Pa$$word99");

    const result = await handleLoginAndStartSession({} as any, formData);

    expect(result).toEqual({
      message: "Welcome back test@test.com",
    });
  });
  test("it returns an error if email or password are missing", async () => {
    const formData = new FormData();

    const result = await handleLoginAndStartSession({} as any, formData);

    expect(result).toEqual({
      message: "Please enter a valid email and password",
    });
  });
  test("it returns an error if email or password are invalid", async () => {
    vi.mocked(loginAndStartSession).mockResolvedValue({ success: false, error: {} as AuthError });

    const formData = new FormData();
    formData.append("email", "test@test.com");
    formData.append("password", "password");

    const result = await handleLoginAndStartSession({} as any, formData);

    expect(result).toEqual({
      message: "Invalid email or password.",
    });
  })
});
