import { FileInput, Slider } from "@blueprintjs/core";
import { AnalyserContext } from "lib/audioProvider";
import React, { useContext, useState, useEffect } from "react";

const MotionFractalView: React.FC = () => {
    const [imageUrl, setImageURL] = useState<string>("./holy_sun.png");
    const [mirrorCount, setMirrorCount] = useState<number>(1);
    const [zoomValue, setZoomValue] = useState<number>(1);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const analyser = useContext(AnalyserContext);

    useEffect(() => {
        if (analyser) {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const update = () => {
                if (analyser) {
                    analyser.getByteFrequencyData(dataArray);

                    const volume = dataArray.reduce((a, b) => a + b, 0) / bufferLength;
                    console.log(volume)

                    setPosition({ x: position.x + volume, y: position.y + volume });
                }
                requestAnimationFrame(update);
            };

            update();
        }
    }, [analyser]);

    const loadAndDrawImage = (url: string) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageLoaded(true);
            drawImage(img, mirrorCount, position.x, position.y, zoomValue);
        };
    };

    useEffect(() => {
        loadAndDrawImage(imageUrl);
    }, [imageLoaded, mirrorCount, position]);

    const drawImage = (img: HTMLImageElement, count: number, posX: number, posY: number, zoomValue: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

        console.log(posX)
        console.log(posY)

        if (canvas) {
            canvas.width = 500;
            canvas.height = 500;

            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            const sliceWidth = canvas.width / 2;
            const sliceHeight = canvas.height / 2;
            const sliceRadius = Math.min(sliceWidth, sliceHeight);
            const angleStep = (2 * Math.PI) / count;

            for (let i = count - 1; i >= 0; i--) {
                const startAngle = i * angleStep;
                const endAngle = (i + 1) * angleStep;

                ctx?.save();
                ctx?.beginPath();
                ctx?.moveTo(centerX, centerY);
                ctx?.arc(centerX, centerY, sliceRadius, startAngle, endAngle);
                ctx?.closePath();
                ctx?.clip();
                ctx?.translate(centerX, centerY);
                ctx?.rotate(startAngle);
                ctx?.scale(zoomValue * -1, zoomValue);
                ctx?.drawImage(
                    img,
                    posX,
                    posY,
                    img.width,
                    img.height,
                    -sliceWidth,
                    -sliceHeight,
                    sliceWidth * 2,
                    sliceHeight * 2
                );
                ctx?.restore();
            }
        }
    };

    const handleSliderChange = (newCount: number) => {
        setMirrorCount(newCount);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => drawImage(img, mirrorCount, position.x, position.y, zoomValue);
    };
    const handleZoomChange = (newZoom: number) => {
        setZoomValue(newZoom);

        const img = new Image();
        img.src = imageUrl;
        img.onload = () => drawImage(img, mirrorCount, position.x, position.y, zoomValue);
    };

    return (
        <>
            <FileInput
                text="Choose image..."
                onInputChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const file = event.target.files?.[0];
                    if (file) {
                        const url = URL.createObjectURL(file);
                        setImageURL(url);
                    }
                }}
            />
            <label>Slices:</label>
            <Slider
                min={1}
                max={12}
                value={mirrorCount}
                onChange={handleSliderChange}
            />
            <label>Zoom:</label>
            <Slider
                min={0}
                max={4}
                stepSize={0.1}
                value={zoomValue}
                onChange={handleZoomChange}
            />
            {imageLoaded ? (
                <canvas ref={canvasRef} />
            ) : (
                <p>Loading image...</p>
            )}
        </>
    );
};

export default MotionFractalView;
