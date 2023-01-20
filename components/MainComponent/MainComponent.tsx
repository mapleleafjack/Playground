import { Alignment, Button, Navbar } from '@blueprintjs/core';
import DatabaseOperationsView from 'components/MainComponent/DatabaseOperationsView/DatabaseOperationsView';
import AnalyserProvider from 'lib/audioProvider';
import React, { FC, useState } from 'react';
import AudioVisualiserView from './AudioVisualiserView/AudioVisualiserView';
import s from './MainComponent.module.scss';

interface ComponentProps {
    title: string;
}

const MainComponent: FC<ComponentProps> = ({ title }) => {
    const [active_tab, setActiveTab] = useState("music");

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

    return (
        <div className={`${s.mainLayout}`} >
            <Navbar className={`${s.navbar}`}>
                <Navbar.Group align={Alignment.LEFT}>
                    <Navbar.Heading>{title}</Navbar.Heading>
                    <Navbar.Divider />
                    <Button
                        className="bp4-minimal"
                        icon="music"
                        active={active_tab === "music"}
                        text="Visualiser"
                        onClick={() => {
                            setActiveTab("music")
                        }}
                    />
                </Navbar.Group>
            </Navbar>

            <div className={`${s.mainbody}`}>
                {get_active_tab()}
            </div>
        </div>
    );
};



export default MainComponent;