import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FlowerView from './FlowerView';

describe('FlowerView', () => {
    it('renders a canvas element', () => {
        render(<FlowerView resolution={10} bottomFrequency={100} topFrequency={200} />);
        expect(screen.getByTestId('flower-view')).toBeInTheDocument();
    });
});