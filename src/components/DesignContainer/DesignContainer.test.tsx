import { afterEach, beforeEach, describe, expect, test, vi, type MockedFunction, } from "vitest";
import { DesignContainer } from "./DesignContainer";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";

const updateParamMock = vi.fn();
const clearParamMock = vi.fn();

vi.mock("../../hooks/useDesignSearchParams");

const useDesignSearchParamsMock = useDesignSearchParams as MockedFunction<
  typeof useDesignSearchParams
>;

import useDesignSearchParams from "../../hooks/useDesignSearchParams";

describe("DesignContainer", () => {
  beforeEach(() => {
    useDesignSearchParamsMock.mockReturnValue({
      formData: {
        theme: "floral",
        motif: "rose",
        scale: "small",
        colour: "blue",
        repeat: "tile",
      },
      paramsString:
        "theme=floral&motif=rose&scale=small&background-colour=blue&repeat=tile",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });
  });
  afterEach(() => {
    cleanup();
  });
  test("it renders the component", () => {
    render(<DesignContainer />);
    expect(screen.getByTestId("designContainer")).toBeInTheDocument();
  });
  test("DesignTile is active by default and DesignDemo is hidden", () => {
    render(<DesignContainer />);

    const tile = screen.getByTestId("designTile").parentElement;
    const demo = screen.queryByTestId("designDemo")?.parentElement;

    expect(tile?.className).toContain("isActive");
    expect(demo?.className).toContain("isHidden");
  });
  test("clicking the right arrow activates DesignDemo", () => {
    render(<DesignContainer />);

    const rightArrow = screen.getByTestId("right");

    fireEvent.click(rightArrow);

    const tile = screen.getByTestId("designTile").parentElement;
    const demo = screen.queryByTestId("designDemo")?.parentElement;

    expect(demo?.className).toContain("isActive");
    expect(tile?.className).toContain("isHidden")
  });
  test("clicking the left arrow reactivates DesignTile", () => {
    render(<DesignContainer />);
     const rightArrow = screen.getByTestId("right");
     const leftArrow = screen.getByTestId("left")

    fireEvent.click(rightArrow);
    fireEvent.click(leftArrow);

    const tile = screen.getByTestId("designTile").parentElement;
    const demo = screen.queryByTestId("designDemo")?.parentElement;

    expect(tile?.className).toContain("isActive");
    expect(demo?.className).toContain("isHidden")
  });
});
