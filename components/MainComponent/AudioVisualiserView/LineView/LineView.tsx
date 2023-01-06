import { FC, useCallback, useEffect, useRef, useState } from 'react';
import s from './LineView.module.scss';

type LineViewProps = {
    resolution: number
}

export const updateLineView = (data: Uint8Array, resolution: number) => {
    const maxHeight = 70;

    for (let i = 0; i < resolution; i++) {
        const scale = (data[i] / 256) * maxHeight;
        var el = document.getElementById("lineview" + i);

        if (el) {
            el.style.height = scale + "vw";
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
