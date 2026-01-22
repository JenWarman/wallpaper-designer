import { afterEach, describe, expect, test, vi } from "vitest";
import { PatternDesign } from "./PatternDesign";
import { cleanup, render, screen } from "@testing-library/react";
import { calculateImageScale } from "../../utils/calculateImageScale";
import { calculateBackgroundPosition } from "../../utils/calculateBackgroundPosition";

vi.mock("../../utils/calculateImageScale", () => ({
  calculateImageScale: vi.fn(() => "50px"),
}));

vi.mock("../../utils/calculateBackgroundPosition", () => ({
  calculateBackgroundPosition: vi.fn(() => ({
    positionOne: "10px",
    positionTwo: "20px",
  })),
}));

const mockDesign = {
  theme: "floral",
  motif: "rose",
  scale: "large",
  colour: "blue",
  repeat: "tile",
};

describe("PatternDesign", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetAllMocks();
    cleanup();
  });
  test("it renders the component", () => {
    render(<PatternDesign design={mockDesign} component="tile" />);

    expect(screen.getByTestId("patternDesign")).toBeInTheDocument();
  });
  test("it applies colour class based on design data", () => {
    render(<PatternDesign design={mockDesign} component="tile" />);

    const patternDiv = screen.getByTestId("patternDesign");
    expect(patternDiv.className).toContain("blue");
  });
  test("it calls utility functions with correct args", () => {
    render(<PatternDesign design={mockDesign} component="tile" />);

    expect(calculateImageScale).toHaveBeenCalledWith("tile", "large");
    expect(calculateBackgroundPosition).toHaveBeenCalledWith(
      "rose",
      "large",
      "tile",
    );
  });
});
