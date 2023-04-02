import { render, unmountComponentAtNode } from '@testing-library/react';
import Visualization from './Visualisation';
import { AnalyserContext } from 'components/ContextProviders/audioProvider';

describe('Visualisation main component', () => {

    const mockAnalyser = {
        getByteFrequencyData: jest.fn()
    };

    const mockRender = jest.fn();

    let props = {
        bottomFrequency: 100,
        topFrequency: 1000,
        resolution: 100,
        render: mockRender
    }

    it('renders canvas element', () => {
        const { getByTestId } = render(<Visualization {...props} />);

        const canvasElement = getByTestId('visualiser_canvas');
        expect(canvasElement).toBeInTheDocument();
    });

    it('passes props to the component correctly', () => {
        const { getByTestId } = render(
            <AnalyserContext.Provider value={mockAnalyser}>
                <Visualization {...props} />
            </AnalyserContext.Provider>
        );
        const canvas = getByTestId('visualiser_canvas');

        expect(canvas.getAttribute('data-resolution')).toEqual(props.resolution.toString());
        expect(canvas.getAttribute('data-bottom-frequency')).toEqual(props.bottomFrequency.toString());
        expect(canvas.getAttribute('data-top-frequency')).toEqual(props.topFrequency.toString());
    });

    it('calls render function with correct arguments', () => {
        const { getByTestId } = render(
            <AnalyserContext.Provider value={mockAnalyser}>
                <Visualization {...props} />
            </AnalyserContext.Provider>
        );

        const canvasElement = getByTestId('visualiser_canvas');
        const canvasContext = canvasElement.getContext('2d');

        const dataArray = new Uint8Array();

        expect(mockRender).toHaveBeenCalledWith(canvasContext, dataArray, canvasElement);
    });
})
