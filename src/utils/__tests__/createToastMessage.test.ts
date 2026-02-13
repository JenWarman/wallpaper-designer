import { describe, expect, test } from "vitest";
import { createToastMessage } from "../createToastMessage";

describe("createToastMessage", () => {
    test("it returns the toast message as a string", () => {
        const status = "production";
        const result = createToastMessage(status)
        expect(result).toBe("Our production team are printing your order.")
    })
})