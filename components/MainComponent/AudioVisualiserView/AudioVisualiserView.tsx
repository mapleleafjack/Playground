import { NumeroContext } from 'lib/audioProvider';
import React, { FC, useContext, useEffect, useState } from 'react';

import s from './AudioVisualiserView.module.scss';

const createElement = (numberOfEls: number) => {
    var elements = [];

    for (let i = 0; i < numberOfEls; i++) {
        const hue = Math.round(360 / numberOfEls * i);
        const rotate = (360 / numberOfEls) * i;

        let style = {
            "backgroundColor": 'hsl(' + hue + ', 40%, 60%)',
            "transform": 'rotate(' + rotate + "deg" + ') scale(1)'
        }
        elements.push(<div key={"elm" + i} id={"elm" + i} style={style} className={`${s.el}`}></div>)
    }

    return elements
}

const AudioVisualiserView: FC = () => {
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();

    // Set up microphone input
    navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
            const microphone = audioContext.createMediaStreamSource(stream);
            microphone.connect(analyser);
        });

    const numero = useContext(NumeroContext);

    const idleAnimation = (fps: number) => {
        let next_elm = 0;
        var drawAlt = function () {
            // Get frequency data from the analyser
            const data = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(data);

            for (let i = 0; i < 100; i++) {
                const rotate = (360 / 100) * i;

                var el = document.getElementById("elm" + i);

                // Calculate scale based on the amplitude of the current slice of the analyzer
                const scale = data[i] / 100;

                if (el) {
                    el.style.transform = "rotate(" + rotate + "deg" + ") scale(" + scale + ")";
                    el.style.backgroundColor = "orange";
                }
            }

            setTimeout(() => {
                requestAnimationFrame(drawAlt);
            }, 1000 / fps);
        };
        requestAnimationFrame(drawAlt);
    };

    useEffect(() => {
        numero && idleAnimation(numero);
    }, []);

    return (
        <div className={`${s.wrapper}`}>
            <div className={`${s.mainwheel}`}>{createElement(100)}</div>
        </div>
    );
};

export default AudioVisualiserView;