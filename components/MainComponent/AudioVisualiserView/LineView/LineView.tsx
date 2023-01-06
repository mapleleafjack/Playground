import { FC, useCallback, useEffect, useRef, useState } from 'react';
import s from './LineView.module.scss';

type LineViewProps = {
    resolution: number
}

export const updateLineView = (data: Uint8Array, resolution: number, bottomFrequency: number, topFrequency: number) => {
    const maxHeight = 50;

    const sampleRate = 44100;

    const lowIndex = Math.floor(bottomFrequency / sampleRate * data.length);
    const highIndex = Math.ceil(topFrequency / sampleRate * data.length);
    const bandSize = Math.ceil((highIndex - lowIndex) / resolution);

    for (let i = 0; i < resolution; i++) {
        let sum = 0;
        for (let j = lowIndex + i * bandSize; j < lowIndex + (i + 1) * bandSize; j++) {
            sum += data[j];
        }
        const scale = (sum / (bandSize * 256)) * maxHeight;
        const el = document.getElementById(`lineview${i}`);
        if (el) {
            el.style.height = `${scale}vw`;
            el.setAttribute("data-frequency-range", `${bottomFrequency + i * (topFrequency - bottomFrequency) / resolution} Hz - ${bottomFrequency + (i + 1) * (topFrequency - bottomFrequency) / resolution} Hz`);
        }
    }
};


export const LineView: FC<LineViewProps> = ({ resolution }) => {
    const createCanvas = () => {
        var elements = [];
        for (let i = 0; i < resolution; i++) {
            const hue = Math.round(360 / resolution * i);

            let style = {
                "width": `${100 / resolution}%`,
                "backgroundColor": "hsl(" + hue + ", 40%, 60%)",
            };

            elements.push(
                <div
                    key={`lineview${i}`}
                    id={`lineview${i}`}
                    style={style}
                    className={`${s.el}`}
                ></div>
            );
        }
        return elements;
    };

    return (
        <div className={`${s.wrapper}`}>
            <div data-testid="line-view" id="line-view" className={`${s.mainwheel}`}>
                {createCanvas()}
            </div>
        </div>
    );
};
