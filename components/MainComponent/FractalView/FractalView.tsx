import React, { useState, useEffect } from "react";

type FractalViewProps = {
    imageUrl: string;
};

const FractalView: React.FC<FractalViewProps> = ({ imageUrl }) => {
    const [mirrorCount, setMirrorCount] = useState<number>(1);
    const [imageLoaded, setImageLoaded] = useState<boolean>(false);
    const canvasRef = React.useRef<HTMLCanvasElement>(null);

    const loadAndDrawImage = (url: string) => {
        const img = new Image();
        img.src = url;
        img.onload = () => {
            setImageLoaded(true);
            drawImage(img, mirrorCount);
        };
    };

    useEffect(() => {
        loadAndDrawImage(imageUrl);
    }, []);

    const drawImage = (img: HTMLImageElement, count: number) => {
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
                    0,
                    0,
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
        img.onload = () => drawImage(img, newCount);
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
