import { Canvas } from '@react-three/fiber';
import React, { FC } from 'react';
import { DataThingy } from 'types';

interface ComponentProps {
    data: DataThingy[];
}

const CanvasView: FC<ComponentProps> = ({ data }) => {
    return (
        <Canvas>
            <ambientLight intensity={0.1} />
            <directionalLight color="red" position={[0, 0, 5]} />
            <mesh>
                <boxGeometry />
                <meshStandardMaterial />
            </mesh>
        </Canvas>

    );
};

export default CanvasView;