import { render, screen } from '@testing-library/react';
import MainComponent from './MainComponent.tsx'

describe("MainComponent", () => {
    it("renders correctly", () => {
        render(
            <MainComponent />
        );
    })

    it("displays tab title", () => {
        render(
            <MainComponent />
        );
        expect(screen.getAllByText("Visualiser").length).toBeGreaterThan(0)
        expect(screen.getAllByText("Visualiser")[0]).toBeInTheDocument()
    })
})