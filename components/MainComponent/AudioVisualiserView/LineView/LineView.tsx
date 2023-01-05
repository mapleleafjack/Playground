import { FC, useEffect } from 'react';
import s from './LineView.module.scss';


type LineViewProps = {
    data: Uint8Array;
    line_resolution: number
}

export const LineView: FC<LineViewProps> = ({ data, line_resolution }) => {
    useEffect(() => {
        updateLineView(data);
    }, [data, line_resolution]);

    const createCanvas = () => {
        var elements = [];

        for (let i = 0; i < line_resolution; i++) {
            const hue = Math.round(360 / line_resolution * i);
            const translateX = (i / line_resolution) * 100;

            let style = {
                "backgroundColor": "hsl(" + hue + ", 40%, 60%)",
                "transform": "translateX(" + translateX + "%) translateY(100%) scale(1)"
            };

            elements.push(<div key={"elm_line" + i} id={"elm_line" + i} style={style} className={`${s.el}`}></div>)
        }

        return elements
    }

    const updateLineView = (data: Uint8Array) => {
        for (let i = 0; i < line_resolution; i++) {
            const translateX = (line_resolution) * i;
            const scale = data[i] / line_resolution;

            var el = document.getElementById("elm_line" + i);

            if (el) {
                el.style.transform = "translateX(" + translateX + "%) translateY(100%) scale(" + scale + ")";
            }
        }
    }


    return (
        <div className={`${s.wrapper}`}>
            <div data-testid="flower-view" className={`${s.mainwheel}`}>{createCanvas()}</div>
        </div>
    );
}