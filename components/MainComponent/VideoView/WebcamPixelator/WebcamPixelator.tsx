import React, { useRef, useEffect, useState } from "react";

interface Props { }

const WebcamCanvas: React.FC<Props> = () => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [resolution, setResolution] = useState(20);

    useEffect(() => {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (!video || !canvas) {
            return;
        }

        //start the webcam stream
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream;
                video.play();
            })
            .catch((err) => {
                console.error("Error accessing webcam:", err);
            });

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            console.error("Error getting canvas context");
            return;
        }

        const draw = () => {
            if (!video.videoWidth || !video.videoHeight) {
                setTimeout(draw, 100);
                return;
            }

            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;


            // draw a black and white version of the video
            ctx.drawImage(video, 0, 0);
            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < imageData.data.length; i += 4) {
                const r = imageData.data[i];
                const g = imageData.data[i + 1];
                const b = imageData.data[i + 2];
                const brightness = (3 * r + 4 * g + b) >>> 3;
                imageData.data[i] = brightness;
                imageData.data[i + 1] = brightness;
                imageData.data[i + 2] = brightness;
            }
            ctx.putImageData(imageData, 0, 0);

            // draw a pixelated version of the video
            const pixelatedWidth = Math.floor(canvas.width / resolution);
            const pixelatedHeight = Math.floor(canvas.height / resolution);
            ctx.drawImage(
                canvas,
                0,
                0,
                canvas.width,
                canvas.height,
                0,
                0,
                pixelatedWidth,
                pixelatedHeight
            );
            ctx.drawImage(
                canvas,
                0,
                0,
                pixelatedWidth,
                pixelatedHeight,
                0,
                0,
                canvas.width,
                canvas.height
            );

            requestAnimationFrame(draw);
        };

        draw();

        return () => {
            if (video.srcObject) {
                (video.srcObject as MediaStream).getTracks().forEach((track) => {
                    track.stop();
                });
            }
        };
    }, [resolution]);

    const handleResolutionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newResolution = parseInt(event.target.value, 10);
        setResolution(newResolution);
    };

    return (
        <div>
            <video ref={videoRef} style={{ display: "none" }} />
            <canvas ref={canvasRef} />
            <div>
                <label htmlFor="resolution-slider">Resolution:</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    value={resolution}
                    onChange={handleResolutionChange}
                    id="resolution-slider"
                />
            </div>
        </div>
    );
};

export default WebcamCanvas;
