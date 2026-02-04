import { describe, expect, test } from "vitest";
import { calculatePrice } from "../calculatePrice";

describe("calculatePrice", () => {
    test("it returns a price based on quantity", () => {
        const quantity = 9;
        const price = calculatePrice(quantity)
        expect(price).toEqual(432)
    })
})