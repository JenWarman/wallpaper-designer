import { beforeEach, describe, expect, test, vi } from "vitest";
import { updateProgressStatus } from "../supabase";
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

describe("updateProgressStatus", () => {
  test("it successfully updates the progress status", async () => {
    const singleMock = vi.fn().mockResolvedValue({
      data: {
        design: "design-1",
        user_id,
        status: "ordered",
      },
      error: null,
    });
    const selectMock = vi.fn().mockReturnValue({ single: singleMock });
    const insertMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.mocked(supabase.from).mockReturnValue({
      insert: insertMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await updateProgressStatus({design: "design-1", status:"ordered", user_id: user_id});

    expect(result.success).toBe(true);
    expect(insertMock).toHaveBeenCalledWith({
      design: "design-1",
      user_id,
      status: "ordered",
    });
    expect(result?.status).toBeDefined();
  });
  test("it returns failure when user_id is invalid", async () => {
    const singleMock = vi.fn().mockResolvedValue({
      data: null,
      error: new Error("Insert failures"),
    });
    const selectMock = vi.fn().mockReturnValue({ single: singleMock });
    const insertMock = vi.fn().mockReturnValue({ select: selectMock });

    vi.mocked(supabase.from).mockReturnValue({
      insert: insertMock,
    } as unknown as ReturnType<typeof supabase.from>);

    const result = await updateProgressStatus({design: "design-1", status:"ordered", user_id: user_id});
    expect(result?.success).toBe(false);
    expect(insertMock).toHaveBeenCalled();
    expect(supabase.from).toHaveBeenCalledWith("progressStatus");
  })
});


