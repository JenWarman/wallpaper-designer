import { describe, expect, test } from "vitest";
import { Toast } from "./Toast";
import { render, screen } from "@testing-library/react";

describe("Toast", () => {
    test("it renders the component", () => {
        render(<Toast message="your order has been shipped."/>)
        expect(screen.getByTestId("toast")).toBeInTheDocument()
    })
})