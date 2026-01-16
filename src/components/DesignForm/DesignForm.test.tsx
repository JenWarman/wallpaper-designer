import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { DesignForm } from "./DesignForm";
import { fireEvent, render, screen } from "@testing-library/react";
import { dataTestIds } from "../../utils/dataTestIds";
import { createDesignByUserId } from "../../supabase/supabase";
import { MemoryRouter } from "react-router";

import type { MockedFunction } from "vitest";

vi.mock("../../supabase/supabase", () => ({
  createDesignByUserId: vi.fn(),
}));

const updateParamMock = vi.fn();
const clearParamMock = vi.fn();
// const designSearchParamsMock = vi.fn();
// const useDesignSearchParamsMock = vi.mocked(useDesignSearchParams, true);
vi.mock("../../hooks/useDesignSearchParams");

const useDesignSearchParamsMock = useDesignSearchParams as MockedFunction<
  typeof useDesignSearchParams
>;

import useDesignSearchParams from "../../hooks/useDesignSearchParams";

// const useDesignSearchParamsMock = vi.spyOn(useDesignSearchParams, "default")
// vi.mock("../../hooks/useDesignSearchParams", () => ({
//   default: () => designSearchParamsMock(),
// }));

describe("DesignForm", () => {
  // const useDesignSearchParamsMock = hookModule.useDesignSearchParams as unknown as vi.MockedFunction<typeof hookModule.useDesignSearchParams>
  beforeEach(() => {
    vi.resetAllMocks();
    // vi.clearAllMocks()Â
    // designSearchParamsMock.mockReset();

    useDesignSearchParamsMock.mockReturnValue({
      formData: {
        theme: "",
        motif: "",
        scale: "",
        "background-colour": "",
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
  });

  // test("the component is rendered", () => {
  //   render(<DesignForm />);
  //   expect(screen.getByTestId(dataTestIds.designForm)).toBeInTheDocument();
  // });
  // test("updateParam is called when dropdown value changes", () => {
  //   render(<DesignForm />);

  //   const themeSelect = screen
  //     .getAllByRole("combobox")
  //     .find(
  //       (element) => element.getAttribute("aria-label") === "Select theme"
  //     )!;

  //   fireEvent.change(themeSelect, {
  //     target: { name: "theme", value: "floral" },
  //   });

  //   expect(updateParamMock).toHaveBeenCalledWith("theme", "floral");

  // });
  test("the save Cta is disabled if there are no search params", () => {
    useDesignSearchParamsMock.mockReturnValueOnce({
      formData: {
        theme: "",
        motif: "",
        scale: "",
        "background-colour": "",
        repeat: "",
      },
      paramsString: "",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });
    const { getAllByTestId } = render(<DesignForm />);

    const saveCta = getAllByTestId(dataTestIds.cta).find(
      (button) => button.textContent === "Save"
    )!;

    // screen.debug();

    expect(saveCta).toBeDisabled();
  });
  test("test the save Cta is enabled if there are search params", () => {
    useDesignSearchParamsMock.mockReturnValueOnce({
      formData: {
        theme: "floral",
        motif: "",
        scale: "",
        "background-colour": "",
        repeat: "",
      },
      paramsString: "theme=floral",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });

    render(<DesignForm />);

    const saveCtaUpdated = screen
      .getAllByTestId(dataTestIds.cta)
      .find((button) => button.textContent === "Save")!;

      screen.debug();

    expect(saveCtaUpdated).not.toBeDisabled();
  });

  // test("save cta calls createDesignByUserId", () => {
  // useDesignSearchParamsMock.mockReturnValueOnce({
  //     formData: {
  //       theme: "floral",
  //       motif: "",
  //       scale: "",
  //       "background-colour": "",
  //       repeat: "",
  //     },
  //     paramsString: "theme=floral",
  //     updateParam: updateParamMock,
  //     clearParams: clearParamMock,
  //   });

  //   render(<DesignForm />);

  //   const saveCta = screen
  //     .getAllByTestId(dataTestIds.cta)
  //     .find((button) => button.textContent === "Save")!;

  //   fireEvent.click(saveCta);

  //   expect(createDesignByUserId).toHaveBeenCalledWith("theme=floral");
  // });
  // test("clear cta calls clearParams", () => {
  //   render(<DesignForm />);
  //   const cancelCta = screen
  //     .getAllByTestId(dataTestIds.cta)
  //     .find((button) => button.textContent === "Cancel")!;

  //   fireEvent.click(cancelCta);

  //   expect(clearParamMock).toHaveBeenCalled();
  // });
});
