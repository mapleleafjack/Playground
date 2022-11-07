import { Card, Elevation } from '@blueprintjs/core';
import React, { FC } from 'react';
import { DataThingy } from 'types';
import s from './ElementCards.module.scss';

interface ComponentProps {
    data: DataThingy[];
    callback: (elm_id: string) => any;
}

const ElementCards: FC<ComponentProps> = ({ data, callback }) => {
    return (
        <>
            {(data ? data.map((elm) =>
                <Card key={elm.id} className={`${s.card}`} interactive={true} elevation={Elevation.TWO} onClick={() => {
                    callback(elm.id)
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