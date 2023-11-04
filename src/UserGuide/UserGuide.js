import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Modal, Menu, MenuItem } from '@mui/material'
import { useState } from 'react';
import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";


const theme = createTheme();

export default function UserGuide() {

    // particle background
    const particlesInit = useCallback(async engine => {
        console.log(engine);
        // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
        // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
        // starting from v2 you can add only the features you need reducing the bundle size
        await loadFull(engine);
    }, []);

    const particlesLoaded = useCallback(async container => {
        console.log(container);
    }, []);


    // for "API" and "Libraries" Modal
    const [openModalAPI, setOpenModalAPI] = useState(false);
    const handleOpenAPI = () => setOpenModalAPI(true);
    const handleCloseAPI = () => setOpenModalAPI(false);
    // for "Citations" Modal
    const [openModalCit, setOpenModalCit] = useState(false);
    const handleOpenCit = () => setOpenModalCit(true);
    const handleCloseCit = () => setOpenModalCit(false);
    const [currCitation, setCurrCitation] = useState('');


    return (
        <div className = 'parent'>
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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <main>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            User Guide
                        </Typography>
                        <Typography variant = "h8" align="left" color="text.secondary" paragraph style = {{margin:"5%"}}>
                            <div class='aboutContent'>
                                    <b>Version:</b> 1.0
                            </div>
                            <div class='aboutContent'>
                                    <b>Instructions:</b> click <a href="userGuide.pdf" target="blank">here</a> for the user guide.
                            </div>
                        </Typography>
                    </Container>
            </main>
        </ThemeProvider>
        </div>
    );
}