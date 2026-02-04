import { renderHook } from "@testing-library/react";
import { describe, expect, test} from "vitest";
import { useMediaQuery } from "./useMediaQuery";

describe("useMediaQuery", () => {
  test("returns true when media query matches", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(min-width: 1200px)")
    );

    expect(result.current).toBe(true);
  });

  test("returns false when media query does not match", () => {
    const { result } = renderHook(() =>
      useMediaQuery("(max-width: 600px)")
    );

    expect(result.current).toBe(false);
  });
});