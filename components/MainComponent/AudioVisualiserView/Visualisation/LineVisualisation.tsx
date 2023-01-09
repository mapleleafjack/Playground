import { getBandAmplitude, getBarConstants } from 'lib/audioTools';
import Visualization from './Visualisation';

export const LineVisualisation = (props: { resolution: number, bottomFrequency: number, topFrequency: number }): JSX.Element => {
    const { resolution, bottomFrequency, topFrequency } = props;

    const addStyle = (canvasContext: any, width: number) => {
        const gradient = canvasContext.createLinearGradient(0, 0, width, 0);
        for (let i = 0; i < resolution; i++) {
            const hue = Math.round(360 / resolution * i);
            gradient.addColorStop(i / resolution, `hsl(${hue}, 40%, 60%)`);
        }
        canvasContext.fillStyle = gradient;
    }

    const render = (
        canvasContext: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        canvas: HTMLCanvasElement,
    ) => {
        const width = canvas.width;
        const height = canvas.height;

        if (canvasContext) {
            canvasContext.clearRect(0, 0, width, height);

            addStyle(canvasContext, width)

            const { lowIndex, bandSize } = getBarConstants(dataArray, bottomFrequency, topFrequency, resolution);

            for (let i = 0; i < resolution; i++) {
                const bandAmplitude = getBandAmplitude(i, dataArray, lowIndex, bandSize)
                const scale = (bandAmplitude / (bandSize * 256)) * height;
                const x = i * (width / resolution);
                const y = height - scale;

                canvasContext.fillRect(x, y, (width / resolution) * 0.8, scale);
            }
        }
    }

    return <Visualization resolution={resolution} bottomFrequency={bottomFrequency} topFrequency={topFrequency} render={render} />;
};
