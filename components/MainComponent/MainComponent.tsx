import { Alignment, Button, Navbar } from '@blueprintjs/core';
import DatabaseOperationsView from 'components/MainComponent/DatabaseOperationsView/DatabaseOperationsView';
import AnalyserProvider from 'components/ContextProviders/audioProvider';
import React, { FC, useState } from 'react';
import AudioVisualiserView from './AudioVisualiserView/AudioVisualiserView';
import FractalView from './FractalView/FractalView';
import s from './MainComponent.module.scss';
import VideoComponent from './VideoView/ThreeVideo/ThreeVideo';
import WebcamCanvas from './VideoView/WebcamPixelator/WebcamPixelator';

interface ComponentProps {
    title: string;
}

const MainComponent: FC<ComponentProps> = ({ title }) => {
    const [active_tab, setActiveTab] = useState("music");

    const get_active_tab = () => {
        switch (active_tab) {
            case "database":
                return <DatabaseOperationsView />
            case "video":
                return <WebcamCanvas />
            case "3d":
                return <VideoComponent />
            case "fractal":
                return <FractalView />
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
                        icon="video"
                        active={active_tab === "video"}
                        text="Video"
                        onClick={() => {
                            setActiveTab("video")
                        }}
                    />
                    <Button
                        className="bp4-minimal"
                        icon="cube"
                        active={active_tab === "3d"}
                        text="3d"
                        onClick={() => {
                            setActiveTab("3d")
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