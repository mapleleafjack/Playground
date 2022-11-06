import { Button } from '@blueprintjs/core';
import React, { FC, useEffect, useState } from 'react';
import { DataThingy } from 'types';
import { addThingy, getThingy } from 'utils/api/thingy';
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
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    };

    const addThingyCB = async () => {
        setLoading(true)
        try {
            let data = await addThingy("thingy");
            setData([data])
        } catch (err) {
            console.log(err);
        }
        setLoading(false)
    };


    return (
        <div className={`${s.panelLayout}`}>
            <div className={`${s.buttonPanel}`}>
                <Button
                    className="bp4-button"
                    icon="document"
                    text="Read database"
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
                {loading ? "loading..." : (data ? data.map((elm) =>
                    <div>
                        Id: <span>{elm.id}</span>
                        <br />
                        Name: <span>{elm.name}</span>
                    </div>
                ) : "Click to load data")}
            </div>

        </div>
    );
};

export default DatabaseOperationsView;