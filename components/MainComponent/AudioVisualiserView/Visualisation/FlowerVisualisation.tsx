import { getBandAmplitude, getBarConstants } from 'lib/audioTools';
import Visualization from './Visualisation';

export const FlowerVisualisation = (props: { resolution: number, bottomFrequency: number, topFrequency: number }): JSX.Element => {
    const { resolution, bottomFrequency, topFrequency } = props;

    const addStyle = (canvasContext: any, i: number) => {
        const hue = (360 / resolution) * i;
        const saturation = 50;
        const lightness = 50;

        canvasContext.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    const render = (
        canvasContext: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        canvas: HTMLCanvasElement,
    ) => {
        const width = canvas.width;
        const height = canvas.height;

        if (canvasContext) {
            const { lowIndex, bandSize } = getBarConstants(dataArray, bottomFrequency, topFrequency, resolution);
            const center_radius_px = 10;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;

            canvasContext.clearRect(0, 0, width, height);

            for (let i = 0; i < resolution; i++) {
                const bandAmplitude = getBandAmplitude(i, dataArray, lowIndex, bandSize)
                const scale = (bandAmplitude / (bandSize * 256)) * height;
                const angle = (-Math.PI / 2) + (2 * Math.PI / resolution) * i;
                const x = centerX + center_radius_px * Math.cos(angle);
                const y = centerY + center_radius_px * Math.sin(angle);
                const line_width = Math.sqrt(resolution) * 0.8;

                canvasContext.save();
                canvasContext.translate(x, y);
                canvasContext.rotate(angle);

                addStyle(canvasContext, i)

                canvasContext.fillRect(0, 0, scale, line_width);

                canvasContext.restore();
            }
        }
    };

    return <Visualization resolution={resolution} bottomFrequency={bottomFrequency} topFrequency={topFrequency} render={render} />;
};
