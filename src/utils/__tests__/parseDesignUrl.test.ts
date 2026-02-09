import { describe, expect, test } from "vitest";
import { parseDesignUrl } from "../parseDesignUrl";

describe("parseDesignUrl", () => {
    test("it returns a design data object when passed design url", () => {
        const design_url = "theme=floral&motif=daisy&colour=forest+green&scale=large&repeat=half+drop"
        const result = parseDesignUrl(design_url)
        expect(result).toEqual({theme: "floral", motif: "daisy", colour: "forest green", scale: "large", repeat: "half drop"})
    })
})