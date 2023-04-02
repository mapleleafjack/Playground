import React, { createContext, useState, useEffect } from 'react';

interface SineWaveContextProps {
    frequency: number;
    amplitude: number;
    sineWaveData: number[];
    setFrequency: React.Dispatch<React.SetStateAction<number>>;
    setAmplitude: React.Dispatch<React.SetStateAction<number>>;
}

const SineWaveContext = createContext<SineWaveContextProps>({
    frequency: 0,
    amplitude: 0,
    sineWaveData: [],
    setFrequency: () => { },
    setAmplitude: () => { },
});

const SineWaveProvider: React.FC = ({ children }) => {
    const [frequency, setFrequency] = useState<number>(440);
    const [amplitude, setAmplitude] = useState<number>(0.5);
    const [sineWaveData, setSineWaveData] = useState<number[]>([]);

    useEffect(() => {
        const sampleRate = 44100; // Hz
        const time = 2; // seconds
        const samples = time * sampleRate;

        const sineWave = new Array(samples);
        for (let i = 0; i < samples; i++) {
            sineWave[i] = amplitude * Math.sin((2 * Math.PI * frequency * i) / sampleRate);
        }

        setSineWaveData(sineWave);
    }, [frequency, amplitude]);

    return (
        <SineWaveContext.Provider value={{ frequency, amplitude, sineWaveData, setFrequency, setAmplitude }}>
            {children}
        </SineWaveContext.Provider>
    );
};

export { SineWaveContext, SineWaveProvider };