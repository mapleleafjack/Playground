import { FileInput, Slider } from "@blueprintjs/core";
import { AnalyserContext } from "components/ContextProviders/audioProvider";
import Controls from "components/MainComponent/FractalView/Controls/Controls";
import React, { useContext, useState, useEffect } from "react";

interface MotionFractalViewProps {
    microphoneStarted: boolean
}

const MotionFractalView: React.FC<MotionFractalViewProps> = (microphoneStarted) => {
    const [imageUrl, setImageURL] = useState<string>("./holy_sun.png");
    const [mirrorCount, setMirrorCount] = useState<number>(1);
    const [zoomValue, setZoomValue] = useState<number>(1);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);

    const analyser = useContext(AnalyserContext);

    useEffect(() => {
        if (microphoneStarted && analyser) {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            const update = () => {
                if (analyser) {
                    analyser.getByteFrequencyData(dataArray);

                    const volume = dataArray.reduce((a, b) => a + b, 0) / bufferLength;

                    setPosition({ x: position.x + volume, y: position.y + volume });
                }
                requestAnimationFrame(update);
            };

            update();
        }
    }, [analyser, microphoneStarted]);



    const handleMouseDown = (event: any) => {
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent | TouchEvent) => {
        event.preventDefault();
        if (dragStart) {
            const clientX = "touches" in event ? event.touches[0].clientX : event.clientX;
            const clientY = "touches" in event ? event.touches[0].clientY : event.clientY;

            const deltaX = clientX - dragStart.x;
            const deltaY = clientY - dragStart.y;

            if (deltaX) {
                setPosition((prevPosition) => ({
                    x: prevPosition.x + deltaX,
                    y: prevPosition.y - deltaY,
                }));
            }

            setDragStart({ x: clientX, y: clientY });

            loadAndDrawImage(imageUrl);
        }
    };

    const handleMouseUp = () => {
        setDragStart(null);
        loadAndDrawImage(imageUrl);
    };

    const loadAndDrawImage = (url: string) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageLoaded(true);
            drawImage(img, mirrorCount, position.x, position.y, zoomValue);
        };
    };

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            canvas.addEventListener("mousedown", handleMouseDown);
            canvas.addEventListener("mousemove", handleMouseMove);
            canvas.addEventListener("mouseup", handleMouseUp);
            canvas.addEventListener("touchstart", handleMouseDown);
            canvas.addEventListener("touchmove", handleMouseMove);
            canvas.addEventListener("touchend", handleMouseUp);

            return () => {
                canvas.removeEventListener("mousedown", handleMouseDown);
                canvas.removeEventListener("mousemove", handleMouseMove);
                canvas.removeEventListener("mouseup", handleMouseUp);
                canvas.removeEventListener("touchstart", handleMouseDown);
                canvas.removeEventListener("touchmove", handleMouseMove);
                canvas.removeEventListener("touchend", handleMouseUp);
            };
        }

    }, [canvasRef, handleMouseDown, handleMouseMove, handleMouseUp]);


    useEffect(() => {
        loadAndDrawImage(imageUrl);
    }, [imageLoaded, mirrorCount, position]);

    const drawImage = (img: HTMLImageElement, count: number, posX: number, posY: number, zoomValue: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");

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
            <Controls
                mirrorCount={mirrorCount}
                onMirrorCountChange={handleSliderChange}
                zoomValue={zoomValue}
                onZoomValueChange={handleZoomChange}
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
