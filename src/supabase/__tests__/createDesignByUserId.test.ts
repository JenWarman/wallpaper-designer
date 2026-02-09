import { beforeEach, describe, expect, test, vi } from "vitest";
import { createDesignByUserId } from "../supabase";
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

const design = {
  theme: "floral",
  motif: "rose",
  scale: "medium",
  colour: "blue",
  repeat: "tile",
};

beforeEach(() => {
  vi.clearAllMocks();
});

describe("createDesignByUserId", () => {
  test("it successfully posts design data to the design table using user_id and updates the progress status.", async () => {
    vi.mocked(supabase.auth.getUser).mockResolvedValue({
      data: {
        user: { id: user_id },
      },
      error: null,
    });

    const singleMock = vi.fn().mockResolvedValue({
      data: {
        id: "design-1",
        design_url: "design-1",
        user_id,
      },
      error: null,
    });

    const selectMock = vi.fn().mockReturnValue({ single: singleMock });
    const insertMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.mocked(supabase.from).mockImplementation(() => {
      return { insert: insertMock } as unknown as ReturnType<
        typeof supabase.from
      >;
    });

    const result = await createDesignByUserId("design-1");

    expect(result?.success).toBe(true);
    expect(result?.design.design_url).toBe("design-1");
    expect(insertMock).toHaveBeenCalledWith({
      user_id: "user-1",
      design_url: "design-1",
    });
  });
  test("it returns failure when user_id is invalid", async () => {
    const singleMock = vi.fn().mockResolvedValue({
      data: null,
      error: new Error("Insert Failure"),
    });

    const selectMock = vi.fn().mockReturnValue({ single: singleMock });
    const insertMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.mocked(supabase.from).mockReturnValue({
      insert: insertMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await createDesignByUserId("design-1");

    expect(result?.success).toBe(false);
    expect(insertMock).toHaveBeenCalled();
    expect(supabase.from).toHaveBeenCalledWith("designs");
  });
});
