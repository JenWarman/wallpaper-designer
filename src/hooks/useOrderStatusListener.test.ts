import { cleanup, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { useOrderStatusListener } from "./useOrderStatusListener";
import supabase from "../supabase/supabaseClient";

vi.mock("../supabase/supabaseClient", () => {
  const mockSubcribe = vi.fn();
  const mockOn = vi.fn(() => ({ subscribe: mockSubcribe }));
  const mockChannel = vi.fn(() => ({ on: mockOn }));
  const mockRemoveChannel = vi.fn();
  return {
    default: {
      channel: mockChannel,
      removeChannel: mockRemoveChannel,
    },
    _esModule: true,
  };
});

const showToast = vi.fn();

vi.mock("./useToast", () => ({
  useToast: () => ({ showToast }),
}));

describe("useOrderStatusListener", () => {
  afterEach(() => {
    vi.clearAllMocks();
    cleanup();
  });
  it("subscribes to order status changes when userId is provided", () => {
    renderHook(() => useOrderStatusListener("user-123"));

    expect(supabase.channel).toHaveBeenCalledWith("order-status-changes");
  });

  it("does not subscribe when userId is empty", () => {
    renderHook(() => useOrderStatusListener(""));

    expect(supabase.channel).not.toHaveBeenCalled();
  });

  it("cleans up subscription on unmount", () => {
    const { unmount } = renderHook(() => useOrderStatusListener("user-123"));

    unmount();

    expect(supabase.removeChannel).toHaveBeenCalled();
  });
});
