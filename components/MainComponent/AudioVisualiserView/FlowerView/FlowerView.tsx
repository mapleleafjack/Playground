import { AnalyserContext } from 'lib/audioProvider';
import React, { FC, useEffect, useRef, useState } from 'react';

type FlowerViewProps = {
    resolution: number,
    bottomFrequency: number,
    topFrequency: number,
}

const FlowerView: FC<FlowerViewProps> = ({ resolution, bottomFrequency, topFrequency }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyser = React.useContext(AnalyserContext);
    const [frameId, setFrameId] = useState<number | null>(null);

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

                    const sampleRate = 44100;

                    const lowIndex = Math.floor(bottomFrequency / sampleRate * dataArray.length);
                    const highIndex = Math.ceil(topFrequency / sampleRate * dataArray.length);
                    const bandSize = Math.ceil((highIndex - lowIndex) / resolution);

                    const radius = 10;
                    const centerX = canvas.width / 2;
                    const centerY = canvas.height / 2;

                    for (let i = 0; i < resolution; i++) {
                        let sum = 0;
                        for (let j = lowIndex + i * bandSize; j < lowIndex + (i + 1) * bandSize; j++) {
                            sum += dataArray[j];
                        }
                        const scale = (sum / (bandSize * 256)) * height;
                        const angle = (-Math.PI / 2) + (2 * Math.PI / resolution) * i;

                        const x = centerX + radius * Math.cos(angle);
                        const y = centerY + radius * Math.sin(angle);

                        const line_width = Math.sqrt(resolution);

                        canvasContext.save();
                        canvasContext.translate(x, y);
                        canvasContext.rotate(angle);
                        canvasContext.fillRect(0, 0, scale, line_width);
                        canvasContext.restore();
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
            data-testId={"flower-view"}
            style={{ width: '700px', height: '700px' }}
        />
    );
};

export default FlowerView;
