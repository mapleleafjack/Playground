import React, { useState, useEffect, Suspense } from 'react';
import DraggableAudio from './DraggableAudio';
import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

const AudioScene: React.FC = () => {
    const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

    useEffect(() => {
        if (audioContext) {
            // Set the listener's context
            (window as any).__AUDIO_CONTEXT__ = audioContext;
        }
    }, [audioContext]);

    const handleStartClick = () => {
        const context = new AudioContext();
        setAudioContext(context);
    };

    return (
        <div>
            {audioContext === null && (
                <button onClick={handleStartClick} style={{ zIndex: 100, position: 'absolute' }}>
                    Start
                </button>
            )}
            <Canvas camera={{ position: [0, 0, 10] }}>
                <color attach="background" args={['black']} />
                <Stars />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <Suspense fallback={null}>
                    {audioContext !== null && (
                        <>
                            <DraggableAudio frequency={440} position={[0, 0, 0]} color="#00FF00" />
                            <DraggableAudio frequency={880} position={[2, 0, 0]} color="#0000FF" />
                        </>
                    )}
                </Suspense>
            </Canvas>
        </div>
    );
};

export default AudioScene;
