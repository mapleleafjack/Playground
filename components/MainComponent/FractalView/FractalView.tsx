import React, { useState, useEffect } from "react";

type FractalViewProps = {
    imageUrl: string;
};

const FractalView: React.FC<FractalViewProps> = ({ imageUrl }) => {
    const [mirrorCount, setMirrorCount] = useState<number>(1);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const [dragStart, setDragStart] = useState<{ x: number, y: number } | null>(null);
    const [position, setPosition] = useState<{ x: number, y: number }>({ x: 0, y: 0 });

    const handleMouseDown = (event: any) => {
        setDragStart({ x: event.clientX, y: event.clientY });
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (dragStart) {
            const deltaX = event.clientX - dragStart.x;
            const deltaY = event.clientY - dragStart.y;
            setPosition((prevPosition) => ({
                x: prevPosition.x + deltaX,
                y: prevPosition.y + deltaY,
            }));
            setDragStart({ x: event.clientX, y: event.clientY });

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
            drawImage(img, mirrorCount, position.x, position.y);
        };
    };

    useEffect(() => {
        loadAndDrawImage(imageUrl);
    }, [imageLoaded, mirrorCount]);

    useEffect(() => {
        const canvas = canvasRef.current;

        if (canvas) {
            canvas.addEventListener("mousedown", handleMouseDown);
            canvas.addEventListener("mousemove", handleMouseMove);
            canvas.addEventListener("mouseup", handleMouseUp);

            return () => {
                canvas.removeEventListener("mousedown", handleMouseDown);
                canvas.removeEventListener("mousemove", handleMouseMove);
                canvas.removeEventListener("mouseup", handleMouseUp);
            };
        }

    }, [canvasRef, handleMouseDown, handleMouseMove, handleMouseUp]);

    const drawImage = (img: HTMLImageElement, count: number, posX: number, posY: number) => {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext("2d");
        const centerX = img.width / 2;
        const centerY = img.height / 2;
        const radius = Math.min(centerX, centerY);
        const angleStep = (2 * Math.PI) / count;

        if (canvas) {
            canvas.width = radius * 2;
            canvas.height = radius * 2;

            for (let i = 0; i < count; i++) {
                const startAngle = i * angleStep;
                const endAngle = (i + 1) * angleStep;

                ctx?.save();
                ctx?.beginPath();
                ctx?.moveTo(centerX, centerY);
                ctx?.arc(centerX, centerY, radius, startAngle, endAngle);
                ctx?.closePath();
                ctx?.clip();
                ctx?.translate(centerX, centerY);
                ctx?.rotate(startAngle);
                ctx?.scale(-1, 1);
                ctx?.drawImage(
                    img,
                    posX,
                    posY,
                    img.width,
                    img.height,
                    -radius,
                    -radius,
                    radius * 2,
                    radius * 2
                );
                ctx?.restore();
            }
        }
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newCount = parseInt(event.target.value);
        setMirrorCount(newCount);
        const img = new Image();
        img.src = imageUrl;
        img.onload = () => drawImage(img, mirrorCount, position.x, position.y);
    };

    return (
        <>
            <input
                type="range"
                min="1"
                max="12"
                value={mirrorCount}
                onChange={handleSliderChange}
            />
            {imageLoaded ? (
                <canvas ref={canvasRef} />
            ) : (
                <p>Loading image...</p>
            )}
        </>
    );
};

export default FractalView;
