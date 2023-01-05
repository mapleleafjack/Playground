import { FC, useEffect } from 'react';
import s from './FlowerView.module.scss';

type FlowerViewProps = {
    element_number: number;
}

export const updateFlowerView = (data: Uint8Array, element_number: number) => {
    for (let i = 0; i < element_number; i++) {
        const rotate = (360 / element_number) * i;
        const scale = data[i] / element_number;

        var el = document.getElementById("elm" + i);
        if (el) {
            el.style.transform = "rotate(" + rotate + "deg" + ") scale(" + scale + ")";
        }
    }
}

export const FlowerView: FC<FlowerViewProps> = ({ element_number }) => {

    const createCanvas = () => {
        const elements = [];
        const rotateUnit = 360 / element_number;

        for (let i = 0; i < element_number; i++) {
            const hue = Math.round(360 / element_number * i);
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