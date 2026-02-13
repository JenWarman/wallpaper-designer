import { useToast } from "./useToast";
import { type ToastContextValue, ToastContext } from "../context/ToastContext";
import { describe, expect, test, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import React from "react";

describe("useToast", () => {
  test("it returns toast context when used inside ToastProvider", () => {
    const mockContext: ToastContextValue = { showToast: vi.fn() };

    const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
      <ToastContext.Provider value={mockContext}>
        {children}
      </ToastContext.Provider>
    );

    const { result } = renderHook(() => useToast(), { wrapper: Wrapper });

    expect(result.current).toBe(mockContext);
  });
  test("it throws error when used outside ToastProvider", () => {
    expect(() => {
        renderHook(() => useToast())
    }).toThrow("useToast must be inside ToastProvider")
  })
});
