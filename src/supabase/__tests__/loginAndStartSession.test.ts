import { beforeEach, describe, expect, test, vi } from "vitest";
import { loginAndStartSession } from "../supabase";
import supabase from "../supabaseClient";
import type { User, Session, AuthError } from "@supabase/supabase-js";

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

const createMockUser = (overrides?: Partial<User>): User => ({
  id: "user-1",
  aud: "authenticated",
  created_at: new Date().toISOString(),
  app_metadata: {},
  user_metadata: {},
  ...overrides,
});

const createMockSession = (user: User): Session => ({
  access_token: "token",
  refresh_token: "refresh",
  expires_in: 3600,
  token_type: "bearer",
  user,
});

beforeEach(() => {
  vi.clearAllMocks();
});

const signInWithPasswordMock = vi.mocked(supabase.auth.signInWithPassword);

describe("loginAndStartSession", () => {
  test("it successfully logs in the user and starts a user session", async () => {
    const user = createMockUser({
      email: "mrtest@testing.com",
    });

    const session = createMockSession(user);

    signInWithPasswordMock.mockResolvedValue({
      data: { user, session },
      error: null,
    });

    const result = await loginAndStartSession(
      "mrtest@testing.com",
      "testpassword"
    );

    expect(result.success).toBe(true);
    expect(result.user).toEqual(expect.objectContaining({ id: "user-1" }));
  });
  test("it returns failure when log in is unsuccessful", async () => {
    signInWithPasswordMock.mockResolvedValue({
      data: { user: null, session: null },
      error: {
        message: "Login unsuccessful",
      } as unknown as AuthError,
    });

    const result = await loginAndStartSession(
      "mrtest@testing.com",
      "testpassword"
    );

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
  });
});
