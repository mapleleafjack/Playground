import { AnalyserContext } from 'lib/audioProvider';
import React, { FC, useEffect, useRef, useState } from 'react';
import s from './Visualisation.module.scss';

type VisualizationProps = {
    resolution: number,
    bottomFrequency: number,
    topFrequency: number,
    render: (
        canvasContext: CanvasRenderingContext2D,
        dataArray: Uint8Array,
        canvas: HTMLCanvasElement,
    ) => void,
};

const Visualization: FC<VisualizationProps> = ({
    resolution,
    bottomFrequency,
    topFrequency,
    render,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const analyser = React.useContext(AnalyserContext);
    const [frameId, setFrameId] = useState<number | null>(null);

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

                if (canvasContext) {
                    render(canvasContext, dataArray, canvas);
                }
            };

            const animate = () => {
                setFrameId(requestAnimationFrame(animate));
                renderFrame();
            };

            animate();

            return () => {
                if (frameId) cancelAnimationFrame(frameId);
            };
        }
    }, [analyser, resolution, bottomFrequency, topFrequency]);

    return (<div className={`${s.container}`}>
        <canvas
            ref={canvasRef}
            className={`${s.canvas}`}
        />
    </div>);
};

export default Visualization;