import { AnalyserContext } from 'lib/audioProvider';
import React, { FC, useContext, useEffect, useRef, useState } from 'react';
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
    const analyser = useContext(AnalyserContext);
    const [frameId, setFrameId] = useState<number | null>(null);

    useEffect(() => {
        if (analyser && canvasRef.current) {
            const canvas = canvasRef.current;
            const canvasContext = canvas.getContext('2d');

            var wRatio = window.innerWidth * 0.95;
            var hRatio = window.innerHeight * 0.90;

            canvas.height = hRatio;
            canvas.width = wRatio;

            canvas.setAttribute("data-resolution", resolution.toString())
            canvas.setAttribute("data-bottom-frequency", bottomFrequency.toString())
            canvas.setAttribute("data-top-frequency", topFrequency.toString())

            const renderFrame = () => {
                const dataArray = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(dataArray);

                if (frameId)
                    canvas.setAttribute("data-animation-frame-id", frameId.toString())

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
            data-testid={"visualiser_canvas"}
            className={`${s.canvas}`}
        />
    </div>);
};

export default Visualization;