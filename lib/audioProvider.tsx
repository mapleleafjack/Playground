import * as React from 'react';

export const AnalyserContext = React.createContext<AnalyserNode | null>(null);

type Props = {
    children?: React.ReactNode;
};

const AnalyserProvider: React.FC<Props> = ({ children }) => {
    const [analyser, setAnalyser] = React.useState<AnalyserNode | null>(null);

    React.useEffect(() => {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();


        navigator.mediaDevices
            .getUserMedia({ audio: true })
            .then((stream) => {
                const microphone = audioContext.createMediaStreamSource(stream);
                microphone.connect(analyser);
            });

        setAnalyser(analyser);
    }, []);

    return <AnalyserContext.Provider value={analyser}>{children}</AnalyserContext.Provider>;
};

export default AnalyserProvider;