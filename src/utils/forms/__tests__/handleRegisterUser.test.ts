import { beforeEach, describe, expect, test, vi } from "vitest";
import { signUpAndCreateAccount } from "../../../supabase/supabase";
import { handleRegisterUser } from "../handleRegisterUser";
import type { User, Session } from "@supabase/supabase-js";
import type { FormState, NewUser } from "../../../types/types";

vi.mock("../../../supabase/supabase", () => ({
  signUpAndCreateAccount: vi.fn(),
}));

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

const newUser: NewUser = {
  username: "mr test",
  email: "test@test.com",
  password: "Pa$$word99",
};

describe("handleRegisterUser", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("it returns a welcome message when registration is successful", async () => {
    vi.mocked(signUpAndCreateAccount).mockResolvedValue({
      success: true,
      user: {
        user: mockUser,
        session: mockSession,
      },
      account: null,
    });

    const formData = new FormData();
    formData.append("email", "test@test.com");
    formData.append("password", "Pa$$word99");
    formData.append("username", "mr test");

    const result = await signUpAndCreateAccount(newUser);

    expect(result.success).toBe(true);
  });
  test("it returns an error if the form is invalid", async () => {

    const result = await signUpAndCreateAccount(newUser);

    expect(result).toEqual({
      message: "Please enter a valid username, email and password",
    });
  });
  test("it returns an error if registration fails", async () => {
   vi.mocked(signUpAndCreateAccount).mockResolvedValue({
  success: false,
  user: {
    user: null,
    session: null,
  },
  account: null,
});

    const formData = new FormData();
    formData.append("email", "test@test.com");
    formData.append("password", "password");
    formData.append("username", "mr test");

   const result = await handleRegisterUser({} as FormState, formData);

    expect(result).toEqual({
      message: "Invalid username, email or pasword",
    });
  });
});
