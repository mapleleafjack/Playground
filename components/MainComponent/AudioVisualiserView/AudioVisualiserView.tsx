import React, { FC, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { FlowerView, updateFlowerView } from './FlowerView/FlowerView';
import { LineView, updateLineView } from './LineView/LineView';


const AudioVisualiserView: FC = () => {
    const [selectedEffect, setSelectedEffect] = useState("line");
    const [resolution, setResolution] = useState(100);
    const [animationId, setAnimationId] = useState<NodeJS.Timer | null>(null);

    // const firstUpdate = useRef(true);

    useEffect(() => {
        // if (firstUpdate.current) {
        //     firstUpdate.current = false;
        //     return;
        // }

        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();


        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
            });

        const runAnimation = (fps: number) => {
            var draw = function () {
                const data = new Uint8Array(analyser.frequencyBinCount);
                analyser.getByteFrequencyData(data);

                selectedEffect == "flower" && updateFlowerView(data, resolution)
                selectedEffect == "line" && updateLineView(data, resolution)
            };
            setAnimationId(setInterval(draw, 1000 / fps));
        };

        if (animationId) {
            clearInterval(animationId)
        }
        runAnimation(30)
    }, [selectedEffect, resolution]);

    return (
        <>

            <div className='component-layout'>
                {selectedEffect == "flower" && <FlowerView resolution={resolution} />}
                {selectedEffect == "line" && <LineView resolution={resolution} />}
            </div>

            <div className='controls'>
                <label htmlFor="flower-shape-select">Choose flower shape:</label>
                <select
                    id="flower-shape-select"
                    value={selectedEffect}
                    onChange={(event) => {
                        console.log("change!")
                        setSelectedEffect(event.target.value)
                    }}
                >
                    <option value="line">Line</option>
                    <option value="flower">Flower</option>
                </select>
                <input
                    type="range"
                    min={1}
                    max={150}
                    onMouseUp={event => setResolution(event.currentTarget.valueAsNumber)}
                />
            </div>
        </>
    );
};
export default AudioVisualiserView;
