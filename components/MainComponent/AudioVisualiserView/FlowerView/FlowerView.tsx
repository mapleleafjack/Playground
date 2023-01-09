import { AnalyserContext } from 'lib/audioProvider';
import { getBandAmplitude, getBarConstants } from 'lib/audioTools';
import React, { FC, useEffect, useRef, useState } from 'react';
import s from './FlowerView.module.scss';

type FlowerViewProps = {
    resolution: number,
    bottomFrequency: number,
    topFrequency: number,
}

const FlowerView: FC<FlowerViewProps> = ({ resolution, bottomFrequency, topFrequency }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyser = React.useContext(AnalyserContext);
    const [frameId, setFrameId] = useState<number | null>(null);

    const addStyle = (canvasContext: any, i: number) => {
        const hue = (360 / resolution) * i;
        const saturation = 50;
        const lightness = 50;

        canvasContext.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    }

    useEffect(() => {
        if (analyser && canvasRef.current) {
            const canvas = canvasRef.current;
            const canvasContext = canvas.getContext('2d');

            var wRatio = window.innerWidth * 0.95;
            var hRatio = window.innerHeight * 0.90;

            canvas.height = hRatio;
            canvas.width = wRatio;

            const renderFrame = () => {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);

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
        <div className={`${s.container}`}>
            <canvas
                ref={canvasRef}
                data-testid={"flower-view"}
                className={`${s.canvas}`}
            />
        </div>
    );
};

export default FlowerView;
