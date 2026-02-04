import { signUpAndCreateAccount } from "../../supabase/supabase";
import type { FormState } from "../../types/types";

export const handleRegisterUser = async (
  prevState: FormState,
  formData: FormData
): Promise<FormState> => {
  const username = formData.get("username");
  const email = formData.get("email");
  const password = formData.get("password");
  if (
    typeof username !== "string" ||
    typeof email !== "string" ||
    typeof password !== "string"
  ) {
    return { message: "Please enter a valid username, email and password" };
  }

  const result = await signUpAndCreateAccount({ username, email, password });

  if (!result.success) {
    return { message: "Invalid username, email or pasword" };
  }

  return { message: `Welcome ${username}` };
};