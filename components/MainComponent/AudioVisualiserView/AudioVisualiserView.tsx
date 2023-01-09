import React, { FC, useState } from 'react';

import FlowerView from './FlowerView/FlowerView';
import LineView from './LineView/LineView';
import s from './AudioVisualiserView.module.scss';
import AnalyserProvider from 'lib/audioProvider';
import { Button } from '@blueprintjs/core';

const AudioVisualiserView: FC = () => {
    const [resolution, setResolution] = useState(100);
    const [bottomFrequency, setBottomFrequency] = useState(0);
    const [topFrequency, setTopFrequency] = useState(18000);
    const [micStarted, setMicStarted] = useState(false);

    return (
        <AnalyserProvider microphoneStarted={micStarted}>

            <div className={`${s.visualiserContainer}`} >
                <div className='controls'>
                    <Button onClick={() => {
                        setMicStarted(!micStarted);
                    }}>
                        {micStarted ? 'Stop microphone' : 'Start microphone'}
                    </Button>

                    <div className="input-group">
                        <label htmlFor="bottom_frequency">Bottom frequency:</label>
                        <input
                            id="bottom_frequency"
                            type="number"
                            min={0}
                            max={18000}
                            defaultValue={0}
                            onChange={(event) => {
                                setBottomFrequency(event.target.valueAsNumber);
                            }}
                        />
                    </div>

                    <div className="input-group">
                        <label htmlFor="top_frequency">Top frequency:</label>
                        <input
                            id="top_frequency"
                            type="number"
                            min={1}
                            max={18000}
                            defaultValue={18000}
                            onChange={(event) => {
                                setTopFrequency(event.target.valueAsNumber);
                            }}
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
                </div>

                <div className={`${s.visualiser}`}>
                    <LineView resolution={resolution} bottomFrequency={bottomFrequency} topFrequency={topFrequency} />
                    <FlowerView resolution={resolution} bottomFrequency={bottomFrequency} topFrequency={topFrequency} />
                </div>
            </div>
        </AnalyserProvider>

    );
};
export default AudioVisualiserView;
