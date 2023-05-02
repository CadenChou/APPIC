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

            <div id='acknowledgements' className='layout'>
                <h1>Acknolwedgements</h1>
            </div>
        </div>
    )
}
