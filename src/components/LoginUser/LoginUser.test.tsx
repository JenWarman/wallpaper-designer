import { afterEach, describe, expect, test, vi } from "vitest";
import { LoginUser } from "./LoginUser";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { validateLogin } from "../../utils/validateLogin";

vi.mock("../../utils/validateLogin", () => ({
  validateLogin: vi.fn(() => "Invalid input."),
}));

describe("LoginUser", () => {
    afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(<LoginUser />);
    expect(screen.getByTestId("login")).toBeInTheDocument();
  });
  test("it shows form validation error onBlur", () => {
    render(<LoginUser />);
    const emailInput = screen.getByLabelText("email");

    fireEvent.blur(emailInput)

    expect(validateLogin).toHaveBeenCalled()
    expect(screen.getByText("Invalid input.")).toBeInTheDocument()
  });
  test("login Cta is disabled until values have been entered into input fields", () => {
    render(<LoginUser/>)

    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const cta = screen.getByRole("button", {name: /login/i})

    expect(cta).toBeDisabled()

    fireEvent.change(emailInput, {target: {value: "email@emailtest.com"}})
    fireEvent.change(passwordInput, {target: {value: "Pa$$word123"}})

    expect(cta).not.toBeDisabled()
  })
});
