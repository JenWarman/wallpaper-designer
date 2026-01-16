import { beforeEach, describe, expect, test, vi } from "vitest";
import useDesignSearchParams from "./useDesignSearchParams";
import { renderHook } from "@testing-library/react";
import { act } from "react";

let mockSearchParams = new URLSearchParams()
const setSearchParamsMock = vi.fn()

vi.mock("react-router-dom", () => ({
    useSearchParams: () => [mockSearchParams, setSearchParamsMock]
}))

describe("useDesignSearchParams", () => {
    beforeEach(() => {
        mockSearchParams = new URLSearchParams()
        setSearchParamsMock.mockClear()
    })
    test("it derives form data from search params", () => {
        mockSearchParams = new URLSearchParams("theme=floral&motif=rose")

        const {result} = renderHook(() => useDesignSearchParams())

        expect(result.current.formData.theme).toBe("floral")
        expect(result.current.formData.motif).toBe("rose")
    })
    test("updateParam sets a search param", () => {
        const {result} = renderHook(() => useDesignSearchParams())

        act(() => {
            result.current.updateParam("theme", "floral")
        })

        expect(setSearchParamsMock).toHaveBeenCalledTimes(1)

        const params = setSearchParamsMock.mock.calls[0][0]
        expect(params.get("theme")).toBe("floral")
    })
    test("updateParam removes a param when the value is an empty string", () => {
        mockSearchParams = new URLSearchParams("theme=floral")

        const {result} = renderHook(() => useDesignSearchParams())

         act(() => {
            result.current.updateParam("theme", "")
        })

        const params = setSearchParamsMock.mock.calls[0][0]
        expect(params.has("theme")).toBe(false)
    })
    test("clearParams clears all search params", () => {
         mockSearchParams = new URLSearchParams("theme=floral&motif=rose")

        const {result} = renderHook(() => useDesignSearchParams())

        act(() => {
            result.current.clearParams()
        })

        expect(setSearchParamsMock).toHaveBeenCalledWith({})
    })
})