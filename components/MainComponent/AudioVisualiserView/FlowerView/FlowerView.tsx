import { FC, useEffect } from 'react';
import s from './FlowerView.module.scss';

type FlowerViewProps = {
    resolution: number;
}

export const updateFlowerView = (data: Uint8Array, resolution: number) => {
    for (let i = 0; i < resolution; i++) {
        const rotate = (360 / resolution) * i;
        const scale = data[i] / resolution;

        var el = document.getElementById("elm" + i);
        if (el) {
            el.style.transform = "rotate(" + rotate + "deg" + ") scale(" + scale + ")";
        }
    }
}

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