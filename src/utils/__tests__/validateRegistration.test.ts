import { describe, expect, test } from "vitest";
import { validateRegistration } from "../validateRegistration";

const mockPassword = "pa$$Word1234";
const mockConfirmPassword = "pa$$Word1234";

describe("validateRegistration", () => {
  test("validateRegistration returns an email errorMessage", () => {
    const mockEvent = {
      target: {
        name: "email",
        value: "not a valid email",
      },
    };

    const result = validateRegistration(
      mockEvent as any,
      mockPassword,
      mockConfirmPassword,
    );
    expect(result).toBe("Please enter a valid email address");
  });
  test("validateRegistration returns an username errorMessage", () => {
    const mockEvent = {
      target: {
        name: "username",
        value: "hi",
      },
    };

    const result = validateRegistration(
      mockEvent as any,
      mockPassword,
      mockConfirmPassword,
    );
    expect(result).toBe("Your username must be at least 3 characters.");
  });
  test("validateRegistration returns an password errorMessage", () => {
    const mockEvent = {
      target: {
        name: "password",
        value: "not a valid password",
      },
    };

    const result = validateRegistration(
      mockEvent as any,
      mockPassword,
      mockConfirmPassword,
    );
    expect(result).toBe(
      "Password must include one uppercase letter, one lowercase letter, one number, one special character and be at least 8 characters long.",
    );
  });
  test("validateRegistration returns an confirm password errorMessage", () => {
    const mockEvent = {
      target: {
        name: "confirm-password",
        value: "Password$347",
      },
    };

    const mockPassword = "pa$$Word1234";
    const mockConfirmPassword = "Password$347";

    const result = validateRegistration(
      mockEvent as any,
      mockPassword,
      mockConfirmPassword,
    );
    expect(result).toBe("Your password must match.");
  });
});
