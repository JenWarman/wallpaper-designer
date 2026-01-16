import { afterEach, describe, expect, test, vi } from "vitest";
import { Cta } from "./Cta";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

describe("Cta", () => {
  const ctaFunctionMock = vi.fn();
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  test("it renders a form cta with the correct props", () => {
    render(
      <Cta
        label="Click"
        dataTestId="form-cta"
        disabled={false}
        ariaLabel="click button"
        type="submit"
      />
    );
    const cta = screen.getByTestId("form-cta") as HTMLButtonElement;
    expect(cta).toBeInTheDocument();
    expect(cta.type).toBe("submit");
    expect(cta).toHaveAttribute("aria-label", "click button");
    expect(cta.disabled).toBeFalsy();
    expect(cta).toHaveTextContent("Click");
  });
  test("it renders a click cta with the correct props", () => {
    render(
      <Cta
        label="Click"
        dataTestId="cta"
        disabled={false}
        ariaLabel="click button"
        type="button"
        ctaFunction={ctaFunctionMock}
      />
    );
    const cta = screen.getByTestId("cta") as HTMLButtonElement;
    expect(cta).toBeInTheDocument();
    expect(cta.type).toBe("button");
    expect(cta).toHaveAttribute("aria-label", "click button");
    expect(cta.disabled).toBeFalsy();
    expect(cta).toHaveTextContent("Click");
  });
  test("the function is called when the cta is clicked", () => {
    render(
      <Cta
        label="Click"
        ctaFunction={ctaFunctionMock}
        dataTestId="cta"
        disabled={false}
        ariaLabel="click button"
        type="button"
      />
    );
    const cta = screen.getByTestId("cta") as HTMLButtonElement;
    fireEvent.click(cta);
    expect(ctaFunctionMock).toHaveBeenCalled();
  });
  test("cta is disabled if disbaled prop is passed", () => {
    render(
      <Cta
        label="Click"
        ctaFunction={ctaFunctionMock}
        dataTestId="cta"
        disabled={true}
        ariaLabel="click button"
        type="button"
      />
    );
    const cta = screen.getByTestId("cta") as HTMLButtonElement;
    expect(cta).toBeDisabled()
  })
});
