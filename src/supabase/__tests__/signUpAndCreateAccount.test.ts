import { beforeEach, describe, expect, test, vi } from "vitest";
import supabase from "../supabaseClient";
import { signUpAndCreateAccount } from "../supabase";

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
      data: { user: { id: "user-1" } },
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
      data: null,
      error: new Error("Signup failed!"),
    });

    const fromSpy = vi.spyOn(supabase, "from");

    const result = await signUpAndCreateAccount(newUser);

    expect(result.success).toBe(false);
    expect(result.signUpError).toBeDefined();
    expect(signUpMock).toHaveBeenCalled();
    expect(fromSpy).not.toHaveBeenCalled();
  });
});
