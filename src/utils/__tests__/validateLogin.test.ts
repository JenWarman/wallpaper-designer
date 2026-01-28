import { describe, expect, test } from "vitest";
import { validateLogin } from "../validateLogin";

describe('validateLogin', () => { 
    test("validationLogin returns an email errorMessage", () => {
        const mockEvent = {
            target: {
                name: "email",
                value: "not a valid email"
            }
        }
        const result = validateLogin(mockEvent)
        expect(result).toBe("Please enter a valid email address")
    })
    test("validationLogin returns an password errorMessage", () => {
        const mockEvent = {
            target: {
                name: "password",
                value: "123"
            }
        }
        const result = validateLogin(mockEvent)
        expect(result).toBe("Password must include one uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long.")
    })
})