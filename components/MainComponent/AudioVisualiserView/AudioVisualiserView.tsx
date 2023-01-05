import React, { FC, useEffect, useState } from 'react';

import { FlowerView, updateFlowerView } from './FlowerView/FlowerView';
import { LineView, updateLineView } from './LineView/LineView';

const AudioVisualiserView: FC = () => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    const [selectedEffect, setFlowerShape] = useState("line");

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

            selectedEffect == "flower" && updateFlowerView(data, 100)
            selectedEffect == "line" && updateLineView(data, 100)
        };
        setInterval(drawAlt, 1000 / fps);
    };

    useEffect(() => {
        idleAnimation(30)
    }, [selectedEffect]);

    return (
        <div>
            {selectedEffect == "flower" && <FlowerView element_number={100} />}
            {selectedEffect == "line" && <LineView line_resolution={100} />}

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
