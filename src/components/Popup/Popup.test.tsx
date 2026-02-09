import { afterEach, describe, expect, test, vi } from "vitest";
import { Popup } from "./Popup";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

const mockNavigate = vi.fn();

vi.mock(import("react-router"), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Popup", () => {
  afterEach(() => {
    mockNavigate.mockClear();
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <Popup />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("popup")).toBeInTheDocument();
  });
  test("it navigates the user the registeration page when the register Cta is clicked", async () => {
    render(
      <MemoryRouter>
        <Popup />
      </MemoryRouter>,
    );
    const saveCta = screen.getByLabelText("register");
    fireEvent.click(saveCta);
    expect(mockNavigate).toHaveBeenCalledWith("/register");
  });
  test("login link navigates to the login page", () => {
    render(
      <MemoryRouter>
        <Popup />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", { name: /login here/i })).toHaveAttribute(
      "href",
      "/login",
    );
  });
});
