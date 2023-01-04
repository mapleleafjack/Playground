import React, { FC, useContext, useEffect, useState } from 'react';

import { FlowerView, updateFlowerView } from './FlowerView/FlowerView';

const AudioVisualiserView: FC = () => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();

    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
        });

    const idleAnimation = (fps: number) => {
        var drawAlt = function () {
            const data = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(data);

            updateFlowerView(data, flowerShape)

            setTimeout(() => {
                requestAnimationFrame(drawAlt);
            }, 1000 / fps);
        };
        requestAnimationFrame(drawAlt);
    };
    const [flowerShape, setFlowerShape] = useState("flower");



    useEffect(() => {
        idleAnimation(60)
    }, [flowerShape]);

    const onchangeShape = (value: string) => {
        setFlowerShape(value)
    }

    return (
        <div>
            <FlowerView flowerShape={flowerShape} />
            <label htmlFor="flower-shape-select">Choose flower shape:</label>
            <select
                id="flower-shape-select"
                value={flowerShape}
                onChange={(event) => {
                    onchangeShape(event.target.value)
                }}
            >
                <option value="line">Line</option>
                <option value="flower">Flower</option>
            </select>
        </div>
    );
};

export default AudioVisualiserView;