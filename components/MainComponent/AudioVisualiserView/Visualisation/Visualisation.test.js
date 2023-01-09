import { render, screen } from '@testing-library/react';
import Visualization from './Visualisation';

test('renders canvas element', () => {
    let props = {
        bottomFrequency: 100,
        topFrequency: 1000,
        resolution: 100,
        render: jest.fn()
    }

    render(<Visualization {...props} />);

    const canvasElement = screen.getByTestId('visualiser_canvas');
    expect(canvasElement).toBeInTheDocument();
});

test('calls render function with correct arguments', () => {
    const mockRender = jest.fn();
    let props = {
        bottomFrequency: 100,
        topFrequency: 1000,
        resolution: 100,
        render: mockRender
    }

    render(<Visualization {...props} />);

    const canvasElement = screen.getByTestId('visualiser_canvas');
    const canvasContext = canvasElement.getContext('2d');

    const dataArray = new Uint8Array(100);

    expect(mockRender).toHaveBeenCalledWith(canvasContext, dataArray, canvasElement);
});