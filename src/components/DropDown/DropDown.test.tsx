import { describe, expect, test, vi } from "vitest";
import { DropDown } from "./DropDown";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DropDown", () => {
    test("it renders a DropDown component with the correct props", () => {
        render(
            <DropDown
            label="Theme"
            onChange={() => {}}
            value="theme"
            options={["Floral", "Geometric"]}
            ariaLabel="Select wallpaper theme"
            />
        )

        const select = screen.getByRole("combobox")
        expect(select).toBeInTheDocument()
        expect(select).toHaveAttribute("aria-label", "Select wallpaper theme")
   
        const options = screen.getAllByRole("option")
        expect(options).toHaveLength(3)
        expect(options[0]).toHaveTextContent("Theme")
        expect(options[1]).toHaveTextContent("Floral")
        expect(options[2]).toHaveTextContent("Geometric")
    })
    test("it calls onChange when select changes", async () => {
        const user = userEvent
        const mockOnChange = vi.fn()
        render(
            <DropDown
            label="Motif"
            onChange={mockOnChange}
            value="motif"
            options={["Orchid", "Daisy"]}
            ariaLabel="Select wallpaper motif"
            />
        )
        const select = screen.getByLabelText("Select wallpaper motif")
        await user.selectOptions(select, "Orchid")
        expect(mockOnChange).toHaveBeenCalledTimes(1)
    })
})