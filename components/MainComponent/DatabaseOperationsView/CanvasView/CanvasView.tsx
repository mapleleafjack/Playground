import React, { FC } from 'react';
import { DataThingy } from 'types';

interface ComponentProps {
    data: DataThingy[];
}

const CanvasView: FC<ComponentProps> = ({ data }) => {
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
};

export default CanvasView;