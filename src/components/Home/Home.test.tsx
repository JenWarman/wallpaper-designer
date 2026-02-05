import { afterEach, describe, expect, test, vi } from "vitest";
import { Home } from "./Home";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();

vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Home", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("home")).toBeInTheDocument();
  });
  test("clicking the Get Started Cta navigates to the registration page", async () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    const cta = screen.getByLabelText("get started");
    fireEvent.click(cta);
    await vi.waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/register");
    });
  });
});
