import { afterEach, describe, expect, test } from "vitest";
import { Nav } from "./Nav";
import { cleanup, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";

describe("Nav", () => {
    afterEach(() => {
    cleanup();
  });
  test("it renders the component", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>,
    );
    expect(screen.getByTestId("nav")).toBeInTheDocument();
  });
  test("it renders all navigation links", () => {
    render(
      <MemoryRouter>
        <Nav />
      </MemoryRouter>,
    );
    expect(screen.getByRole("link", {name: "Your Designs"})).toBeInTheDocument()
    expect(screen.getByRole("link", {name: "Your Orders"})).toBeInTheDocument()
    expect(screen.getByRole("link", {name: "New Design"})).toBeInTheDocument()
    expect(screen.getByRole("link", {name: "Account"})).toBeInTheDocument()
  })
});
