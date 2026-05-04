import type { OrderFormState } from "../../types/types";
import { calculatePrice } from "../calculatePrice";
import { calculateQuantity } from "../calculateQuantity";

export const handleCalculatePrice = async (
  _: OrderFormState,
  formData: FormData
): Promise<OrderFormState> => {
  const width = formData.get("width") as string
  const height = formData.get("height") as string
  const measurement = formData.get("measurement") as string

  if (!width || !height) {
    return {
      message: "Please enter valid measurements",
      quantity: 0,
      price: 0,
    };
  }
  const measurementType = measurement === "cms" ? "cms" : "inches";

  const quantity = calculateQuantity(parseInt(width), parseInt(height), measurementType);

  const price = calculatePrice(quantity);

  return { message: `Total price: £${price}`, quantity, price };
};
