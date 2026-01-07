import {
  loginAndStartSession,
  signUpAndCreateAccount,
} from "../supabase/supabase";
import type { FormState, OrderFormState } from "../types/types";
import { calculatePrice, calculateQuantity } from "./calculateWallpaper";

export const handleLoginAndStartSession = async (
  prevState: FormState,
  formData: FormData
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

export const handleCalculatePrice = async (
  prevState: OrderFormState,
  formData: FormData
): Promise<OrderFormState> => {
  const width = formData.get("width") as string;
  const height = formData.get("height") as string;
  const design = "Design-1";
  const cms = formData.get("cms") as string;
  const inches = formData.get("inches") as string;

  if (!width || !height || !design) {
    return {
      message: "Please enter valid measurements",
      quantity: 0,
      price: 0,
    };
  }

  let measurement;
  if (cms) {
    measurement = "cms";
  } else {
    measurement = "inches";
  }

  const quantity = calculateQuantity(
    parseInt(width),
    parseInt(height),
    measurement
  );
  const price = calculatePrice(quantity);

  return { message: `Total price: £${price}`, quantity, price };
};
