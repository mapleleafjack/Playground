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
        expect(screen.getAllByText("Main").length).toBeGreaterThan(0)
        expect(screen.getAllByText("Main")[0]).toBeInTheDocument()
    })
})