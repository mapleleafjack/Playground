import * as React from 'react';

export const NumeroContext = React.createContext<number | null>(null);

type Props = {
    children?: React.ReactNode
};

const NumeroProvider: React.FC<Props> = ({ children }) => {



    return <NumeroContext.Provider value={20}>{children}</NumeroContext.Provider>;
};

export default NumeroProvider;