import React, { useRef, useEffect, useState, } from 'react';
import { Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';

type DraggableAudioProps = {
    frequency: number;
    position: [number, number, number];
    color: string;
};

const DraggableAudio: React.FC<DraggableAudioProps> = ({ frequency, position, color }) => {
    const meshRef = useRef<THREE.Mesh<THREE.BufferGeometry, THREE.Material> | null>(null);
    const audioRef = useRef<THREE.PositionalAudio | null>(null);
    const gainNodeRef = useRef<GainNode | null>(null);

    const [isPlaying, setIsPlaying] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const [sphereColor, setSphereColor] = useState('#FF0000');
    const [spherePosition, setSpherePosition] = useState(position);

    const { camera } = useThree();

    useEffect(() => {
        const listener = new THREE.AudioListener();
        camera.add(listener);

        const positionalAudio = new THREE.PositionalAudio(listener);
        audioRef.current = positionalAudio;

        const context = listener.context;
        const oscillator = context.createOscillator();
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(frequency, context.currentTime);

        const gainNode = context.createGain();
        gainNode.gain.setValueAtTime(0, context.currentTime); // Set gain value to 0.5
        gainNodeRef.current = gainNode; // Set the gainNodeRef

        oscillator.connect(gainNode);

        // Connect GainNode to the PositionalAudio
        gainNode.connect(audioRef.current.panner);

        // Start the oscillator
        oscillator.start();

        // Pause the audio initially
        audioRef.current.pause();

        return () => {
            oscillator.stop();
            camera.remove(listener);
        };
    }, [frequency, camera]);


    const handleClick = () => {
        if (audioRef.current && gainNodeRef.current) {
            if (isPlaying) {
                gainNodeRef.current.gain.setValueAtTime(0, audioRef.current.context.currentTime); // Set gain to 0
                audioRef.current.pause();
                setSphereColor('#FF0000');
            } else {
                gainNodeRef.current.connect(audioRef.current.panner);
                gainNodeRef.current.gain.setValueAtTime(0.5, audioRef.current.context.currentTime); // Set gain to 0

                audioRef.current.play();
                setSphereColor(color);
            }
            setIsPlaying(!isPlaying);
            setIsDragging(true)
        }
    };

    const handleDrag = (e: any) => {
        if (isDragging) {
            setSpherePosition([e.point.x, e.point.y, e.point.z]);
        }
    };

    return (
        <group onClick={handleClick} onPointerUp={handleDrag} onPointerDown={handleDrag} >
            <Sphere args={[1, 32, 32]} ref={meshRef} position={spherePosition}>
                <meshStandardMaterial attach="material" color={sphereColor} />
                {audioRef.current && <primitive object={audioRef.current} />}
            </Sphere>
        </group>
    );
};

export default DraggableAudio;
