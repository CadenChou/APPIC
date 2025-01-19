import { Button } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Acknowledgements.css'
import { useCallback } from "react";
import Particles from 'react-tsparticles';
import { loadFull } from "tsparticles";
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';

export default function Acknowledgements() {
    const theme = createTheme();
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
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <main>
                    <Container maxWidth="md">
                        <Typography component="h1" variant="h2" align="center" color="text.primary" gutterBottom>
                            Acknowledgements
                        </Typography>
                        <Typography variant = "h8" align="left" color="text.secondary" paragraph>
                            <div>
                                <b>Citing APPIC:</b> If you use APPIC, please cite the following paper: <br></br>
                                Ahn B, Chou C, Chou C, Chen J, Zug A, Baykara Y, Claus J, Hacking SM, Uzun A, 
                                Gamsiz Uzun ED. <i>The Atlas of Protein-Protein Interactions in Cancer (APPIC)- 
                                a webtool to visualize and analyze cancer subtypes. </i>NAR Cancer. 2025 Jan 15;7(1):zcae047. 
                                doi: 10.1093/narcan/zcae047. PMID: 39822275; PMCID: PMC11734624. <br></br>
                                Link:https://pubmed.ncbi.nlm.nih.gov/39822275/
                            </div>
                            <div style={{marginTop:"5%"}}>
                                <b>Emails:</b> benjamin_ahn[at]brown[dot]edu, dilber_gamsiz[at]brown[dot]edu, and alper_uzun[at]brown[dot]edu
                            </div>
                            <div style={{marginTop:"5%"}}>
                                This project would not have been possible without the generosity of our funding and supporting institutions:
                            </div>
                            <div>
                                <ul>
                                    <li>Rhode Island Foundation</li>
                                    <li>Legorreta Cancer Center</li>
                                    <li>Department of Pathology and Laboratory Medicine, Brown University</li>
                                    <li>Center for Computation and Visualization, Brown University</li>
                                    <li>Office of Information Technology, Brown University</li>
                                </ul>
                            </div>
                        </Typography>
                    </Container>
                </main>
            </ThemeProvider>
        </div>
    )
}
