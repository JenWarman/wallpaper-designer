import { describe, expect, test } from "vitest";
import { BurgerMenu } from "./BurgerMenu";
import { render, screen } from "@testing-library/react";

describe("BurgerMenu", () => {
    test("it renders the component", () => {
        render(<BurgerMenu isOpen={true}/>)
        expect(screen.getByTestId("burgerMenu")).toBeInTheDocument()
    })
})