import { createContext, FC, ReactNode, useContext, useEffect, useState } from "react";
import AnalyserProvider, { AnalyserContext } from "./audioProvider";

export const RootFrequencyContext = createContext<number | null>(null);

type RootFrequencyProviderProps = {
    children?: ReactNode;
    microphoneStarted: boolean;
    sensitivity: number;
};

const RootFrequencyProvider: FC<RootFrequencyProviderProps> = ({
    children,
    microphoneStarted,
    sensitivity,
}) => {
    const analyser = useContext(AnalyserContext);
    const [rootFrequency, setRootFrequency] = useState<number | null>(null);

    useEffect(() => {
        if (!analyser || !microphoneStarted) {
            setRootFrequency(null);
            return;
        }

        const calculateRootNote = () => {
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            analyser.getByteFrequencyData(dataArray);

            let maxAmplitudeIndex = 0;
            for (let i = 1; i < bufferLength; i++) {
                if (dataArray[i] > dataArray[maxAmplitudeIndex]) {
                    maxAmplitudeIndex = i;
                }
            }

            const rootFrequency = (maxAmplitudeIndex * analyser.context.sampleRate) / (2 * bufferLength);
            setRootFrequency(rootFrequency);
        };

        const intervalId = setInterval(calculateRootNote, sensitivity);

        return () => {
            clearInterval(intervalId);
        };
    }, [analyser, microphoneStarted, sensitivity]);

    return (
        <RootFrequencyContext.Provider value={rootFrequency}>{children}</RootFrequencyContext.Provider>
    );
};

const RootFrequencyAnalyserProvider: FC<RootFrequencyProviderProps> = ({
    children,
    microphoneStarted,
    sensitivity,
}) => {
    return (
        <AnalyserProvider microphoneStarted={microphoneStarted}>
            <RootFrequencyProvider
                microphoneStarted={microphoneStarted}
                sensitivity={sensitivity}
            >
                {children}
            </RootFrequencyProvider>
        </AnalyserProvider>
    );
};

export default RootFrequencyAnalyserProvider;