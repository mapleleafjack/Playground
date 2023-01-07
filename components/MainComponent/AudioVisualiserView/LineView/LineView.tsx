import { AnalyserContext } from 'lib/audioProvider';
import { getBandAmplitude, getBarConstants } from 'lib/audioTools';
import React, { FC, useEffect, useRef, useState } from 'react';

type LineViewProps = {
    resolution: number,
    bottomFrequency: number,
    topFrequency: number,
}

const LineView: FC<LineViewProps> = ({ resolution, bottomFrequency, topFrequency }) => {
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
                        const bandAmplitude = getBandAmplitude(i, dataArray, lowIndex, bandSize)
                        const scale = (bandAmplitude / (bandSize * 256)) * height;
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
            width={700}
            height={700}
            style={{ width: '700px', height: '700px', backgroundColor: "black", border: "1px solid white" }}
        />
    );
};

export default LineView;
