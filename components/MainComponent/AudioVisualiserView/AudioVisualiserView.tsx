import React, { FC, useEffect, useState } from 'react';

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
    const idleAnimation = () => {

        let next_elm = 0

        var drawAlt = function () {
            for (let i = 0; i < 100; i++) {
                const hue = Math.round(360 / 100 * i);
                const rotate = (360 / 100) * i;

                var el = document.getElementById('elm' + i);

                if (el) {
                    if (next_elm == i) {
                        el.style.transform = 'rotate(' + rotate + "deg" + ') scale(1.3)';
                        el.style.backgroundColor = 'orange';
                    } else {
                        el.style.transform = 'rotate(' + rotate + "deg" + ') scale(1)';
                        el.style.backgroundColor = 'hsl(' + hue + ', 40%, 60%)'
                    }
                }
            }

            next_elm++;

            if (next_elm == 100) {
                next_elm = 0
            }

            requestAnimationFrame(drawAlt);
        }
        let timer = requestAnimationFrame(drawAlt);
    }

    useEffect(() => {
        idleAnimation()
    }, [])

    return <p className={`${s.wrapper}`}>
        <div className={`${s.mainwheel}`}>{createElement(100)}</div>
    </p>
};

export default AudioVisualiserView;