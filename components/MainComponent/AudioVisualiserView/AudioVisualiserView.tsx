import React, { FC, useEffect, useRef, useState } from 'react';

import { FlowerView, updateFlowerView } from './FlowerView/FlowerView';
import { LineView, updateLineView } from './LineView/LineView';

const AudioVisualiserView: FC = () => {
    const [selectedEffect, setFlowerShape] = useState("line");
    const [animationId, setAnimationId] = useState<Timer>(null);

    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();

    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
        });

    useEffect(() => {
        console.log("useEffect")

        const runAnimation = (fps: number) => {
            var draw = function () {
                const data = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(data);

                selectedEffect == "flower" && updateFlowerView(data, 100)
                selectedEffect == "line" && updateLineView(data, 100)
            };
            console.log("run Animation")

            let animation = setInterval(draw, 1000 / fps)

            console.log(animation)

            setAnimationId(animation);
            console.log(animationId)
        };

        if (animationId) {
            console.log("clear Animation")
            clearInterval(animationId)
        }
        runAnimation(30)
    }, [selectedEffect]); // Only re-run the effect if selectedEffect changes

    return (
        <div>
            {selectedEffect == "flower" && <FlowerView resolution={100} />}
            {selectedEffect == "line" && <LineView resolution={100} />}

            <label htmlFor="flower-shape-select">Choose flower shape:</label>
            <select
                id="flower-shape-select"
                value={selectedEffect}
                onChange={(event) => {
                    console.log("change!")
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
