import { beforeEach, describe, expect, test, vi } from "vitest";
import { deleteDesignByUserId } from "../supabase";
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

beforeEach(() => {
  vi.clearAllMocks();
});

describe("deleteDesignByUserId", () => {
  test("it removes design from designs table", async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { id: user_id } },
      error: null,
    });
    const eqMock = vi.fn().mockResolvedValue({
      data: {
        design_url: "design_url",
      },
      error: null,
    });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      delete: deleteMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await deleteDesignByUserId("design_url");

    expect(result?.success).toBe(true);
    expect(supabase.from).toHaveBeenCalledWith("designs");
    expect(deleteMock).toHaveBeenCalled();
    expect(eqMock).toHaveBeenCalledWith("design_url", "design_url");
  });
  test("it returns failure when delete fails", async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: { user: { id: user_id } },
      error: null,
    });
    const eqMock = vi.fn().mockResolvedValue({
      data: null,
      error: new Error("Delete failed"),
    });
    const deleteMock = vi.fn().mockReturnValue({ eq: eqMock });

    vi.mocked(supabase.from).mockReturnValue({
      delete: deleteMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await deleteDesignByUserId("design_url");
    expect(result?.success).toBe(false);
  });
});
