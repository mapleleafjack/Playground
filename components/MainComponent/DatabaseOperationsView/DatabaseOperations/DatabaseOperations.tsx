import { Button } from '@blueprintjs/core';
import React, { FC } from 'react';
import { addThingy } from 'utils/api/thingy';

interface ComponentProps {
    refreshData: () => any;
}

const DatabaseOperations: FC<ComponentProps> = ({ refreshData }) => {

    const addThingyCB = async () => {
        try {
            let new_elm = await addThingy("thingy");
            refreshData()
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <>
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
        </>
    );
};

export default DatabaseOperations;