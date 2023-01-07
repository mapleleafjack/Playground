import { AnalyserContext } from 'lib/audioProvider';
import { getBarConstants } from 'lib/audioTools';
import React, { FC, useEffect, useRef, useState } from 'react';

type NewLineViewProps = {
    resolution: number,
    bottomFrequency: number,
    topFrequency: number,
}

const NewLineView: FC<NewLineViewProps> = ({ resolution, bottomFrequency, topFrequency }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyser = React.useContext(AnalyserContext);
    const [frameId, setFrameId] = useState<number | null>(null);

    const addStyle = (canvasContext: any, width: number) => {
        const gradient = canvasContext.createLinearGradient(0, 0, width, 0);

        for (let i = 0; i < resolution; i++) {
            const hue = Math.round(360 / resolution * i);
            gradient.addColorStop(i / resolution, `hsl(${hue}, 40%, 60%)`);
        }

        canvasContext.fillStyle = gradient;
    }

    useEffect(() => {
        if (analyser && canvasRef.current) {
            const canvas = canvasRef.current;
            const canvasContext = canvas.getContext('2d');

            const renderFrame = () => {
                const width = canvas.width;
                const height = canvas.height;

                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);

                if (canvasContext) {
                    canvasContext.clearRect(0, 0, width, height);

                    addStyle(canvasContext, width)

                    const { lowIndex, bandSize } = getBarConstants(dataArray, bottomFrequency, topFrequency, resolution);

                    for (let i = 0; i < resolution; i++) {
                        let sum = 0;
                        for (let j = lowIndex + i * bandSize; j < lowIndex + (i + 1) * bandSize; j++) {
                            sum += dataArray[j];
                        }
                        const scale = (sum / (bandSize * 256)) * height;

                        const x = i * (width / resolution);
                        const y = height - scale;

                        canvasContext.fillRect(x, y, (width / resolution) * 0.8, scale);
                    }
                }
            };

            const animate = () => {
                setFrameId(requestAnimationFrame(animate));
                renderFrame();
            };

            animate();

            return () => {
                if (frameId)
                    cancelAnimationFrame(frameId);
            };
        }
    }, [analyser, resolution, bottomFrequency, topFrequency]);

    return (
        <canvas
            ref={canvasRef}
            width={400}
            height={400}
            style={{ width: '700px', height: '700px' }}
        />
    );
};

export default NewLineView;
