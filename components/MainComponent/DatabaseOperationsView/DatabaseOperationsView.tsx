import { Button, Card, Elevation, Spinner } from '@blueprintjs/core';
import axios from 'axios';
import ElementCards from 'components/MainComponent/DatabaseOperationsView/ElementCards/ElementCards';
import React, { FC, useEffect, useState } from 'react';
import { DataThingy } from 'types';
import { addThingy, getThingy, removeThingy } from 'utils/api/thingy';
import CanvasView from './CanvasView/CanvasView';
import DatabaseOperations from './DatabaseOperations/DatabaseOperations';
import s from './DatabaseOperatiosView.module.scss';

const DatabaseOperationsView: FC = () => {
    const [data, setData] = useState<DataThingy[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = async () => {
        setLoading(true)
        try {
            let data = await getThingy("thingy");
            setData(data)
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    };


    return (
        <div className={`${s.panelLayout}`}>

            <div className={`${s.buttonPanel}`}>
                <DatabaseOperations refreshData={refreshData} />
            </div >

            <div className={`${s.panel}`}>
                <>
                    <div className={`${s.elementsPanel}`}>
                        {loading ? <Spinner /> : <ElementCards data={data} callback={refreshData} />}
                    </div>

                    <div className={`${s.canvasPanel}`}>
                        <CanvasView data={data} />
                    </div>
                </>
            </div>

        </div>
    );
};

export default DatabaseOperationsView;

function useSWR(arg0: string, fetcher: (url: string) => any): { data: any; error: any; } {
    throw new Error('Function not implemented.');
}
