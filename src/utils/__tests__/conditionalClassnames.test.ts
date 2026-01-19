import { describe, expect, test } from "vitest";
import conditionalClassNames from "../conditionalClassNames";

describe("conditionalClassNames", () => {
    test("it filters an object and returns the key as a string if the value is truthy", () => {
         const classes = {
            className1 : true,
            className2: true,
            className3: 1 < 2,
            className4: false
        }
        const classNames = conditionalClassNames(classes)
        expect(classNames).toBe('className1 className2 className3')
    })
    test('that it returns an empty string if the values are false.', () => {
        const classes = {
            className1 : false,
            className2: 2 < 1,
        }
        const classNames = conditionalClassNames(classes)
        expect(classNames).toBe('')
    })
})