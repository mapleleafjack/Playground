import { Button, Card, Elevation } from '@blueprintjs/core';
import ElementCards from 'components/MainComponent/DatabaseOperationsView/ElementCards/ElementCards';
import React, { FC, useEffect, useState } from 'react';
import { DataThingy } from 'types';
import { addThingy, getThingy, removeThingy } from 'utils/api/thingy';
import CanvasView from './CanvasView/CanvasView';
import s from './DatabaseOperatiosView.module.scss';

const DatabaseOperationsView: FC = () => {
    const [data, setData] = useState<DataThingy[]>([]);

    useEffect(() => {
        refreshData()
    }, [])

    const refreshData = async () => {
        try {
            let data = await getThingy("thingy");
            setData(data)

        } catch (err) {
            console.log(err);
        }
    };

    const addThingyCB = async () => {
        try {
            let new_elm = await addThingy("thingy");
            refreshData()
        } catch (err) {
            console.log(err);
        }
    };

    const deleteThingyCB = async (thingy_id: string) => {
        try {
            await removeThingy(thingy_id);
            setData(data.filter((elm) => {
                return elm.id != thingy_id
            }))
        } catch (err) {
            console.log(err);
        }
    }


    return (
        <div className={`${s.panelLayout}`}>
            <div className={`${s.buttonPanel}`}>
                <Button
                    className="bp4-button"
                    icon="refresh"
                    text="Refresh database"
                    onClick={() => {
                        refreshData()
                    }}
                />
                <br />
                <Button
                    className="bp4-button"
                    icon="plus"
                    text="Add sample data to db"
                    onClick={() => {
                        addThingyCB()
                    }}
                />
            </div >

            <div className={`${s.panel}`}>
                <div className={`${s.elementsPanel}`}>
                    <ElementCards data={data} callback={deleteThingyCB} />
                </div>

                <div className={`${s.canvasPanel}`}>
                    <CanvasView data={data} />
                </div>
            </div>

        </div>
    );
};

export default DatabaseOperationsView;