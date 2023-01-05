import { FC, useCallback, useEffect, useRef, useState } from 'react';
import s from './LineView.module.scss';

type LineViewProps = {
    resolution: number
}

export const updateLineView = (data: Uint8Array, resolution: number) => {
    for (let i = 0; i < resolution; i++) {
        const translateX = (resolution) * i;
        const scale = data[i] / resolution;

        var el = document.getElementById("lineview" + i);

        if (el) {
            el.style.transform = "translateX(" + translateX + "%) translateY(100%) scale(" + scale + ")";
        }
    }
};

export const LineView: FC<LineViewProps> = ({ resolution }) => {
    const createCanvas = () => {
        var elements = [];
        for (let i = 0; i < resolution; i++) {
            const hue = Math.round(360 / resolution * i);
            const translateX = (i / resolution) * 100;

            let style = {
                "backgroundColor": "hsl(" + hue + ", 40%, 60%)",
                "transform": "translateX(" + translateX + "%) translateY(100%) scale(1)"
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
