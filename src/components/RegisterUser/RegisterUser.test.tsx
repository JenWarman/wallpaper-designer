import { afterEach, describe, expect, test, vi } from "vitest";
import { RegisterUser } from "./RegisterUser";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { validateRegistration } from "../../utils/validateRegistration";

vi.mock("../../utils/validateRegistration", () => ({
  validateRegistration: vi.fn(() => "Invalid input."),
}));

describe("RegisterUser", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <RegisterUser />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("registration")).toBeInTheDocument();
  });
  test("it shows form validation error onBlur", () => {
    render(
      <MemoryRouter>
        <RegisterUser />
      </MemoryRouter>,
    );
    const usernameInput = screen.getByLabelText("username");

    fireEvent.blur(usernameInput);

    expect(validateRegistration).toHaveBeenCalled();
    expect(screen.getByText("Invalid input.")).toBeInTheDocument();
  });
  test("login Cta is disabled until values have been entered into input fields", () => {
    render(
      <MemoryRouter>
        <RegisterUser />
      </MemoryRouter>,
    );
    const usernameInput = screen.getByLabelText("username");
    const emailInput = screen.getByLabelText("email");
    const passwordInput = screen.getByLabelText("password");
    const confirmPasswordInput = screen.getByLabelText("confirm password");
    const cta = screen.getByRole("button", { name: /register/i });

    expect(cta).toBeDisabled();

    fireEvent.change(usernameInput, { target: { value: "MrTest" } });
    fireEvent.change(emailInput, { target: { value: "email@emailtest.com" } });
    fireEvent.change(passwordInput, { target: { value: "Pa$$word123" } });
    fireEvent.change(confirmPasswordInput, {
      target: { value: "Pa$$word123" },
    });

    expect(cta).not.toBeDisabled();
  });
});
