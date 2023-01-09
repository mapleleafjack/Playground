import React, { FC, useState } from 'react';
import AnalyserProvider from 'lib/audioProvider';
import { Button, Intent, NumericInput } from '@blueprintjs/core';
import { FlowerVisualisation } from './Visualisation/VisualisationTypes/FlowerVisualisation';

import s from './AudioVisualiserView.module.scss';
import { LineVisualisation } from './Visualisation/VisualisationTypes/LineVisualisation';


const AudioVisualiserView: FC = () => {
    const [resolution, setResolution] = useState(100);
    const [bottomFrequency, setBottomFrequency] = useState(0);
    const [topFrequency, setTopFrequency] = useState(18000);
    const [micStarted, setMicStarted] = useState(false);

    return (
        <AnalyserProvider microphoneStarted={micStarted}>
            <div className={`${s.visualiserContainer}`} >
                <Button
                    className="bp4"
                    icon="record"
                    intent={micStarted ? Intent.DANGER : Intent.PRIMARY}
                    onClick={() => {
                        setMicStarted(!micStarted);
                    }}>
                    {micStarted ? 'Stop microphone' : 'Start microphone'}
                </Button>

                <div className="input-group">
                    <label className="bp3-label" htmlFor="bottom_frequency">
                        Bottom frequency:
                    </label>
                    <NumericInput
                        id="bottom_frequency"
                        min={0}
                        max={18000}
                        value={bottomFrequency}
                        onValueChange={(value) => setBottomFrequency(value)}
                    />
                </div>

                <div className="input-group">
                    <label className="bp3-label" htmlFor="top_frequency">
                        Top frequency:
                    </label>
                    <NumericInput
                        id="top_frequency"
                        min={0}
                        max={22000}
                        value={topFrequency}
                        onValueChange={(value) => setTopFrequency(value)}
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="resolution_range">Resolution:</label>
                    <input
                        id="resolution_range"
                        type="range"
                        min={1}
                        max={150}
                        onMouseUp={(event) => setResolution(event.currentTarget.valueAsNumber)}
                    />
                </div>
                <div className={`${s.visualiser}`}>
                    <LineVisualisation resolution={resolution} bottomFrequency={bottomFrequency} topFrequency={topFrequency} />
                    <FlowerVisualisation resolution={resolution} bottomFrequency={bottomFrequency} topFrequency={topFrequency} />
                </div>
            </div>
        </AnalyserProvider >

    );
};
export default AudioVisualiserView;
