import { FC, useState } from 'react';
import s from './FlowerView.module.scss';

const createElement = (numberOfEls: number, flowerShape: string) => {
    var elements = [];

    for (let i = 0; i < numberOfEls; i++) {
        const hue = Math.round(360 / numberOfEls * i);

        let style;

        if (flowerShape == "flower") {
            const rotate = (360 / numberOfEls) * i;

            style = {
                "backgroundColor": 'hsl(' + hue + ', 40%, 60%)',
                "transform": 'rotate(' + rotate + "deg" + ') scale(1)'
            }
        } else {
            const translateX = (i / numberOfEls) * 100;

            style = {
                "backgroundColor": "hsl(" + hue + ", 40%, 60%)",
                "transform": "translateX(" + translateX + "%) translateY(100%) scale(1)"
            };
        }

        elements.push(<div key={"elm" + i} id={"elm" + i} style={style} className={`${s.el}`}></div>)
    }

    return elements
}

export const redrawFlowerView = (data: Uint8Array, flowerShape: string) => {
    //to do implementation
}

export const updateFlowerView = (data: Uint8Array, flowerShape: string) => {
    for (let i = 0; i < 100; i++) {
        const rotate = (360 / 100) * i;
        const translateX = (100) * i;

        var el = document.getElementById("elm" + i);

        const scale = data[i] / 100;

        if (el) {
            if (flowerShape == "flower") {
                el.style.transform = "rotate(" + rotate + "deg" + ") scale(" + scale + ")";
            } else {
                el.style.transform = "translateX(" + translateX + "%) translateY(100%) scale(" + scale + ")";
            }
        }
    }
}


type FlowerViewProps = {
    flowerShape: string;
}

export const FlowerView: FC<FlowerViewProps> = ({ flowerShape }) => {
    return (
        <div className={`${s.wrapper}`}>
            <div className={`${s.mainwheel}`}>{createElement(100, flowerShape)}</div>
        </div>
    );
}