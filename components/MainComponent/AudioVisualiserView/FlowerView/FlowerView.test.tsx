const canvas = require('canvas');

import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlowerView from './FlowerView';
import { AnalyserContext } from 'lib/audioProvider';

describe('FlowerView', () => {
    it('renders a canvas element', () => {
        const mockAnalyser = {
            getByteFrequencyData: jest.fn()
        } as unknown;

        render(
            <AnalyserContext.Provider value={mockAnalyser as AnalyserNode}>
                <FlowerView resolution={10} bottomFrequency={100} topFrequency={200} />
            </AnalyserContext.Provider>
        );
        expect(screen.getByTestId('flower-view')).toBeInTheDocument();
    });
});
