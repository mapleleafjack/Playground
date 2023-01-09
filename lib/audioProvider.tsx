import { createContext, FC, ReactNode, useEffect, useState } from "react";

export const AnalyserContext = createContext<AnalyserNode | null>(null);

type Props = {
    children?: ReactNode;
    microphoneStarted: Boolean;
};

const AnalyserProvider: FC<Props> = ({ children, microphoneStarted }) => {
    const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);

    useEffect(() => {
        try {
            let audioContext: AudioContext | null = new window.AudioContext()
            if (!audioContext) {
                return;
            }

            let hasStarted = false;

            const setup = () => {
                navigator.mediaDevices
                    .getUserMedia({ audio: true })
                    .then((stream) => {
                        if (audioContext) {
                            const microphone = audioContext.createMediaStreamSource(stream);
                            const analyser = audioContext.createAnalyser();
                            microphone.connect(analyser);
                            setAnalyser(analyser);
                        }
                    });

            };

            const start = () => {
                if (audioContext)
                    audioContext.resume();
            };

            const stop = () => {
                if (audioContext) {
                    audioContext.close();
                }
            };

            if (hasStarted) {
                setup();
            } else {
                if (microphoneStarted) {
                    start();
                    setup();
                }
            }

            return () => {
                stop();
            };
        } catch (err) {
            //TODO handle errors when Audio Context not available
        }

    }, [microphoneStarted]);

    return <AnalyserContext.Provider value={analyser}>{children}</AnalyserContext.Provider>;
};

export default AnalyserProvider;
