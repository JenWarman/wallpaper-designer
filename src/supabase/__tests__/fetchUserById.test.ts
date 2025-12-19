import supabase from "../supabaseClient";
import { fetchUserById } from "../supabase";
import { describe, expect, test, vi } from "vitest";

vi.mock("../supabaseClient", () => ({
    default: {
        from: vi.fn(),
    },
}))

describe("fetchUserById", () => {
    test("it successfully fetches the user data by user_id", async () => {
        const user_id = "user-1"

        const mockUserData = [{
            id: 1,
            user_id: "user-1",
            username: 'test',
            designs: [],
            orders: []
        }]

        const eqMock = vi.fn().mockResolvedValue({data: mockUserData, error: null})
        const selectMock = vi.fn().mockReturnValue({eq: eqMock})

        vi.mocked(supabase.from).mockReturnValue({ select: selectMock} as unknown as ReturnType<typeof supabase.from>)

        const result = await fetchUserById(user_id)
        
        expect(result.success).toBe(true)
        expect(result.data).toEqual(mockUserData)
        expect(selectMock).toHaveBeenCalledWith("*")
        expect(eqMock).toHaveBeenCalledWith("user_id", user_id)
    })
    test("it returns failure when there is a query error", async () => {
        const user_id = "user-1";
        const error = new Error("Query Failed")

        const eqMock = vi.fn().mockResolvedValue({ data: null, error })

        const selectMock = vi.fn().mockReturnValue({eq: eqMock})

        vi.mocked(supabase.from).mockReturnValue({ select: selectMock} as unknown as ReturnType<typeof supabase.from>)

        const result = await fetchUserById(user_id)

        expect(result.success).toBe(false)
        expect(result.error).toBe(error)
    })
})