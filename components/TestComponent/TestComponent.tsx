import React, { FC } from 'react';

interface ComponentProps {
    title: string;
    subtitle: string;
}

const TestComponent: FC<ComponentProps> = ({ title, subtitle }) => {
    return (
        <>
            <h1 data-testid="title">{title}</h1>
            <h2 data-testid="subtitle">{subtitle}</h2>
        </>
    );
};

export default TestComponent;