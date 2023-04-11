import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { OrbitControls } from '@react-three/drei';

interface VideoProps {
    url: string;
    useWebcam: boolean;
}

const useVideoSource = (url: string, useWebcam: boolean) => {
    const videoRef = useRef<HTMLVideoElement | null>(
        document.createElement('video')
    );

    useEffect(() => {
        if (videoRef.current) {
            //clears the previous videoRef.current
            if (videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject as MediaStream;
                const tracks = stream.getTracks();
                tracks.forEach(function (track) {
                    track.stop();
                });
                videoRef.current.srcObject = null;
            }

            if (useWebcam) {
                navigator.mediaDevices
                    .getUserMedia({ video: true, audio: false })
                    .then((stream) => {
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.play();
                        }
                    })
                    .catch((err) => {
                        console.error('Error accessing webcam:', err);
                    });
            } else {
                videoRef.current.crossOrigin = 'anonymous';
                videoRef.current.src = url;
                videoRef.current.loop = true;
                videoRef.current.muted = true;
                videoRef.current.playsInline = true;
                videoRef.current.play();
            }
        }
    }, [url, useWebcam]);

    return videoRef;
};

const VideoCube: React.FC<VideoProps> = ({ url, useWebcam }) => {
    const meshRef = useRef<any>();
    const videoRef = useVideoSource(url, useWebcam);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.01;
        }
    });

    return (
        <>
            <mesh ref={meshRef}>
                <boxBufferGeometry args={[2, 2, 2]} />
                <meshBasicMaterial side={DoubleSide}>
                    {videoRef.current && <videoTexture
                        attach="map"
                        args={[
                            videoRef.current,
                        ]}
                    />}
                </meshBasicMaterial>
            </mesh>
        </>
    );
};

const VideoComponent: React.FC = () => {
    const [isWebcamEnabled, setIsWebcamEnabled] = React.useState(false);

    const toggleWebcam = () => {
        setIsWebcamEnabled(!isWebcamEnabled);
    };

    return (
        <div style={{ width: '100vw', height: '100vh' }}>
            <button onClick={toggleWebcam} style={{ zIndex: 1, position: 'absolute' }}>
                {isWebcamEnabled ? 'Switch to URL' : 'Switch to Webcam'}
            </button>
            <Canvas>
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                <VideoCube
                    url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                    useWebcam={isWebcamEnabled}
                />
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default VideoComponent;
