import { beforeEach, describe, expect, test, vi } from "vitest";
import { loginAndStartSession } from "../supabase";
import supabase from "../supabaseClient";

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      signInWithPassword: vi.fn(),
    },
  },
}));

beforeEach(() => {
  vi.clearAllMocks();
});

const signInWithPasswordMock = vi.mocked(supabase.auth.signInWithPassword);

describe("loginAndStartSession", () => {
  test("it successfully logs in the user and starts a user session", async () => {
    signInWithPasswordMock.mockResolvedValue({
      data: {
        user: { id: "user-1", email: "mrtest@testing.com" },
        session: { access_token: "token" },
      },
      error: null,
    });

    const result = await loginAndStartSession(
      "mrtest@testing.com",
      "testpassword"
    );

    expect(result.success).toBe(true);
    expect(signInWithPasswordMock).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "mrtest@testing.com",
        password: "testpassword",
      })
    );
    expect(result.user).toEqual(expect.objectContaining({ id: "user-1" }));
  });
  test("it returns failure when log in is unsuccessful", async () => {
    signInWithPasswordMock.mockResolvedValue({
      data: {
        user: null,
        session: null,
      },
      error: new Error("Login unsuccessful"),
    });

    const result = await loginAndStartSession(
      "mrtest@testing.com",
      "testpassword"
    );

    expect(result.success).toBe(false);
    expect(result.error).toBeDefined();
    expect(signInWithPasswordMock).toHaveBeenCalled();
  });
});
