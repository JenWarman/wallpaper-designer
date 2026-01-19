import { describe, expect, test } from "vitest";
import { calculateBackgroundPosition } from "../calculateBackgroundPosition";

describe("calculateBackGroundPosition", () => {
    test("it returns an object with positionOne and postionTwo when passed a motif and scale prop", () => {
        const motif = "rose"
        const scale = "small"
        const bgPosition = calculateBackgroundPosition(motif, scale)
        expect(bgPosition).toEqual({positionOne: "50px", positionTwo: "35px"})
    })
    test("it returns an object with positionOne and postionTwo  as an empty string when not passed a motif and scale prop", () => {
        const motif = ""
        const scale = ""
        const bgPosition = calculateBackgroundPosition(motif, scale)
        expect(bgPosition).toEqual({positionOne: "", positionTwo: ""})
    })
})