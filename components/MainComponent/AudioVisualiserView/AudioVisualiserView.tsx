import React, { FC, useEffect, useState } from 'react';

import { FlowerView } from './FlowerView/FlowerView';
import { LineView } from './LineView/LineView';

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

            setData(data);
        };
        setInterval(drawAlt, 1000 / fps);
    };
    const [selectedEffect, setFlowerShape] = useState("flower");
    const [data, setData] = useState(new Uint8Array(analyser.frequencyBinCount));

    useEffect(() => {
        idleAnimation(60)
    }, [selectedEffect]);

    return (
        <div>
            {selectedEffect == "flower" && <FlowerView data={data} element_number={100} />}

            <label htmlFor="flower-shape-select">Choose flower shape:</label>
            <select
                id="flower-shape-select"
                value={selectedEffect}
                onChange={(event) => {
                    setFlowerShape(event.target.value)
                }}
            >
                <option value="line">Line</option>
                <option value="flower">Flower</option>
            </select>
        </div>
    );
};

export default AudioVisualiserView;
