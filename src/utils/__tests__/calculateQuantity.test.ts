import { describe, expect, test } from "vitest";
import { calculateQuantity } from "../calculateQuantity";

describe("calculateQuantity", () => {
  test("it returns the quantity of wallpaper needed for the height and width of wall", () => {
    const measurement = "cms";
    const width = 1250;
    const height = 250;

    const quantity = calculateQuantity(width, height, measurement);
    expect(quantity).toEqual(9)
  });
});
