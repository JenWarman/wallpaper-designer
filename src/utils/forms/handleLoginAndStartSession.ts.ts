import { loginAndStartSession } from "../../supabase/supabase";
import type { FormState } from "../../types/types";

export const handleLoginAndStartSession = async (
  prevState: FormState,
  formData: FormData,
): Promise<FormState> => {
  const email = formData.get("email");
  const password = formData.get("password");
  if (typeof email !== "string" || typeof password !== "string") {
    return { message: "Please enter a valid email and password" };
  }
  const result = await loginAndStartSession(email, password);

  if (!result.success) {
    return { message: "Invalid email or password." };
  }
  return { message: `Welcome back ${email}` };
};
