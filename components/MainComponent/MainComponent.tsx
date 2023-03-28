import { Alignment, Button, Navbar } from '@blueprintjs/core';
import DatabaseOperationsView from 'components/MainComponent/DatabaseOperationsView/DatabaseOperationsView';
import AnalyserProvider from 'lib/audioProvider';
import React, { FC, useState } from 'react';
import AudioVisualiserView from './AudioVisualiserView/AudioVisualiserView';
import FractalView from './FractalView/FractalView';
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
            case "fractal":
                return <FractalView imageUrl='https://i.pinimg.com/originals/87/60/35/876035b21f02b2cf7af8acaf7b015569.jpg' />
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
                    <Button
                        className="bp4-minimal"
                        icon="flash"
                        active={active_tab === "fractal"}
                        text="Fractal"
                        onClick={() => {
                            setActiveTab("fractal")
                        }}
                    />
                    <Button
                        className="bp4-minimal"
                        icon="database"
                        active={active_tab === "database"}
                        text="Database"
                        onClick={() => {
                            setActiveTab("database")
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