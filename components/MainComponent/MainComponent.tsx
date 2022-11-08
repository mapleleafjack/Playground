import { Alignment, Button, Navbar } from '@blueprintjs/core';
import DatabaseOperationsView from 'components/MainComponent/DatabaseOperationsView/DatabaseOperationsView';
import React, { FC, useState } from 'react';
import AudioVisualiserView from './AudioVisualiserView/AudioVisualiserView';
import s from './MainComponent.module.scss';
interface ComponentProps {
    title: string;
}

const MainComponent: FC<ComponentProps> = ({ title }) => {

    const [active_tab, setActiveTab] = useState("database");

    const get_active_tab = () => {
        switch (active_tab) {
            case "database":
                return <DatabaseOperationsView />
            case "music":
                return <AudioVisualiserView />
            default:
                return "Under construction"
        }
    }

    let body_component = get_active_tab()

    let component = <>
        <Navbar>
            <Navbar.Group align={Alignment.LEFT}>
                <Navbar.Heading>{title}</Navbar.Heading>
                <Navbar.Divider />
                <Button
                    className="bp4-minimal"
                    icon="home"
                    text="Database operations"
                    onClick={() => {
                        setActiveTab("database")
                    }}
                />
                <Button
                    className="bp4-minimal"
                    icon="music"
                    text="Visualiser"
                    onClick={() => {
                        setActiveTab("music")
                    }}
                />
            </Navbar.Group>
        </Navbar>

        <div className={`${s.mainLayout}`} >
            {body_component}
        </div>
    </>

    return component;
};



export default MainComponent;