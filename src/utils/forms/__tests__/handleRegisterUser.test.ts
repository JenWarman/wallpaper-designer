import { beforeEach, describe, expect, test, vi } from "vitest";
import { signUpAndCreateAccount } from "../../../supabase/supabase";
import { handleRegisterUser } from "../handleRegisterUser";
import type { AuthError, User } from "@supabase/supabase-js";

vi.mock("../../../supabase/supabase", () => ({
  signUpAndCreateAccount: vi.fn(),
}));

describe("handleRegisterUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("it returns a welcome message when registration is successful", async () => {
    vi.mocked(signUpAndCreateAccount).mockResolvedValue({ success: true });

    const formData = new FormData();
    formData.append("email", "test@test.com");
    formData.append("password", "Pa$$word99");
    formData.append("username", "mr test");

    const result = await signUpAndCreateAccount({} as any, formData);

    expect(result.success).toBe(true);
  });
  test("it returns an error if the form is invalid", async () => {
    const formData = new FormData();

    const result = await handleRegisterUser({} as any, formData);

    expect(result).toEqual({
      message: "Please enter a valid username, email and password",
    });
  });
  test("it returns an error if registration fails", async () => {
    vi.mocked(signUpAndCreateAccount).mockResolvedValue({ success: false });

    const formData = new FormData();
    formData.append("email", "test@test.com");
    formData.append("password", "password");
    formData.append("username", "mr test");

    const result = await handleRegisterUser({} as any, formData);

    expect(result).toEqual({
      message: "Invalid username, email or pasword",
    });
  });
});
