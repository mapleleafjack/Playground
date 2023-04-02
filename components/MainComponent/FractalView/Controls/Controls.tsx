import { Slider } from "@blueprintjs/core";
import React from "react";

interface Props {
    mirrorCount: number;
    onMirrorCountChange: (newCount: number) => void;
    zoomValue: number;
    onZoomValueChange: (newZoom: number) => void;
}

const Controls: React.FC<Props> = ({
    mirrorCount,
    onMirrorCountChange,
    zoomValue,
    onZoomValueChange,
}) => {
    return (
        <>
            <label>Slices:</label>
            <Slider min={1} max={12} value={mirrorCount} onChange={onMirrorCountChange} />
            <label>Zoom:</label>
            <Slider
                min={0}
                max={4}
                stepSize={0.1}
                value={zoomValue}
                onChange={onZoomValueChange}
            />
        </>
    );
};

export default Controls;