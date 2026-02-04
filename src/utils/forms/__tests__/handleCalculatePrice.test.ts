import { describe, expect, test, vi } from "vitest";
import { handleCalculatePrice } from "../handleCalculatePrice";

vi.mock("../calculateQuantity", () => ({
  calculateQuantity: vi.fn(() => 10),
}));

vi.mock("../calculatePrice", () => ({
  calculatePrice: vi.fn(() => 50),
}));

describe("handleCalculatePrice", () => {
  test("it returns an object with a message, quanity and price", async () => {
    const formData = new FormData();
    formData.append("width", "100");
    formData.append("height", "200");
    formData.append("measurement", "cms");

    const result = await handleCalculatePrice({} as any, formData);

    expect(result).toEqual({
      message: "Total price: £48",
      quantity: 1,
      price: 48,
    });
  });
  test("it returns error when width or height as invalid", async () => {
    const formData = new FormData();

    const result = await handleCalculatePrice({} as any, formData);

    expect(result).toEqual({
      message: "Please enter valid measurements",
      quantity: 0,
      price: 0,
    });
  });
});
