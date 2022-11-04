import { render, screen } from '@testing-library/react';

import TestComponent from './TestComponent.tsx'

describe('TestComponent', () => {
    it('checks that the component displays title and subtitle', () => {
        render(
            <TestComponent title="title" subtitle="subtitle" />
        );

        const title = screen.getByTestId('title');
        const subtitle = screen.getByTestId('subtitle');

        expect(title == null);
        expect(subtitle == null);

        expect(title.textContent).toBe("title")
        expect(subtitle.textContent).toBe("subtitle")
    })

    it('checks that the component displays only the title', () => {
        render(
            <TestComponent title="I am a title" />
        );

        const title = screen.getByTestId('title');
        expect(title.textContent).toBe("I am a title")
    })

    it('checks that the component displays only the subtitle', () => {
        render(
            <TestComponent subtitle="I am a subtitle" />
        );

        const title = screen.getByTestId('subtitle');
        expect(title.textContent).toBe("I am a subtitle")
    })
})
