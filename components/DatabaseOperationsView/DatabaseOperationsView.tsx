import { Button, Card, Elevation } from '@blueprintjs/core';
import React, { FC, useEffect, useState } from 'react';
import { DataThingy } from 'types';
import { addThingy, getThingy, removeThingy } from 'utils/api/thingy';
import s from './DatabaseOperatiosView.module.scss';

const DatabaseOperationsView: FC = () => {
    const [data, setData] = useState<DataThingy[]>([]);
    const [loading, setLoading] = useState<Boolean>(false);

    useEffect(() => {
        getThingyCB()
    }, [])

    const getThingyCB = async () => {
        setLoading(true)
        try {
            let data = await getThingy("thingy");
            setData(data)
            setLoading(false)

        } catch (err) {
            console.log(err);
        }
    };

    const addThingyCB = async () => {
        setLoading(true)
        try {
            let new_elm = await addThingy("thingy");
            data.push(new_elm)
            setData(data)
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    };

    const deleteThingyCB = async (thingy_id: string) => {
        setLoading(true)
        try {
            await removeThingy(thingy_id);

            setData(data.filter((elm) => {
                return elm.id != thingy_id
            }))
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    }


    return (
        <div className={`${s.panelLayout}`}>
            <div className={`${s.buttonPanel}`}>
                <Button
                    className="bp4-button"
                    icon="refresh"
                    text="Refresh database"
                    onClick={() => {
                        getThingyCB()
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
                {(data ? data.map((elm) =>
                    <Card key={elm.id} className={`${s.card}`} interactive={true} elevation={Elevation.TWO} onClick={() => {
                        deleteThingyCB(elm.id)
                    }}>
                        <h5>{elm.name}</h5>
                        <p>Id:{elm.id}</p>
                    </Card>
                ) : "Click to load data")}

                {data && data.length == 0 && "No thingies in the DB, add some"}
            </div>

        </div>
    );
};

export default DatabaseOperationsView;