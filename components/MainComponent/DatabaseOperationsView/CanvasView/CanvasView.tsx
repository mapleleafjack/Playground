import { Canvas } from '@react-three/fiber';
import React, { FC } from 'react';
import { DataThingy } from 'types';

interface ComponentProps {
    data: DataThingy[];
}

const CanvasView: FC<ComponentProps> = ({ data }) => {
    console.log(data)
    return (
        <Canvas style={{ background: "black" }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 0, 10]} angle={0.3} />
            <>
                <mesh position={[0, 0, 0]} scale={[1, 1, 1]} >
                    <boxBufferGeometry attach="geometry" />
                    <meshBasicMaterial attach="material" color="red" opacity={1} transparent />
                </mesh>
            </>
        </Canvas >

    );
};

export default CanvasView;