import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { DesignForm } from "./DesignForm";
import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import { dataTestIds } from "../../utils/dataTestIds";
import { createDesignByUserId } from "../../supabase/supabase";

import type { MockedFunction } from "vitest";

vi.mock("react-redux", async () => {
  const actual = await vi.importActual<any>("react-redux");
  return {
    ...actual,
    useSelector: vi.fn(),
  };
});

vi.mock("../../supabase/supabase", () => ({
  createDesignByUserId: vi.fn(),
}));

const updateParamMock = vi.fn();
const clearParamMock = vi.fn();

vi.mock("../../hooks/useDesignSearchParams");

const useDesignSearchParamsMock = useDesignSearchParams as MockedFunction<
  typeof useDesignSearchParams
>;

import useDesignSearchParams from "../../hooks/useDesignSearchParams";
import { MemoryRouter } from "react-router";
import { useSelector } from "react-redux";

const design = {
  theme: "floral",
  motif: "",
  scale: "",
  colour: "",
  repeat: "",
};

describe("DesignForm", () => {
  beforeEach(() => {
    (useSelector as vi.mock).mockReturnValue("test-user");

    useDesignSearchParamsMock.mockReturnValue({
      formData: {
        theme: "",
        motif: "",
        scale: "",
        colour: "",
        repeat: "",
      },
      paramsString: "",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("the component is rendered", () => {
    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );
    expect(screen.getByTestId(dataTestIds.designForm)).toBeInTheDocument();
  });
  test("updateParam is called when dropdown value changes", () => {
    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );

    const themeSelect = screen
      .getAllByRole("combobox")
      .find(
        (element) => element.getAttribute("aria-label") === "Select theme",
      )!;

    fireEvent.change(themeSelect, {
      target: { name: "theme", value: "floral" },
    });

    expect(updateParamMock).toHaveBeenCalledWith("theme", "floral");
  });

  test("the save Cta is disabled if there are no search params", () => {
    useDesignSearchParamsMock.mockReturnValueOnce({
      formData: {
        theme: "",
        motif: "",
        scale: "",
        colour: "",
        repeat: "",
      },
      paramsString: "",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });

    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );

    const saveCta = screen.getByText("Save");

    expect(saveCta).toBeDisabled();
  });
  test("test the save Cta is enabled if there are search params", () => {
    useDesignSearchParamsMock.mockReturnValueOnce({
      formData: {
        theme: "floral",
        motif: "",
        scale: "",
        colour: "",
        repeat: "",
      },
      paramsString: "theme=floral",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });

    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );

    const saveCtaUpdated = screen.getByText("Save");

    expect(saveCtaUpdated).not.toBeDisabled();
  });
  test("save cta calls createDesignByUserId when user is logged in", async () => {
    (useSelector as vi.mock).mockReturnValue("test-user");

    useDesignSearchParamsMock.mockReturnValueOnce({
      formData: {
        theme: "floral",
        motif: "",
        scale: "",
        colour: "",
        repeat: "",
      },
      paramsString: "theme=floral",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });

    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );

    const saveCta = screen.getByText("Save");

    fireEvent.click(saveCta);

    expect(createDesignByUserId).toHaveBeenCalledWith("theme=floral");
  });
  test("the save cta opens popup and stores design url when user is not logged in", () => {
    (useSelector as vi.mock).mockReturnValue(null);

    const setItemSpy = vi.spyOn(window.sessionStorage.__proto__, "setItem");

    useDesignSearchParamsMock.mockReturnValueOnce({
      formData: {
        theme: "floral",
        motif: "",
        scale: "",
        colour: "",
        repeat: "",
      },
      paramsString: "theme=floral",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });

    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );

    const saveCta = screen.getByText("Save");

    fireEvent.click(saveCta);

    expect(setItemSpy).toHaveBeenCalledWith("design_url", "theme=floral");
    expect(createDesignByUserId).not.toHaveBeenCalled();
    expect(screen.getByTestId("popup")).toBeInTheDocument();
  });
  test("clear cta calls clearParams", () => {
    render(
      <MemoryRouter>
        <DesignForm />
      </MemoryRouter>,
    );
    const cancelCta = screen.getByText("Cancel");

    fireEvent.click(cancelCta);

    expect(clearParamMock).toHaveBeenCalled();
  });
});
