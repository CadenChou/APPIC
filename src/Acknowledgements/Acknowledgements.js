import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Acknowledgements.css'
import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

export default function Acknowledgements() {
    const navigate = useNavigate();

    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        await console.log(container);
    }, []);

    return (
        <div className='parent'>
            <Particles
                id="tsparticles"
                init={particlesInit}
                loaded={particlesLoaded}
                options={{
                    background: {
                        color: {
                            value: "#FFFFFF",
                        },
                    },
                    fullScreen: {
                        // enable: true,
                        zIndex: -1
                    },
                    fpsLimit: 120,
                    interactivity: {

                    },
                    particles: {
                        color: {
                            value: "#89CFF0",
                        },
                        links: {
                            color: "#808080",
                            distance: 150,
                            enable: true,
                            opacity: 0.5,
                            width: 1,
                        },
                        collisions: {
                            enable: false,
                        },
                        move: {
                            directions: "none",
                            enable: true,
                            outModes: {
                                default: "bounce",
                            },
                            random: false,
                            speed: 3,
                            straight: false,
                        },
                        number: {
                            density: {
                                enable: true,
                                area: 800,
                            },
                            value: 80,
                        },
                        opacity: {
                            value: 0.5,
                        },
                        shape: {
                            type: "circle",
                        },
                        size: {
                            value: { min: 5, max: 10 },
                        },
                    },
                    detectRetina: true,
                }}
            />
            <div className='panel'></div>
            <div id='acknowledgements' className='layout'>
                <h1 style={{ fontSize: "36px"}}>Acknolwedgements</h1>
                <h1 style={{ fontSize: "20px"}}>Benjamin J. Ahn, Caden Chou, Jennifer Chen, Charissa Chou, Ece Uzun, PhD*, Alper Uzun, PhD*</h1>
                <h1 style={{ fontSize: "20px"}}>* indicates corresponding authors</h1>
                <h1 style={{ fontSize: "20px"}}>This project would not have been possible without</h1>
                <h1 style={{ fontSize: "20px"}}>the generosity of our funding and supporting institutions:</h1>
                <h1 style={{ fontSize: "24px"}}>Rhode Island Foundation</h1>
                <h1 style={{ fontSize: "24px"}}>Legorreta Cancer Center</h1>
                <h1 style={{ fontSize: "24px"}}>Department of Pathology and Laboratory Medicine Brown University </h1>
                <h1 style={{ fontSize: "24px"}}>CVV at Brown University </h1>
                <h1 style={{ fontSize: "24px"}}>OIT Brown University </h1>
                <h1 style={{ fontSize: "24px"}}>UTRA at Brown</h1>
            </div>
        </div>
    )
}
