import { afterEach, describe, expect, test, vi } from "vitest";
import { Header } from "./Header";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("Header", () => {
  afterEach(() => {
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("header")).toBeInTheDocument();
  });
  test("BurgerMenu is rendered by default", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("burgerMenu")).toBeInTheDocument();
    expect(screen.queryByTestId("nav")).not.toBeInTheDocument();
  });
  test("clicking burger menu renders the Nav component", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );
    fireEvent.click(screen.getByTestId("toggleNav"));
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
  test("the nav closes when the location changes", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByTestId("toggleNav"));
    expect(screen.getByTestId("nav")).toBeInTheDocument();

    fireEvent.click(screen.getByText("Your Designs"));
    expect(screen.queryByTestId("nav")).not.toBeInTheDocument();
  });
});
