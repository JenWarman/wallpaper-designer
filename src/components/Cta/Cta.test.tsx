import { afterEach, describe, expect, test, vi } from "vitest";
import { Cta } from "./Cta";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Cta", () => {
  const ctaFunctionMock = vi.fn();
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("it renders a cta with the correct props", () => {
    render(
      <Cta
        label="Click"
        ctaFunction={ctaFunctionMock}
        dataTestId="cta"
        disabled={false}
        ariaLabel="click button"
        type="submit"
      />
    );
    const cta = screen.getByTestId("cta") as HTMLButtonElement;
    expect(cta).toBeInTheDocument();
    expect(cta.type).toBe("submit");
    expect(cta).toHaveAttribute("aria-label", "click button");
    expect(cta.disabled).toBeFalsy();
    expect(cta).toHaveTextContent("Click")
  });
  test("the function is called when the cta is clicked", () => {
    render(
      <Cta
        label="Click"
        ctaFunction={ctaFunctionMock}
        dataTestId="cta"
        disabled={false}
        ariaLabel="click button"
        type="submit"
      />
    );
    const cta = screen.getByTestId("cta") as HTMLButtonElement;
    fireEvent.click(cta);
    expect(ctaFunctionMock).toHaveBeenCalled();
  });
});
