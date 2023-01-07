import * as React from 'react';

export const AnalyserContext = React.createContext<AnalyserNode | null>(null);

type Props = {
    children?: React.ReactNode;
};

const AnalyserProvider: React.FC<Props> = ({ children }) => {
    const [analyser, setAnalyser] = React.useState<AnalyserNode | null>(null);

    React.useEffect(() => {
        let timeoutId: any;
        const audioContextAvailable = window.AudioContext;

        if (!audioContextAvailable) {
            timeoutId = setTimeout(() => {
                alert("AudioContext not available after waiting for 2 seconds");
            }, 2000);
        }

        try {
            const audioContext = audioContextAvailable
                ? new window.AudioContext()
                : null;
            if (!audioContext) {
                return;
            }

            const analyser = audioContext.createAnalyser();

            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream) => {
                    const microphone = audioContext.createMediaStreamSource(stream);
                    microphone.connect(analyser);
                });

            setAnalyser(analyser);
        } catch (err) {
            console.log("Audio Context not available")
        } finally {
            if (timeoutId) {
                clearTimeout(timeoutId);
            }
        }

    }, []);

    return <AnalyserContext.Provider value={analyser}>{children}</AnalyserContext.Provider>;
};

export default AnalyserProvider;
