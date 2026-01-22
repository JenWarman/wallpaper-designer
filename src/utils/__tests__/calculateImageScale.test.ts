import { describe, expect, test } from "vitest";
import { calculateImageScale } from "../calculateImageScale";

describe("calcualteImageScale", () => {
    test("it returns image size as a string", () => {
        const component = "tile"
        const scale = "medium"
        const imageScale = calculateImageScale(component, scale)
        expect(imageScale).toEqual("150px")
    })
})
