import React, { FC, useState } from 'react';
import { Card, Elevation, Dialog, Button } from '@blueprintjs/core';
import { DataThingy } from 'types';
import { removeThingy } from 'utils/api/thingy';
import s from './ElementCards.module.scss';

interface ComponentProps {
    data: DataThingy[];
    callback: () => any;
}

const ElementCards: FC<ComponentProps> = ({ data, callback }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedThingy, setSelectedThingy] = useState<DataThingy | null>(null);

    const deleteThingyCB = async (thingy_id: string) => {
        try {
            await removeThingy(thingy_id);
            callback();
            setIsModalOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    const openModal = (elm: DataThingy) => {
        setSelectedThingy(elm);
        setIsModalOpen(true);
    };

    return (
        <>
            {(data ? data.map((elm) =>
                <Card key={elm.id} className={`${s.card}`} interactive={true} elevation={Elevation.TWO} onClick={() => {
                    openModal(elm);
                }}>
                    <h5>{elm.name}</h5>
                    <p>Id:{elm.id}</p>
                </Card>
            ) : "Click to load data")}

            {data && data.length == 0 && "No thingies in the DB, add some"}

            {selectedThingy && (
                <Dialog
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={selectedThingy.name}
                >
                    <div className={s.dialogContent}>
                        <p>Id: {selectedThingy.id}</p>
                        <Button
                            intent="danger"
                            onClick={() => {
                                setIsModalOpen(false)
                                deleteThingyCB(selectedThingy.id)
                            }}>
                            Delete
                        </Button>
                    </div>
                </Dialog>
            )}
        </>
    );
};

export default ElementCards;
