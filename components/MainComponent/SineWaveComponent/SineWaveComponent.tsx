import { SineWaveContext } from 'lib/sineProvider';
import React, { useContext } from 'react';

const SineWaveComponent: React.FC = () => {
    const { frequency, amplitude, sineWaveData, setFrequency, setAmplitude } = useContext(SineWaveContext);

    return (
        <>
            <h2>Sine Wave</h2>
            <p>Frequency: {frequency} Hz</p>
            <input type="range" min="20" max="20000" value={frequency} onChange={(e) => setFrequency(Number(e.target.value))} />
            <p>Amplitude: {amplitude}</p>
            <input type="range" min="0" max="1" step="0.1" value={amplitude} onChange={(e) => setAmplitude(Number(e.target.value))} />
            <canvas width={800} height={200} ref={(canvas) => {
                if (!canvas) {
                    return;
                }

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    return;
                }

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.beginPath();
                for (let i = 0; i < sineWaveData.length; i++) {
                    const x = (i / sineWaveData.length) * canvas.width;
                    const y = ((sineWaveData[i] + 1) / 2) * canvas.height;
                    ctx.lineTo(x, y);
                }
                ctx.stroke();
            }} />
        </>
    );
};

export { SineWaveComponent };