import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Input } from "./Input";

describe("Input", () => {
  test("renders an input with the correct props", () => {
    render(
      <Input
        id="input-1"
        label="input-1"
        type="text"
        ariaLabel="test label"
        name="input-1"
        dataTestId="input"
      />
    );
    const input = screen.getByTestId("input") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("text");
    expect(input.name).toBe("input-1");
    expect(input.id).toBe("input-1");
    expect(input).toHaveAttribute("aria-label", "test label");
  });
});

