import { afterEach, beforeEach, describe, expect, test, vi, type MockedFunction } from "vitest";
import { DesignContainer } from "./DesignContainer";
import { cleanup, fireEvent,render, screen } from "@testing-library/react";

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
      paramsString: "theme=floral&motif=rose&scale=small&background-colour=blue&repeat=tile",
      updateParam: updateParamMock,
      clearParams: clearParamMock,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup()
  });
    test("it renders the component", () => {
        render(<DesignContainer/>)
        expect(screen.getByTestId("designContainer")).toBeInTheDocument()
    })
   test("DesignTile is rendered by default", () => {
    render(<DesignContainer/>)
    expect(screen.getByTestId("designTile")).toBeInTheDocument()
    expect(screen.queryByTestId("designDemo")).not.toBeInTheDocument()
   })
   test("clicking the right arrow shows the DesignDemo component", () => {
    render(<DesignContainer/>)
    const rightArrow = screen.getByTestId("right")
    fireEvent.click(rightArrow)
    expect(screen.getByTestId("designDemo")).toBeInTheDocument()
    expect(screen.queryByTestId("designTile")).not.toBeInTheDocument()
   })
   test("clicking the left arrow shows the DesignTile component", () => {
    render(<DesignContainer/>)
    fireEvent.click(screen.getByTestId("right"))
    const leftArrow = screen.getByTestId("left")
    fireEvent.click(leftArrow)
    expect(screen.getByTestId("designTile")).toBeInTheDocument()
    expect(screen.queryByTestId("designDemo")).not.toBeInTheDocument()
   })
})

