import { afterEach, describe, expect, test, vi } from "vitest";
import { fetchDesignsByUserId, fetchProgressStatusByUserId } from "../supabase/supabase";
import { cleanup, renderHook, waitFor } from "@testing-library/react";
import useStatusToSearchDesigns from "./useStatusToSearchDesigns";

vi.mock("../supabase/supabase", () => ({
    fetchDesignsByUserId: vi.fn(),
    fetchProgressStatusByUserId: vi.fn()
}))

const mockDesigns = {
    data: [
        {
            design_url: "url-1",
            design_data: {theme: "floral"},
            created_at: "2025-01-01"
        },
         {
            design_url: "url-2",
            design_data: {theme: "floral"},
            created_at: "2025-02-02"
        }
    ]
}

const mockStatuses = {
    status: [
        {design: "url-1", status: "archived"},
        {design: "url-2", status: "saved"}
    ]
}

describe("useStatusToSearchDesigns", () => {
    afterEach(() => {
        vi.clearAllMocks();
        cleanup()
    })
    test("it only returns designs with archived status", async () => {
        vi.mocked(fetchDesignsByUserId).mockResolvedValue(mockDesigns as any)
        vi.mocked(fetchProgressStatusByUserId).mockResolvedValue(mockStatuses as any)

        const { result } = renderHook(() => useStatusToSearchDesigns("archived", 0))

        await waitFor(() => {
            expect(result.current.filteredDesigns.length).toBe(1)
        })
    })
})