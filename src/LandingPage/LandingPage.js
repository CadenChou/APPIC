import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './LandingPage.css'
import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";

export default function LandingPage() {
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

    const handleClick = () => {
        // URL of the PDF file
        const pdfUrl = 'appic_finalManuscript.pdf';
    
        // Open the PDF in a new tab
        window.open(pdfUrl, '_blank');
    };

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
            <div className='layout' style={{marginBottom:"5%"}}>
                <img src="./images/APPIC_logo_cropped.png" alt="" width = "50%"></img>
                <p class = "landingPageDescription">APPIC is a web-based tool that helps users visualize the protein-protein interactions (PPIs) of various cancer subtypes. By understanding the PPIs, researchers and clinicians can develop more targeted and effective treatment strategies, leading to improved clinical outcomes.</p>
                <p>Version 1.0 Jan 2025</p>
                <Button
                    variant='contained'
                    onClick={() => {
                        navigate('/body-diagram');
                    }}
                >Start</Button>
                {/* <p>
                <Button
                    variant='contained'
                    
                    onClick={handleClick}
                >Publication</Button>
                </p> */}
            </div>
        </div>
    )
}
