import React, { FC, useState } from 'react';
import { DataThingy } from 'types';
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei';


interface ComponentProps {
    data: DataThingy[];
}

const loadData = (data: DataThingy[]) => {
    let pos = (data.length) * -1;

    let element = data.map(elm => {
        let dato = <mesh
            key={elm.id}
            position={[pos, 0, 0]}
            scale={[3, 3, 3]}
        >
            <boxBufferGeometry attach="geometry" />
            <meshStandardMaterial
                attach="material"
                metalness={0.9}
                roughness={0.1}
                color="orange"
                opacity={1}
                transparent
            />
        </mesh>
        pos += 4
        return dato
    })
    return element
}

const CanvasView: FC<ComponentProps> = ({ data }) => {
    const loadedData = loadData(data)

    return <Canvas style={{ background: "black" }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Stars />
        <OrbitControls />
        {loadedData}
    </Canvas>
};

export default CanvasView;
