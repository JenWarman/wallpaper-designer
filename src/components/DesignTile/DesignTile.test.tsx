import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { DesignTile } from "./DesignTile";
import { cleanup, render, screen } from "@testing-library/react";
import type { MockedFunction } from "vitest";

const updateParamMock = vi.fn();
const clearParamMock = vi.fn();

vi.mock("../../hooks/useDesignSearchParams");

const useDesignSearchParamsMock = useDesignSearchParams as MockedFunction<
  typeof useDesignSearchParams
>;

import useDesignSearchParams from "../../hooks/useDesignSearchParams";
describe("DesignTile", () => {
    beforeEach(() => {
    useDesignSearchParamsMock.mockReturnValue({
      formData: {
        theme: "floral",
        motif: "rose",
        scale: "small",
        "background-colour": "blue",
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
    test("the component is rendered", () => {
        render(<DesignTile/>)
        expect(screen.getByTestId("designTile")).toBeInTheDocument()
    })
})