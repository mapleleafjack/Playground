import React, { FC } from 'react';
import { DataThingy } from 'types';

interface ComponentProps {
    data: DataThingy[];
}

const loadData = (data: DataThingy[]) => {
    let pos = (data.length / 2) * -1.5;

    let element = data.map(elm => {

        return elm
    })
    return element
}

const CanvasView: FC<ComponentProps> = ({ data }) => {
    const loadedData = loadData(data)

    return <>{JSON.stringify(loadedData)}</>
};

export default CanvasView;