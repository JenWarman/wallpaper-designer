import { beforeEach, describe, expect, test, vi } from "vitest";
import supabase from "../supabaseClient";
import { signUpAndCreateAccount } from "../supabase";
import type { User, Session } from "@supabase/supabase-js";
import { AuthError } from "@supabase/supabase-js";

const mockUser: User = {
  id: "user-1",
  aud: "authenticated",
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
};

const mockSession: Session = {
  access_token: "token",
  refresh_token: "refresh",
  expires_in: 3600,
  token_type: "bearer",
  user: mockUser,
};

const mockAuthError = new AuthError("Signup failed!", 400, "mock_error");

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      signUp: vi.fn(),
    },
    from: vi.fn(),
  },
}));

describe("signUpAndCreateAccount", () => {
  const newUser = {
    username: "test",
    email: "test@example.com",
    password: "test1234",
  };

  const signUpMock = vi.mocked(supabase.auth.signUp);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("it signs up a new using adding them to the auth table and inserts them into the usersAccount table.", async () => {
    signUpMock.mockResolvedValue({
      data: {
        user: mockUser,
        session: mockSession,
      },
      error: null,
    });

    const insertMock = vi
      .fn()
      .mockResolvedValue({
        data: [{ id: "user-1", username: "test" }],
        error: null,
      });

    vi.mocked(supabase.from).mockReturnValue({ insert: insertMock } as unknown as ReturnType<typeof supabase.from>);

    const result = await signUpAndCreateAccount(newUser);

    expect(result.success).toBe(true);
    expect(signUpMock).toHaveBeenCalledOnce();
    expect(insertMock).toHaveBeenCalledWith(
      expect.objectContaining({
        user_id: "user-1",
        username: "test",
      })
    );
    expect(result.user).toBeDefined();
    expect(result.user?.user?.id).toBe("user-1");
  });
  test("it returns failure when signup is unsuccessful and account can not be created", async () => {
    signUpMock.mockResolvedValue({
      data: {
        user: null,
        session: null,
      },
      error: mockAuthError,
    });

    const fromSpy = vi.spyOn(supabase, "from");

    const result = await signUpAndCreateAccount(newUser);

    expect(result.success).toBe(false);
    expect(result.signUpError).toBeDefined();
    expect(signUpMock).toHaveBeenCalled();
    expect(fromSpy).not.toHaveBeenCalled();
  });
});
