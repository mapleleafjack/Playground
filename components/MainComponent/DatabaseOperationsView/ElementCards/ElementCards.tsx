import { Card, Elevation } from '@blueprintjs/core';
import React, { FC } from 'react';
import { DataThingy } from 'types';
import { removeThingy } from 'utils/api/thingy';
import s from './ElementCards.module.scss';

interface ComponentProps {
    data: DataThingy[];
    callback: () => any;
}

const ElementCards: FC<ComponentProps> = ({ data, callback }) => {

    const deleteThingyCB = async (thingy_id: string) => {
        try {
            await removeThingy(thingy_id);
            callback()
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <>
            {(data ? data.map((elm) =>
                <Card key={elm.id} className={`${s.card}`} interactive={true} elevation={Elevation.TWO} onClick={() => {
                    deleteThingyCB(elm.id)
                }}>
                    <h5>{elm.name}</h5>
                    <p>Id:{elm.id}</p>
                </Card>
            ) : "Click to load data")}

            {data && data.length == 0 && "No thingies in the DB, add some"}
        </>
    );
};

export default ElementCards;