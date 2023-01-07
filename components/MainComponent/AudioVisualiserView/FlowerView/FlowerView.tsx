import { FC, useEffect } from 'react';
import s from './FlowerView.module.scss';

type FlowerViewProps = {
    resolution: number;
}

export const updateFlowerView = (data: Uint8Array, resolution: number, bottomFrequency: number, topFrequency: number) => {
    const sampleRate = 44100;

    const lowIndex = Math.floor(bottomFrequency / sampleRate * data.length);
    const highIndex = Math.ceil(topFrequency / sampleRate * data.length);
    const bandSize = Math.ceil((highIndex - lowIndex) / resolution);

    for (let i = 0; i < resolution; i++) {
        let sum = 0;
        for (let j = lowIndex + i * bandSize; j < lowIndex + (i + 1) * bandSize; j++) {
            sum += data[j];
        }
        const scale = sum / (bandSize * 256);
        const rotate = (360 / resolution) * i;

        const el = document.getElementById(`elm${i}`);
        if (el) {
            el.style.transform = `rotate(${rotate}deg) scale(${scale})`;
            el.setAttribute("data-frequency-range", `${bottomFrequency + i * (topFrequency - bottomFrequency) / resolution} Hz - ${bottomFrequency + (i + 1) * (topFrequency - bottomFrequency) / resolution} Hz`);
        }
    }
};

export const FlowerView: FC<FlowerViewProps> = ({ resolution: resolution }) => {

    const createCanvas = () => {
        const elements = [];
        const rotateUnit = 360 / resolution;

        for (let i = 0; i < resolution; i++) {
            const hue = Math.round(360 / resolution * i);
            const rotate = rotateUnit * i;

            let style = {
                backgroundColor: `hsl(${hue}, 40%, 60%)`,
                transform: `rotate(${rotate}deg) scale(1)`,
            };

            elements.push(
                <div
                    key={`elm${i}`}
                    id={`elm${i}`}
                    style={style}
                    className={`${s.el}`}
                ></div>
            );
        }

        return elements;
    };

    return (
        <div className={`${s.wrapper}`}>
            <div data-testid="flower-view" className={`${s.mainwheel}`}>{createCanvas()}</div>
        </div>
    );
}