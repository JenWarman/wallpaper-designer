import { beforeEach, describe, expect, test, vi } from "vitest";
import { DesignForm } from "./DesignForm";
import { createDesignByUserId } from "../../supabase/supabase";
import { fireEvent, render, screen } from "@testing-library/react";
import { dataTestIds } from "../../utils/dataTestIds";

vi.mock("../../supabase/supabase", () => ({
  createDesignByUserId: vi.fn(),
}));

let mockSearchParams = new URLSearchParams();

const setSearchParamsMock = vi.fn((nextParams) => {
  mockSearchParams = nextParams;
});

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useSearchParams: () => [mockSearchParams, setSearchParamsMock],
  };
});

describe("DesignForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("it renders the component", () => {
    render(<DesignForm />);
    expect(screen.getByTestId(dataTestIds.designForm)).toBeInTheDocument();
  });
  test("it renders all dropdowns", () => {
    render(<DesignForm />);
    const dropdowns = screen
      .getAllByRole("option")
      .map((option) => option.textContent);
    expect(dropdowns).toEqual(
      expect.arrayContaining([
        "floral",
        "orchid",
        "daisy",
        "rose",
        "small",
        "medium",
        "large",
        "pink",
        "blue",
        "tile",
        "half drop",
      ])
    );
  });
  test("that search params update when the dropdown value change", () => {
    render(<DesignForm />);

    const themeSelect = screen
      .getAllByRole("combobox")
      .find((element) => element.getAttribute("aria-label") === "Select theme");
    expect(themeSelect).toBeDefined();
    fireEvent.change(themeSelect!, {
      target: { name: "theme", value: "floral" },
    });

    expect(setSearchParamsMock).toHaveBeenCalledTimes(1);

    const params = setSearchParamsMock.mock.calls[0][0];
    expect(params).toBeInstanceOf(URLSearchParams);
    expect(params.get("theme")).toBe("floral");
  });
  test("that search params update when the multiple dropdown values change", () => {
    render(<DesignForm />);

    const themeSelect = screen
      .getAllByRole("combobox")
      .find((element) => element.getAttribute("aria-label") === "Select theme");
    expect(themeSelect).toBeDefined();
    fireEvent.change(themeSelect!, {
      target: { name: "theme", value: "floral" },
    });

    const motifSelect = screen
      .getAllByRole("combobox")
      .find((element) => element.getAttribute("aria-label") === "Select motif");
    expect(motifSelect).toBeDefined();
    fireEvent.change(motifSelect!, {
      target: { name: "motif", value: "rose" },
    });

    expect(setSearchParamsMock).toHaveBeenCalledTimes(2);

    const firstCallParams = setSearchParamsMock.mock.calls[0][0];
    expect(firstCallParams.get("theme")).toBe("floral");

    const secondCallParams = setSearchParamsMock.mock.calls[1][0];
    expect(secondCallParams.get("motif")).toBe("rose");
  });
  
});

//save cta is disabled if there are no params
//save cta calls handleSaveDesign and createDesignByUserId
//cancel cta clears search params


