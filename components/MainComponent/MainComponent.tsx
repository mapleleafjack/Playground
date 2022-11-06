import { Alignment, Button, Navbar } from '@blueprintjs/core';
import React, { FC, useState } from 'react';
import { getThingy } from 'utils/api/thingy';

interface ComponentProps {
    title: string;
}

const MainComponent: FC<ComponentProps> = ({ title }) => {

    const [active_tab, setActiveTab] = useState("home");
    const [data, setData] = useState<Record<string, unknown>>();

    const callAPI = async () => {
        try {
            let data = await getThingy("thingy");
            setData(data)
        } catch (err) {
            console.log(err);
        }
    };

    let body_component = <div>
        I am the {active_tab} {data ? JSON.stringify(data) : "Loading data..."}
    </div>

    let component = <>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>{title}</Navbar.Heading>
                <Navbar.Divider />
                <Button
                    className="bp4-minimal"
                    icon="home"
                    text="Main"
                    onClick={() => {
                        setActiveTab("home")
                        callAPI()
                    }}
                />
                <Button
                    className="bp4-minimal"
                    icon="document"
                    text="Files"
                    onClick={() => {
                        setActiveTab("files")
                        callAPI()
                    }}
                />
            </Navbar.Group>
        </Navbar>

        {body_component}
    </>

    return component;
};

export default MainComponent;