import { beforeEach, describe, expect, test, vi } from "vitest";
import { updateProgressStatusByDesign } from "../supabase";
import supabase from "../supabaseClient";

vi.mock("../supabaseClient", () => ({
  default: {
    auth: {
      getUser: vi.fn(),
    },
    from: vi.fn(),
  },
}));

const user_id = "user-1";

describe("updateProgressStatusByDesign", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  test("it updates the design status from saved to archived", async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { id: user_id } },
      error: null,
    });

    const mockClient = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: {
          design: "design-1",
          user_id,
          status: "archived",
        },
        error: null,
      }),
    };

    vi.mocked(supabase.from).mockReturnValue(mockClient as any)

    const result = await updateProgressStatusByDesign(
      "design-1",
      "saved",
      "archived",
    );

    expect(mockClient.update).toHaveBeenCalledWith({status: "archived"})
    expect(mockClient.eq).toHaveBeenCalledWith("design", "design-1")
    expect(mockClient.eq).toHaveBeenCalledWith("user_id", user_id)
    expect(mockClient.eq).toHaveBeenCalledWith("status", "saved")
    expect(result?.success).toBe(true);
    expect(result?.data?.status).toBe("archived");
  });
  test("it returns failure when user id is invalid", async () => {
    const mockClient = {
      update: vi.fn().mockReturnThis(),
      eq: vi.fn().mockReturnThis(),
      single: vi.fn().mockResolvedValue({
        data: null,
        error: new Error("Update error."),
      }),
    };

    vi.mocked(supabase.from).mockReturnValue(mockClient as any)

    const result = await updateProgressStatusByDesign(
      "design-1",
      "saved",
      "archived",
    );
    expect(result?.success).toBe(false);
    expect(mockClient.update).toHaveBeenCalled()
    expect(mockClient.eq).toHaveBeenCalled()
    expect(mockClient.eq).toHaveBeenCalled()
    expect(mockClient.eq).toHaveBeenCalled()
  })
});
