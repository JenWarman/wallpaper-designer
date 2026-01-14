import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { Form } from "./Form";
import { Input } from "../Input/Input";

const mockAction = vi.fn();

describe("Input", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("it calls action when form is submitted ", async () => {
    render(
      <Form
        action={mockAction}
        ctaLabel="Click Button"
        dataTestId="form"
        ctaAriaLabel="click button"
      >
        <Input
          id="input-1"
          label="input-1"
          type="text"
          ariaLabel="input-1-test"
          name="input-1"
          dataTestId="input"
        />
      </Form>
    );
    const form = screen.getByTestId("form") as HTMLInputElement;
    const button = screen.getByRole("button", { name: /click button/i });
    expect(form).toBeInTheDocument();
    await button.click();
    expect(mockAction).toHaveBeenCalledOnce();
    expect(mockAction).toHaveBeenCalledWith(expect.any(FormData));
  });
});
